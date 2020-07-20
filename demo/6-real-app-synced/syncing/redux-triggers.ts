import * as ReduxHandler from './redux-handler';
import { ItemData } from '../types';
import { Subject } from 'rxjs';
import { myReduxStore, MyReduxState } from '../redux/store';

// * ------------------------------------------------ before mutation

export const ReduxTriggers = {
  reorder$: new Subject<ItemData[]>(),
};

// * ---------------- subscription

ReduxTriggers.reorder$.subscribe(ReduxHandler.forceUpdateItems);

// * ------------------------------------------------ after mutation

export const ReduxEnd$ = new Subject<MyReduxState>();

myReduxStore.subscribe(() => {
  ReduxEnd$.next(myReduxStore.getState());
});
