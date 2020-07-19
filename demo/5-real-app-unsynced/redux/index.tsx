import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { myReduxStore } from './store';
import { App } from './app';

ReactDOM.render(
  <Provider store={myReduxStore}>
    <App />
  </Provider>,
  document.querySelector('#sidebar'),
);
