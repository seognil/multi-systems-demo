import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from './redux-store';

export const App: React.FC = () => {
  const { reduxNum, reduxStr } = useSelector<ReduxState, ReduxState>((s) => s);
  const dispatch = useDispatch();
  const mod = (payload: ReduxState) => () => dispatch({ type: 'any', payload });

  return (
    <>
      <div>reduxNum: {reduxNum}</div>
      <div>reduxStr: {reduxStr}</div>
      <button onClick={mod({ reduxNum: reduxNum + 1 })}>+</button>
      <button onClick={mod({ reduxNum: reduxNum - 1 })}>-</button>
    </>
  );
};
