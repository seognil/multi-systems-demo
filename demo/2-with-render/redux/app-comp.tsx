import * as React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from './redux-store';

export const App: React.FC = () => {
  const { reduxNum, reduxStr } = useSelector<ReduxState, ReduxState>((s) => s);

  return (
    <>
      <div>reduxNum: {reduxNum}</div>
      <div>reduxStr: {reduxStr}</div>
    </>
  );
};
