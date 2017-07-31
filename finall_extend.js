function extend(sub,sup){//目的：实现只继承父类的原型对象
	var F = new Function();//1 创建一个空函数，目的：空函数进行中转
	F.prototype=sup.prototype;//2 实现空函数的原型对象和超累的原型对象转换
	sub.prototype=new F();//3 原型继承 因为F的模版是空的
	sub.prototype.constructor=sub;// 4 还原子类的构造器
	sub.uber=sup.prototype;//保存一下父类原型对象：1、方便解耦 2、轻松获得父类的原型对象//自定义一个子类的静态属性，接收父类的原型对象
	if(sup.prototype.constructor==Object.prototype.constructor){//判断父类的原型对象的构造器（加保险）
		sup.prototype.constructor=sup;//手动还原父类的原型对象的构造器
	}
}
//混合继承：原型继承和借用构造函数的继承
function Person(name,age){
	this.name=name;
	this.age=name;
}
Person.prototype={//字面的（匿名的）原型表示方式，需要加上constructror属性重置父类的原型的构造器
	constructror:Person,
	sayHello:function(){
		alert('hello world');
	}
}
function Boy(name,age,sex){
	//Person.call(this,name,age);//call 绑定父类的模版函数，实现借用构造函数继承，只复制了父类的模版
	sub.uber.constructor.call(this,name,sex);//子类Boy跟父类没有任何关系，解耦
	this.sex=sex;
}
//给子类加了一个原型对象的方法 -重写
Boy.prototype.sayHello=function(){
	alert('hi javascript');
}
//Boy.prototype=new Person();//原型继承的方式：既继承了父类的模版，又继承了父类的原型对象
//改进：只继承一遍父类的原型对象
extend(Boy,Person);
var b=new Boy('张三',20,'男');
//混合继承的缺点：3件事：继承了2次父类的模版，继承了一次父类的原型对象
//extend 方法
//2件事：继承1次父类的模版 继承一次父类的原型对象
alert(Boy.prototype.constructor);
alert(b.name);
alert(b.sex);
b.sayHello();//hi javascript  想调用父类的sayHello方法
Boy.uber.sayHello.call(b);//保存了父类的原型对象之后  有重写的方法的时候可以进行区分