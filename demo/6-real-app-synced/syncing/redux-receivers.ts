import * as ReduxHandler from './redux-handler';
import { zipTriggersWithPass } from './util';
import { BackboneTriggers, BackboneEnd$ } from './backbone-triggers';

// * ------------------------------------------------ before mutation

// * 同理，这里就不写说明了，可以参考 `backbone-receivers.ts`

export const ReduxReceivers = zipTriggersWithPass(BackboneTriggers, BackboneEnd$);

// * ---------------- subscription

// * 这里的的 payload 是 BackboneTriggers.addItem$ 发出的，类型是一个 item，data 是完整的 items 列表
// * 那么这里的业务逻辑可以用 payload 实现，也可以用 data 实现
// * 后续如果将该功能从 Backbone 改造为 React/Redux，那么这个 stream 就可以移到 ReduxReceivers 里了

ReduxReceivers.addItem$.subscribe(([payload, data]) => {
  ReduxHandler.forceUpdateItems(data.items);
});

// * 清除功能比较简单，也可以不借助传参，直接自己完成

ReduxReceivers.clearItems$.subscribe(([payload, data]) => {
  ReduxHandler.cleanItems();

  // * 也可以 ReduxHandler.forceUpdateItems([]); 总之这个只是 demo
});
