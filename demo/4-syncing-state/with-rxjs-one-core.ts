import { withLatestFrom } from 'rxjs/operators';
import { createStore } from 'redux';
import { Subject } from 'rxjs';

// * -------------------------------- store

// @ts-ignore
const store = createStore((s, a) => a.p);
const updateStore = (e) => store.dispatch({ type: '', p: e });
store.subscribe(() => console.log('store updated:', store.getState()));

// * -------------------------------- trigger management

const inner$ = new Subject();
const outer$ = new Subject();
const end$ = new Subject();

inner$.subscribe(updateStore);
outer$.subscribe(updateStore);

store.subscribe(() => end$.next(store.getState()));

const realEnd$ = inner$.pipe(withLatestFrom(end$));

realEnd$.subscribe((e) => console.log('real end triggered', e));

// * -------------------------------- try it

console.log('----');

inner$.next('hello from inner');

console.log('----');

outer$.next('hello from outer');
