export type ManState = {
  manNum?: number;
  manStr?: string;
};

export type DumbStore = {
  state: ManState;
  update: (payload: ManState) => void;
};

export const createDumbStore = (): DumbStore => {
  const store = {
    state: {
      manNum: 0,
      manStr: '',
    },
    update: (payload: ManState) => {
      store.state = { ...store.state, ...payload };
    },
  };

  return store;
};
