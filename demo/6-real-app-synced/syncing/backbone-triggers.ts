import * as BackboneHandler from './backbone-handlers';
import { Subject } from 'rxjs';
import { ItemData } from '../types';
import { MyBoneModel, MyBoneState } from '../backbone/my-model';
import { boneInst } from '../backbone/index';
import { MyBoneView } from '../backbone/my-view';

// * ------------------------------------------------ before mutation

export const BackboneTriggers = {
  addItem$: new Subject<ItemData>(),
  clearItems$: new Subject(),
};

// * ---------------- subscription

BackboneTriggers.addItem$.subscribe(BackboneHandler.addItem);
BackboneTriggers.clearItems$.subscribe(BackboneHandler.cleanItems);

// * ------------------------------------------------ after mutation

export const BackboneEnd$ = new Subject<MyBoneState>();

export const bindBackboneEnd = (model: MyBoneModel) => {
  model.on('change', () => {
    BackboneEnd$.next(boneInst.model.attributes as MyBoneState);
  });
};
