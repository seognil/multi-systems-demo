import { Subject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { createStore } from 'redux';
import { mapObjIndexed } from 'ramda';

// * ================================================================================ util & declaration

// * ---------------- util

// * 工具函数，批量生成一些代码

type MappedReceivers<T extends Object, D> = {
  [K in keyof T]: T[K] extends Subject<infer P> ? Observable<[P, D]> : never;
};

const zipTriggersWithPass = <T, D>(triggers: T, pass$: Observable<D>): MappedReceivers<T, D> => {
  // * Just need the type notation, so ...
  // @ts-ignore
  return mapObjIndexed((v) => v.pipe(withLatestFrom(pass$)), triggers);
};

/*
  const streamStart = {
    a$: new Subject(),
    b$: new Subject(),
  };

  const stremEnd$ = new Subject();

  zipTriggersWithPass(streamStart, stremEnd$)

  等价于：

  {
    a$: streamStart.a$.pipe(withLatestFrom(stremEnd$)),
    b$: streamStart.b$.pipe(withLatestFrom(stremEnd$)),
  };
*/

// * ---------------- types

type ReduxState = {
  reduxNum?: number;
  reduxStr?: string;
};

type ManState = {
  manNum?: number;
  manStr?: string;
};

// * ---------------- data mapping functions

// * 作为 demo 设计得比较简单。在实际的业务中，typing 可能差别很大，那么 mapping 就很有必要了

const mapReduxToMan = (s: ReduxState): ManState => ({ manNum: s.reduxNum, manStr: s.reduxStr });
const mapManToRedux = (s: ManState): ReduxState => ({ reduxNum: s.manNum, reduxStr: s.manStr });

// * ================================================================================ Redux System

// * ---------------- make store

const reduxStore = createStore(
  (s: ReduxState, a: { type: string; payload: ReduxState }) => ({ ...s, ...a.payload }),
  { reduxNum: 0, reduxStr: '' },
);

// * ---------------- before mutation

// * 给 Redux System 内的功能用的触发器，
// * 不直接调用 reduxStored.dispatch，而是包装一层 stream
// * reduxStore.dispatch(action) -> reduxEventTriggers.changeNum$.next(...);

const reduxEventTriggers = {
  changeNum$: new Subject<number>(),
  changeStr$: new Subject<string>(),
};

// * ---------------- mutation

// * 实际的业务通过包装的 stream 来调用，以及只处理数据变更的部分，异步或复杂计算等其他逻辑需要在之前完成。

const reduxChangeNumber = (num: number) =>
  reduxStore.dispatch({ type: 'force', payload: { reduxNum: num } });

const reduxChangeString = (str: string) =>
  reduxStore.dispatch({ type: 'force', payload: { reduxStr: str } });

reduxEventTriggers.changeNum$.subscribe(reduxChangeNumber);
reduxEventTriggers.changeStr$.subscribe(reduxChangeString);

// * ---------------- after mutation

// * 生成给另一个系统响应用的 streams
// * 可以生成多组 streams 对应多套系统
// * 这里就生成一组

const reduxPassToMan$ = new Subject<ManState>();

reduxStore.subscribe(() => {
  reduxPassToMan$.next(mapReduxToMan(reduxStore.getState()));
});

const manReceivers = zipTriggersWithPass(reduxEventTriggers, reduxPassToMan$);

// * ================================================================================ Legacy Manually System

// * 在另一个系统中同理，这里以最麻烦的手动调用风格的代码为例

// * ---------------- make store

const manStore: ManState = {
  manNum: 0,
  manStr: '',
};

// * ---------------- before mutation

const manEventTriggers = {
  changeNum$: new Subject<number>(),
  changeStr$: new Subject<string>(),
};

// * ---------------- after muation

// * 另一个系统接收数据更新（这里只做一组给 redux 用的）

const manPassToRedux$ = new Subject<ReduxState>();
const reduxReceivers = zipTriggersWithPass(manEventTriggers, manPassToRedux$);

const callManNextToRedux = () => {
  manPassToRedux$.next(mapManToRedux(manStore));
};

// * ---------------- mutation

// * 模仿项目内最古老的手撸代码风格，响应式什么的完全没有
// * 反正升级完成之后都要删掉的，所以原有代码直接改改得了

const manFeatChangeNumber = (num: number) => {
  manStore.manNum = num;
  console.log('manual store num updated:', manStore);

  // * 直接硬编码 after mutation
  callManNextToRedux();
};
const manFeatChangeString = (str: string) => {
  manStore.manStr = str;
  console.log('manual store str updated:', manStore);

  // * 直接硬编码 after mutation
  callManNextToRedux();
};

manEventTriggers.changeNum$.subscribe(manFeatChangeNumber);
manEventTriggers.changeStr$.subscribe(manFeatChangeString);

// * 同理，原本直接调用的触发逻辑改为 stream
// * manFeatChangeNumber(66) -> manEventTriggers.changeNum$.next(66);

// * ---------------------------------------------------------------- systems linking

// * 实际应该携带什么参数，可以根据实际业务做出调整
// * 在这个 demo 中，携带触发时的 payload 和最终的 state
// * 使用的例子如下

manReceivers.changeNum$.subscribe(([p, s]) => manFeatChangeNumber(s.manNum));
manReceivers.changeStr$.subscribe(([p, s]) => manFeatChangeString(p));

reduxReceivers.changeNum$.subscribe(([p, s]) => reduxChangeNumber(p));
reduxReceivers.changeStr$.subscribe(([p, s]) => reduxChangeString(s.reduxStr));

// * ================================================================================ event mocking

// * 简单测试一下调用行为，可以看到无论从调用哪个系统的哪个事件，最终两个系统都可以预期完成数据同步。

reduxStore.subscribe(() => {
  console.log('redux update:', reduxStore.getState());
});

console.log('redux init:', reduxStore.getState());
console.log('manual init:', manStore);

console.log('---------------- redux change number ----------------');

reduxEventTriggers.changeNum$.next(777);

console.log('---------------- redux change string ----------------');

reduxEventTriggers.changeStr$.next('Hello');

console.log('---------------- manual change number ----------------');

manEventTriggers.changeNum$.next(66);

console.log('---------------- manual change string ----------------');

manEventTriggers.changeStr$.next('Goodbye');
