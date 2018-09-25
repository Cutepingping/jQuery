
# Event Aggregator
# S.O.L.I.D五大原则之单一职责SRP
将多个对象的事件通道转换为单个对象，以简化客户端的注册。
## 怎么运行的
一个事件聚合是间接的简单元素。在最简单的形式中，您可以注册所有您感兴趣的源对象，并使所有目标对象都注册到 Event Aggregator。Event Aggregator通过将该事件传播到目标对象来响应源对象中的任何事件。

最简单的Event Aggregator将来自多个对象的事件聚合到自身中，将同一事件传递给其观察者。一个 事件聚合器还可以推广的情况下，将特定于源对象的事件变成一个更通用的事件。这样，聚合器的观察者不需要注册尽可能多的单个事件类型。这简化了观察者的注册过程，代价是通知可能对观察者没有任何实质性影响的事件。

由于事件聚合器基于观察者，因此使用观察者考虑所有危险区域非常重要。

## 何时使用它
当您有许多潜在事件源的对象时，Event Aggregator是一个不错的选择。您可以将注册逻辑集中到Event Aggregator，而不是让观察者处理所有注册。除了简化注册外， Event Aggregator还简化了使用观察者时的内存管理问题。

首先我们先来实现事件聚合的功能，该功能分为2部分，1个是Event，用于Handler回调的代码，1个是EventAggregator用来订阅和发布Event<br/>
然后，我们来声明Product对象，声明Cart对象并将该对象的addItem的function里我们要触发发布一个事件itemAdded，然后将item作为参数传进去。<br/>
声明CartController主要是接受cart对象和事件聚合器，通过订阅itemAdded来增加一个li元素节点，通过订阅productSelected事件来添加product。<br/>
声明Repository的目的是为了获取数据（可以从ajax里获取），然后暴露get数据的方法。<br>
声明ProductController里定义了一个onProductSelect方法，主要是发布触发productSelected事件，forEach主要是用于绑定数据到产品列表上。<br/>
声明匿名函数（需要确保HTML都加载完了才能执行这段代码，比如放在jQuery的ready方法里）
