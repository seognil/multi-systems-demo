import { ItemData } from '../types';
import { boneInst } from '../backbone';

// * ------------------------------------------------ 这些功能来源于 backbone 系统内，是原有的功能

export const addItem = (item: ItemData) => {
  const model = boneInst.model;
  const nextItems = [...model.get('items'), item];
  model.set('items', nextItems);
};

export const cleanItems = () => {
  boneInst.model.set('items', []);
};

// * ------------------------------------------------ 这些功能来源于外部系统，是新开发的功能

export const reorderItems = (items: ItemData[]) => {
  boneInst.model.set('items', items);
};

// * 也可以直接只写一个方法，来直接将 redux store 数据 map 到 backbone model 数据
// * 反正旧系统的功能最终都会退役，所以这里就没必要单独写每个新功能了
