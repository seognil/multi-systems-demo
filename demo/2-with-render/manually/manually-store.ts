export type ManState = {
  manNum?: number;
  manStr?: string;
};

export const store: { state: ManState } = {
  state: {
    manNum: 0,
    manStr: '',
  },
};

export const update = (payload: ManState) => {
  store.state = { ...store.state, ...payload };
};
