import { store } from './manually-store';
import { render } from './manually-render';

const rerender = () => render('#app');

const manuallyDoEverything = (payload: ManState) => {
  store.state = { ...store.state, ...payload };
  rerender();
};

rerender();

setTimeout(() => {
  manuallyDoEverything({ manNum: 55 });
}, 500);
setTimeout(() => {
  manuallyDoEverything({ manStr: 'Hello' });
}, 1000);
setTimeout(() => {
  manuallyDoEverything({ manStr: 'Manually' });
}, 1500);
