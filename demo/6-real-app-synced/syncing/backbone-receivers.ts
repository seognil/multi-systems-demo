import * as BackboneHandler from './backbone-handlers';
import { zipTriggersWithPass } from './util';
import { ReduxTriggers, ReduxEnd$ } from './redux-triggers';

// * ------------------------------------------------ before mutation

// * 也可以根据需要调整 zipTriggersWithPass 方法，对接收到数据进行 map
// * 这里只做 demo 用，就不处理了
const BackboneRecivers = zipTriggersWithPass(ReduxTriggers, ReduxEnd$);

// * 也可以建立同样模式的多组 streams，接收不同系统的事件
// * 比如 const others = zipTriggersWithPass(System3Triggers, System3End$);

// * ---------------- subscription

// * 这里的 payload 是从 ReduxTriggers.reorder$ 发出时的 payload，可以灵活使用，
// * 如果不需要，也可以在生成 BackboneRecivers 的时候预先 map 好

// * demo 中的数据结构比较简单，可以直接使用，业务中可能更为具体，需要更多的处理逻辑

BackboneRecivers.reorder$.subscribe(([payload, data]) => {
  BackboneHandler.reorderItems(data.items);
});
