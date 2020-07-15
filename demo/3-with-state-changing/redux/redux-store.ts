import { createStore } from 'redux';

// * ---------------- 状态仓库

export type ReduxState = {
  reduxNum?: number;
  reduxStr?: string;
};

export const createMyStore = () =>
  createStore(
    (s: ReduxState, a: { type: string; payload: ReduxState }) => ({ ...s, ...a.payload }),
    { reduxNum: 0, reduxStr: '' },
  );
