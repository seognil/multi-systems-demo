import { Subject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { createStore } from 'redux';
import { mapObjIndexed } from 'ramda';

// * ================================================================================

type MapEndToReceivers<T extends Object, Data> = {
  [K in keyof T]: T[K] extends Subject<infer P> ? Observable<[P, Data]> : never;
};

// * ---------------------------------------------------------------- Alpha

type ReduxState = {
  valStr?: string;
  valNum?: number;
};

// * 内部触发器集合
const ReduxEventTriggers = {
  changeStr$: new Subject<String>(),
  changeNum$: new Subject<Number>(),
};

const AlphaDone$ = new Subject<ReduxState>();

const ReduxStore = createStore(
  (s: ReduxState, a: { type: string; payload: ReduxState }) => ({ ...s, ...a.payload }),
  {},
);

ReduxStore.subscribe(() => {
  AlphaDone$.next(ReduxStore.getState());
});

// * 内部触发器的事件，
ReduxEventTriggers.event$.subscribe((data) => {
  // * 用 log 当做业务逻辑
  console.log('Alpha event'.padEnd(20), data);
});

// * -------------------------------- Bravo 接收转发的功能，事件和数据类型基于 Alpha 自动映射

type T_BravoReceivers = MapEndToReceivers<typeof ReduxEventTriggers, AlphaDoneData>;

const e$ = ReduxEventTriggers.event$.pipe(withLatestFrom(AlphaDone$));

export const BravoReceivers: T_BravoReceivers = {
  event$: ReduxEventTriggers.event$.pipe(withLatestFrom(AlphaDone$)),
  event2$: ReduxEventTriggers.event2$.pipe(withLatestFrom(AlphaDone$)),
};

// export const BravoReceivers = mapObjIndexed(
//   (v) => v.pipe(withLatestFrom(AlphaDone$)),
//   AlphaTriggers,
// ) as T_BravoReceivers;

BravoReceivers.event$.subscribe(([data, payload]) => {
  console.log('Bravo receive'.padEnd(20), payload, data);
});

// * ---------------------------------------------------------------- Bravo System

// // * 内部触发器集合
// const BravoTriggers = {
//   event$: new Subject<String>(),
//   event2$: new Subject<Boolean>(),
// };

// // * 内部触发器的事件
// BravoTriggers.event$.subscribe((data) => {
//   console.log('Bravo event'.padEnd(20), data);

//   afterBravoFinished(data.length);
// });

// // * ---------------- 转发通道 Alpha <- Bravo

// type BravoFinishedData = Number;
// const BravoFinished$ = new Subject<BravoFinishedData>();

// const afterBravoFinished = (data: BravoFinishedData) => BravoFinished$.next(data);

// // * -------------------------------- Alpha 接收转发的功能，事件和数据类型基于 Bravo 自动映射

// type T_AlphaReceiver = MapTriggersToReceivers<typeof BravoTriggers, BravoFinishedData>;

// export const AlphaReceivers = mapObjIndexed(
//   (v) => v.pipe(withLatestFrom(BravoFinished$)),
//   BravoTriggers,
// ) as T_AlphaReceiver;

// AlphaReceivers.event$.subscribe(([data, payload]) => {
//   console.log('Alpha receive'.padEnd(20), payload, data);
// });

// * ================================================================================

ReduxEventTriggers.event$.next('666');

ReduxEventTriggers.event$.next('7777');
