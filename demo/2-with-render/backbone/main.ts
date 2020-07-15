import { MyView } from './backbone-view';

const app = new MyView({
  el: '#app',
});

setTimeout(() => {
  app.change({ boneNum: 666 });
}, 500);
setTimeout(() => {
  app.change({ boneStr: 'Hello' });
}, 1000);
setTimeout(() => {
  app.change({ boneStr: 'Backbone' });
}, 1500);
