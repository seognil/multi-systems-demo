import { Subject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { createStore } from 'redux';
import { mapObjIndexed } from 'ramda';

// * ================================================================================

type MappedReceivers<T extends Object, D> = {
  [K in keyof T]: T[K] extends Subject<infer P> ? Observable<[P, D]> : never;
};

const zipTriggersWithDone = <T, D>(triggers: T, done$: Observable<D>): MappedReceivers<T, D> => {
  // * Just need the type notation, so ...
  // @ts-ignore
  return mapObjIndexed((v) => v.pipe(withLatestFrom(done$)), triggers);
};

// * ---------------------------------------------------------------- ReduxSystem

type ReduxState = {
  reduxNum?: number;
  reduxStr?: string;
};

const reduxStore = createStore(
  (s: ReduxState, a: { type: string; payload: ReduxState }) => ({ ...s, ...a.payload }),
  { reduxNum: 0, reduxStr: '' },
);

// * ---------------- before mutation

// * ReduxSystem 系统内触发器
const reduxEventTriggers = {
  changeNum$: new Subject<Number>(),
  changeStr$: new Subject<String>(),
};

// * ---------------- mutation

const changeNumber = (num: number) =>
  reduxStore.dispatch({ type: 'force', payload: { reduxNum: num } });

const changeString = (str: string) =>
  reduxStore.dispatch({ type: 'force', payload: { reduxStr: str } });

reduxEventTriggers.changeNum$.subscribe(changeNumber);
reduxEventTriggers.changeStr$.subscribe(changeString);

// * ---------------- after mutation

const reduxDone$ = new Subject<ReduxState>();

reduxStore.subscribe(() => {
  reduxDone$.next(reduxStore.getState());
});

// * ---------------- make stream

// * 非 Redux 功能接收数据更新

const otherReceivers = zipTriggersWithDone(reduxEventTriggers, reduxDone$);

// const otherReceivers = {
//   changeNum$: reduxEventTriggers.changeNum$.pipe(withLatestFrom(reduxDone$)),
//   changeStr$: reduxEventTriggers.changeStr$.pipe(withLatestFrom(reduxDone$)),
// };

// * ---------------------------------------------------------------- Other System

// * 反过来流程也类似，这里以最棘手的 manually 手撸的功能为例（Backbone 同理）

type ManState = {
  manNum?: number;
  manStr?: string;
};

// const storeState

// * ================================================================================
console.log('redux init:', reduxStore.getState());

reduxStore.subscribe(() => {
  console.log('redux update:', reduxStore.getState());
});
reduxEventTriggers.changeNum$.next(777);
reduxEventTriggers.changeStr$.next('Hello');
