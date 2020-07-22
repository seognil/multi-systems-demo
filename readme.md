# 项目升级记录

## 简介

为公司的前端项目做的技术栈转型规划，从 Backbone + jQuery 到 Redux + React。

这里是其中的一个部分 —— 在技术栈转型的时期，在单页应用中管理多套开发模式，协调多个状态管理器。

![](./docs/img/map/10-event-by-redux-fs8.png)

## 文档目录

- [新曙光：项目历史背景和新技术栈选型](./docs/stack-switching.md)
- MVVM Revisit
- [在飞行中换发动机：多个系统的状态管理（理论篇）](./docs/multi-systems-in-single-spa.md)
- 用 RxJS 包装 Model 层的 mutation，实现跨系统状态同步
- 搭建和配置 Webpack、Babel、tsconfig 等基础设施
- 利用策略模式组织和自动拆解 Redux Store 的 Reducer
- ...
- [后记](./docs/the-aftermath.md)

## Demo 目录

演示用 Live Demo：<https://seognil-study.github.io/multi-systems-demo/>

我写了一些 Demo，循序渐进地搭建一个 Backbone + Redux 双系统状态同步的 App。

考虑到历史的进程，相同的业务我写了蛮荒时期、Backbone 时期、Redux/React 时期，三种不同风格的实现代码。以便没有相关使用经历的读者能够理解。

在部分代码文件中，我写了一些注释来解释为什么那么做，那么在这里就不赘述了。

```sh
# 状态
npm run manually-1 # 手动管理状态
npm run backbone-1 # Backbone.Model
npm run redux-1 # Redux Store

# 状态 + 渲染
npm run manually-2 # 手动管理状态 + jQuery
npm run backbone-2 # Backbone.Model + Backbone.View + jQuery
npm run redux-2 # Redux + React

# 状态 + 渲染 + 状态变更
npm run manually-3 # 手动管理状态 + jQuery
npm run backbone-3 # Backbone + jQuery
npm run redux-3 # Redux + React

# 多组状态管理器的同步
npm run sync-1 # Redux + 手动管理状态 （死循环）
npm run sync-2 # Redux + Backbone （两次循环后中断）
npm run rxjs-1 # RxJS 单系统
npm run rxjs-2 # RxJS 双系统
npm run rxjs-3 # RxJS 更具体的例子，编写辅助函数

# 完整 App Demo
npm run app-1 # Backbone + Redux 无状态同步
npm run app-2 # Backbone + Redux 有状态同步
```

## 参考资料

> Q：不是在谈论前端项目吗，为啥有好多 iOS 的资料？  
> A：因为技术原理是相通的

- [浅谈 MVC、MVP 和 MVVM 架构模式](https://draveness.me/mvx/)
- [Clean iOS Architecture pt.5: MVC, MVVM, and MVP (UI Design Patterns)](https://www.youtube.com/watch?v=qzTeyxIW_ow)
- [为什么认为 Backbone 是现代前端框架的基石](https://zhuanlan.zhihu.com/p/30982369)
- [函数响应式编程 ( FRP ) 从入门到"放弃"——基础概念篇](https://halfrost.com/functional_reactive_programming_concept/)
- [设计模式](https://refactoringguru.cn/design-patterns/)
