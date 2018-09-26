# S.O.L.I.D五大原则之开闭原则OCP
<b> open for extension（对扩展开放）的意思是说当新需求出现的时候，可以通过扩展现有模型达到目的。而Close for modification（对修改关闭）的意思是说不允许对该实体做任何修改，说白了，就是这些需要执行多样行为的实体应该设计成不需要修改就可以实现各种的变化，坚持开闭原则有利于用最少的代码进行项目维护。</b>

先来创建一个通用的questionCreator函数,代码的作用组合要是render一个问题，同时提供一个未实现的renderInput方法以便其他function可以覆盖，以使用不同的问题类型

choiceQuestionCreator函数和inputQuestionCreator函数分别对应下拉菜单和input输入框的renderInput实现，通过内部调用统一的questionCreator(spec, my)然后返回that对象（同一类型哦）。

## 代码里应用了一些技术点
<br/>
首先，questionCreator方法的创建，可以让我们使用模板方法模式将处理问题的功能delegat给针对每个问题类型的扩展代码renderInput上。<br/>
其次，我们用一个私有的spec属性替换掉了前面question方法的构造函数属性，因为我们封装了render行为进行操作，不再需要把这些属性暴露给外部代码了。<br/>
第三，我们为每个问题类型创建一个对象进行各自的代码实现，但每个实现里都必须包含renderInput方法以便覆盖questionCreator方法里的renderInput代码，这就是我们常说的策略模式。
<br/>
通过重构，我们可以去除不必要的问题类型的枚举AnswerType，而且可以让choices作为choiceQuestionCreator函数的必选参数（之前的版本是一个可选参数）。
<br/>

## 总结
<br/>
重构以后的版本的view对象可以很清晰地进行新的扩展了，为不同的问题类型扩展新的对象，然后声明questions集合的时候再里面指定类型就行了，view对象本身不再修改任何改变，从而达到了开闭原则的要求。
