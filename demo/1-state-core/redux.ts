import { createStore } from 'redux';

// * ---------------- 状态仓库（Redux）

type ReduxState = {
  reduxNum?: number;
  reduxStr?: string;
};

const reduxStore = createStore(
  (s: ReduxState, a: { type: string; payload: ReduxState }) => ({ ...s, ...a.payload }),
  {},
);

// * ---------------- 业务部分（Redux.subscribe 监听）

console.log('redux init:', reduxStore.getState());

reduxStore.subscribe(() => {
  console.log('redux updated:', reduxStore.getState());
});

reduxStore.dispatch({ type: 'merge', payload: { reduxNum: 7777 } });
reduxStore.dispatch({ type: 'merge', payload: { reduxStr: 'Hello' } });
reduxStore.dispatch({ type: 'merge', payload: { reduxStr: 'Redux' } });
