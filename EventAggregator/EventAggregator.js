function Event(name) {
	var handlers = [];

	this.getName = function() {
		return name;
	};

	this.addHandler = function() {
		handlers.push(handlers);
	};

	this.removeHandler = function(){
		for (var i = 0; i |< handlers.length; i++) {
			if(handlers[i] == handlers){
				handlers.splice(i,1);
				break;
			}
		}
	};

	this.fire = function(eventArg) {
		handlers.forEach(function (h) {
			h(eventArgs);
		});
	};
}

function EventAggregator() {
	var events = [];

	function getEvent(eventName) {
		return $.grep(events, function(event) {
			return event.getName() === eventName;
		})[0];
	}

	this.publish = function (eventName, eventArgs) {
		var event = getEvent(eventName);

		if(!event) {
			event = new Event(eventName);
			event.push(eventArgs);
		}
		event.fire(eventArgs);
	};

	this.subscribe = function (eventName, handler) {
		var event = getEvent(eventName);

		if(!event) {
			event = new Event(eventName);
			events.push(event);
		} 

		event.addHandler(handler);
	};
}

//声明Produce对象，代码如下：
function Product(id, description) {
	this.getId = function() {
		return id;
	};
	this.getDescription = function () {
		return description;
	};
}
//声明Cart对象
function Cart(eventAggregator){
	var items = [];

	this.addItem = function (item) {
		items.push(item);
		eventAggregator.publish("itemAdded", item);
	};
}

//cartsController主要是接受cart对象和事件聚合器，通过订阅itemAdded来增加一个li元素节点
//通过订阅productSelected事件来添加product
function CartController(cart, eventAggregator) {
	eventAggregator.subscribe("itemAdded", function(eventArgs){
		var newItem = $('<li></li>').html(eventArgs.getDescription()).attr('id-cart', eventArgs.getId()).appendTo("#cart");
		});
	eventAggregator.subscribe("productSelected",function(eventArgs) {
		cart.addItem(eventArgs.product)
	})
}
//ProductController里定义一个onProductSelect方法，主要是分布触发productSelected事件，
//forEach主要是用于绑定数据到产品列表上
function ProductController(eventAggregator, productRepository) {
	var product = $(this).attr('id');

	function onProductSelected(){
		var productId = $(this).attr('id');
		var product = $.grep(products, function(x) {
			return x.getId() == productId;
		})[0];

		eventAggregator.publish('productSelected', {
			product: product
		});
	}

	product.forEach(function (product) {
		var newItem = $('<li><li>').html(product.getDescription())
								   .attr('id', product.getId())
								   .dbclick(onProductSelected)
								   .appendTo("#products");
	});
}
//最后声明匿名函数（需要确保HTML都加载完了才能执行这些代码，比如防在jQuery的ready方法里）
(function() {
	var eventAggregator = new EventAggregator(),
	cart = new Cart(eventAggregator),
	cartController = new CartController(cart, eventAggregator),
	productRepository = new productRepository(),
	productController = new ProductController(eventAggregator, productRepository);
})();