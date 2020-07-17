import { createDumbStore } from './dumb-store';
import { render } from './dumb-render';

const store1 = createDumbStore();
const store2 = createDumbStore();

render('#app', store1);
render('#app2', store2);

setTimeout(() => {
  store1.update({ manNum: 55 });
  render('#app', store1);
}, 500);

setTimeout(() => {
  store1.update({ manStr: 'Hello' });
  render('#app', store1);
}, 1000);

setTimeout(() => {
  store1.update({ manStr: 'Manually' });
  render('#app', store1);
}, 1500);
