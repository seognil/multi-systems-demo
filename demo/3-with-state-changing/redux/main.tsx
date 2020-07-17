import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMyStore } from './redux-store';
import { App } from './app-comp';

const store1 = createMyStore();
const store2 = createMyStore();

ReactDOM.render(
  <Provider store={store1}>
    <App />
  </Provider>,
  document.querySelector('#app'),
);

ReactDOM.render(
  <Provider store={store2}>
    <App />
  </Provider>,
  document.querySelector('#app2'),
);

setTimeout(() => {
  store1.dispatch({ type: 'force', payload: { reduxNum: 7777 } });
}, 500);
setTimeout(() => {
  store1.dispatch({ type: 'force', payload: { reduxStr: 'Hello' } });
}, 1000);
setTimeout(() => {
  store1.dispatch({ type: 'force', payload: { reduxStr: 'Redux' } });
}, 1500);
