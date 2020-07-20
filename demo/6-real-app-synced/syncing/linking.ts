import './backbone-receivers';
import './backbone-triggers';
import './redux-receivers';
import './redux-triggers';

// * 初始化所有 streams
// * 实际上 triggers 在各自系统内部是直接使用的，所以也只 import 建立连接关系的 receivers 也可以
