import { ItemData } from '../types';
import { myReduxStore } from '../redux/store';

// * ------------------------------------------------ 这些功能来源于 react 系统内，是新开发的功能

// * 拖拽排序的计算逻辑提前完成，那么状态更新逻辑就可以简单化了
// * 这里只作 demo 用途，直接更新 state，实际业务中可能有更具体的 state、action 和 reducer
// * 比如，拖拽的计算从提前完成，转变成在 reducer 中进行

export const forceUpdateItems = (items: ItemData[]) => {
  myReduxStore.dispatch({ type: 'force', items });
};

// * ------------------------------------------------ 这些功能来源于外部系统

// * 可以按需进行添加，比如有旧系统有几十个功能，但 react 新写的功能只需要用到几个，那么就可以先只写几个。

export const addItem = (item: ItemData) => {
  const items = myReduxStore.getState().items;
  myReduxStore.dispatch({ type: 'force', items: [...items, item] });
};

export const cleanItems = () => {
  myReduxStore.dispatch({ type: 'force', items: [] });
};

// * 也可以直接只写一个方法，来直接将 backbone model 数据 map 到 redux store 数据
// * 不过别忘了我们的目标是技术栈升级，这些功能以后还是要单独实现的。所以还是一个一个写吧。
