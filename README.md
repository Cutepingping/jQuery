# jQuery
## practice
主要是讲解的关于JavaScript的某些方法的使用练习，或是一种较好的代码规范格式的训练。
## S.O.L.I.D五大原则
The Single Responsibility Principle（单一职责SRP）<br/>
The Open/Closed Principle（开闭原则OCP）<br/>
The Liskov Substitution Principle（里氏替换原则LSP）<br/>
The Interface Segregation Principle（接口分离原则ISP）<br/>
The Dependency Inversion Principle（依赖反转原则DIP）<br/>
## Event Aggregator
<b>单一职责SRP （The Single Responsibility Principle）</b>
<br>
单一职责的描述如下：
<br/>
类发生更改的原因应该只有一个<br/>
一个类（JavaScript下应该是一个对象）应该有一组紧密相关的行为的意思是什么？遵守单一职责的好处是可以让我们很容易地来维护这个对象，当一个对象封装了很多职责的话，一旦一个职责需要修改，势必会影响该对象想的其它职责代码。通过解耦可以让每个职责工更加有弹性地变化。<br/>
## OCP
<b>开闭原则OCP（The Open/Closed Principle ）。</b>
<br/>
开闭原则的描述是：
<br/>
软件实体（类，模块，方法等等）应当对扩展开放，对修改关闭，即软件实体应当在不修改的前提下扩展。<br/>
open for extension（对扩展开放）的意思是说当新需求出现的时候，可以通过扩展现有模型达到目的。而Close for modification（对修改关闭）的意思是说不允许对该实体做任何修改，说白了，就是这些需要执行多样行为的实体应该设计成不需要修改就可以实现各种的变化，坚持开闭原则有利于用最少的代码进行项目维护。<br/>
