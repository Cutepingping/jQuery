//下属代码是动态展示question列表的代码（旧代码）
//问题类型
var AnswerType = {
	Choice: 0,
	Input: 1
};
//问题实体
function question(label, answerType, choices) {
	return {
		label: label,
		answerType: answerType,
		choices: choices   //这里的choices是可选参数
	};
}

var view = (function() {
	//render一个问题
	function renderQuestion(target, question) {
		var questionWrapper = document.createElement('div');
		questionWrapper.className = 'question';

		var questionLabel = document.createElement('div');
		questionLabel.className = 'question-label';
		var label = document.createTextNode(question.label);
		questionLabel.appendChild(label);

		var answer = document.createElement('div');
		answer.className = 'question-input';

		//根据不同的类型展示不同的代码：分别是下拉菜单和输入框两种
		if(question.answerType === AnswerType.Choice) {
			var input = document.createElement('select');
			var len = question.choices.length;
			for (var i = 0; i< len; i++) {
				var option = document.createElement('option');
				option.text = question.choices[i];
				option.value = question.choicesp[i];
				input.appendChild(option);
			}
		}else if(question.answerType === AnswerType.Input) {
			var input = document.createElement('input');
			input.type = 'text';
		}

		answer.appendChild(input);
		questionWrapper.appendChild(questionLabel);
		questionWrapper.appendChild(answer);
		target.appendChild(questionWrapper);
	}

	return {
		//遍历所有的问题列表进行展示
		render: function(target, questions) {
			for (var i = 0; i < questions.length; i++) {
				renderQuestion(target, questions[i]);
			};
		}
	};
})();

var questions = [
	question('Have you used tobacc products within the last 20 days'),
	AnswerType.Choice, ['Yes', 'No'],
	question('What medications are you currently using?'，AnswerType.Input)
];

var questionRegion = document.getElementById('questions');
view.render(questionRegion, questions);

//上面的代码，view对象里包含一个render方法用来展示question列表，展示的时候根据不同的question类型
//使用不同的展示方式，一个question包含一个label和一个问题类型以及choices的选项（如果是选择类型的话）。
//如果问题类型是Choice那就根据选项生产一个下拉菜单，如果类型是Input，那就简单地展示input输入框。

//该代码有一个限制，就是如果再增加一个question类型的话，那就需要再次修改renderQuestion里的条件语句，这明显违反了开闭原则。

//重构代码
//让我们来重构一下这个代码，以便在出现新question类型的情况下允许扩展view对象的render能力，而不需要修改view对象内部的代码。
//
//先来创建一个通用的questionCreator函数
function questionCreator(spec, my) {
	var that = {};

	my = my || {};
	my.label = spec.label;

	my.renderInput = function() {
		throw "not implemented";
		//这里renderInput没有实现，主要目的是让各自问题类型的实现代码去覆盖整个方法
	}；

	that.render = function(target) {
		var questionWrapper = document.createElement('div');
		questionWrapper.className = 'question';

		var questionLabel = document.createElement('div');
		questionLabel.className = 'question-label';
		var label = document.createTextNode(spec.label);
		questionLabel.appendChild(label);

		var answer = my.renderInput();
		//该render方法是同样的粗合理代码
		//唯一不同的就是上面的一句my.renderInput()
		//因为不同的问题类型有不同的实现
		
		questionWrapper.appendChild(questionLabel);
		questionWrapper.appendChild(answer);
		return questionWrapper;
	};

	return that;
}

//改代码的作用组合要是render一个问题，同事提供一个未实现的
//renderInput方法以便其它function可以覆盖，已使用不同的问题类型
function choiceQuestionCreator(spec) {
	var my = {},
	that = questionCreator(spec, my);
	//choice类型的renderInput实现
	my.renderInput = function() {
		var  input = document.createElement('select');
		var len = spec.choices.length;
		for(var i = 0; i< len; i++) {
			var option = document.createElement('option');
			option.text = spec.choices[i];
			option.value = spec.choices[i];
			input.appendChild(option);
		}
		return input;
	};
	return that;
}

function inputQuestionCreator(spec) {
	var  my = {},
		that = questionCreator(spec, my);
	my,renderInput = function(){
		var input = document.createElement('input');
		input.type = "text";
		return input;
	};

	return that;
}
//choiceQuestionCreator函数和inputQuestionCreator函数分别对应下拉菜单和input输入框的renderInput实现，通过内部调用统一的questionCreator(spec, my)然后返回that对象（同一类型哦）。
//view对象的代码就很固定了。
//
var view = {
	render: function(target, questions) {
		for (var i = 0; i < questions.length; i++) {
			target.appendChild(questions[i].render());
		}
	}
};

var questions = [
	choiceQuestionCreator({
		label: 'Have you used tobacco products within the last 30 days?',
    	choices: ['Yes', 'No']
　　}),
    inputQuestionCreator({
    	label: 'What medications are you currently using?'
　　})
];

//最后的使用代码，我们可以这样来用
var questionRegion = document.getElementById('questions');

view.render(questionRegion, questions);