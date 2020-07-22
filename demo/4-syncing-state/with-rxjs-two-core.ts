import { createStore } from 'redux';
import Backbone from 'backbone';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

// * -------------------------------- store

// @ts-ignore
const ReduxStore = createStore((s, a) => a.p);
const UpdateRedux = (e) => ReduxStore.dispatch({ type: '', p: e });
ReduxStore.subscribe(() => console.log('Redux updated:', ReduxStore.getState()));

const BackboneStore = new Backbone.Model();
const UpdateBackbone = (e) => BackboneStore.set('value', e);
BackboneStore.on('change', () => console.log('Backbone updated:', BackboneStore.get('value')));

// * -------------------------------- trigger management

const ReduxInner$ = new Subject();
const ReduxEnd$ = new Subject();

ReduxStore.subscribe(() => ReduxEnd$.next(ReduxStore.getState()));
ReduxInner$.subscribe(UpdateRedux);

// * ----------------

const BackboneInner$ = new Subject();
const BackboneEnd$ = new Subject();

BackboneStore.on('change', () => BackboneEnd$.next(BackboneStore.get('value')));
BackboneInner$.subscribe(UpdateBackbone);

// * ----------------

// * Backbone 事件完成之后触发 Redux 事件
const ReduxOuter$ = BackboneInner$.pipe(withLatestFrom(BackboneEnd$));
ReduxOuter$.subscribe(UpdateRedux);

// * 反之同理
const BackboneOuter$ = ReduxInner$.pipe(withLatestFrom(ReduxEnd$));
BackboneOuter$.subscribe(UpdateBackbone);

// * -------------------------------- try it

// * 业务只需要调用自己的事件（inner），就可以实现完成同步。

console.log('----');

ReduxInner$.next('hello from Redux');

console.log('----');

BackboneInner$.next('hello from Backbone');
