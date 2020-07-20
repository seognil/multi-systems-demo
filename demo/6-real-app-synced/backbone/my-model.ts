import { BackboneTriggers, bindBackboneEnd } from './../syncing/backbone-triggers';
import { createEmptyImg, createEmptyText } from './create-items';
import Backbone from 'backbone';
import { ItemData } from '../types';

export type MyBoneState = {
  proj_id: string;
  title: string;
  items: ItemData[];
};

// * ---------------- let's make some 'just-worked' code for the demo

export class MyBoneModel extends Backbone.Model<MyBoneState> {
  defaults(): MyBoneState {
    return {
      proj_id: '',
      title: '空文稿',
      items: [],
    };
  }
  initialize() {
    const id = Math.random().toString(36).slice(-6);
    this.set({ proj_id: id, title: `专案_${id}` });

    bindBackboneEnd(this);
  }
  addItem(type: 'img' | 'text') {
    const createItem = type === 'img' ? createEmptyImg() : createEmptyText();

    // @ts-ignore
    createItem.then((item) => {
      // const nextItems = [...this.get('items'), item];
      // this.set('items', nextItems);

      // * 将直接数据变更，改向 stream
      BackboneTriggers.addItem$.next(item);
    });
  }
  clearAll() {
    // this.set('items', []);

    // * 将直接数据变更，改向 stream
    BackboneTriggers.clearItems$.next();
  }
}
