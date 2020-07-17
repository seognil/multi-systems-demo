import { createStore } from 'redux';

// * ------------------------------------------------ type

type ReduxState = {
  reduxStr?: string;
};

type ManState = {
  manStr?: string;
};

// * ------------------------------------------------ store

// * ---------------- redux

const reduxStore = createStore(
  (s: ReduxState, a: { type: string; payload: ReduxState }) => ({ ...s, ...a.payload }),
  { reduxStr: '' },
);

reduxStore.subscribe(() => {
  console.log('redux updated:', reduxStore.getState());
});

// * ---------------- manually

const manStore: { state: ManState } = { state: { manStr: '' } };

// * ------------------------------------------------ linking callback

reduxStore.subscribe(() => {
  const manPayload: ManState = { manStr: reduxStore.getState().reduxStr };
  manUpdateFeat(manPayload);
});

const manUpdateFeat = (payload: ManState) => {
  manStore.state = { ...manStore.state, ...payload };
  console.log('manually updated:', manStore.state);

  const reduxPayload: ReduxState = { reduxStr: manStore.state.manStr };
  reduxStore.dispatch({ type: 'force', payload: reduxPayload });
};

// * ------------------------------------------------ fire a event

reduxStore.dispatch({ type: 'force', payload: { reduxStr: 'hello' } });
