import { createStore } from 'redux';
import Backbone from 'backbone';

// * ------------------------------------------------ type

type ReduxState = {
  reduxArr?: string[];
};

type BoneState = {
  boneArr?: string[];
};

// * ------------------------------------------------ store

// * ---------------- redux

const reduxStore = createStore(
  (s: ReduxState, a: { type: string; payload: ReduxState }) => ({ ...s, ...a.payload }),
  { reduxArr: [] },
);

reduxStore.subscribe(() => {
  console.log('redux updated:', reduxStore.getState());
});

// * ---------------- backbone

class MyModel extends Backbone.Model<BoneState> {}

const boneModel = new MyModel();

boneModel.on('change', () => {
  console.log('backbone updated:', boneModel.attributes);
});

// * ------------------------------------------------ linking

reduxStore.subscribe(() => {
  const { reduxArr } = reduxStore.getState();
  boneModel.set({ boneArr: [...reduxArr] });
});

boneModel.on('change', () => {
  const { boneArr } = boneModel.attributes;
  reduxStore.dispatch({ type: 'force', payload: { reduxArr: [...boneArr] } });
});

// * ------------------------------------------------ fire a event

reduxStore.dispatch({ type: 'force', payload: { reduxArr: ['Hello', 'Redux'] } });

// boneModel.set({ boneArr: ['Hello', 'Backbone'] });
