import { createStore } from 'redux';

// * ---------------- 状态仓库

type ReduxState = {
  reduxNum?: number;
  reduxStr?: string;
};

const ReduxStore = createStore(
  (s: ReduxState, a: { type: string; payload: ReduxState }) => ({ ...s, ...a.payload }),
  {},
);

// * ---------------- 业务部分

(() => {
  console.warn('redux init:', ReduxStore.getState());

  ReduxStore.subscribe(() => {
    console.warn('redux updated:', ReduxStore.getState());
  });

  ReduxStore.dispatch({ type: 'force', payload: { reduxNum: 777 } });
  ReduxStore.dispatch({ type: 'force', payload: { reduxStr: 'Hello' } });
  ReduxStore.dispatch({ type: 'force', payload: { reduxStr: 'Redux' } });
})();
