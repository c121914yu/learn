# js面向对象

## 传统方式：
```js
function People(name,age){
	this.name = name
	this.age = age
	this.getInfo = () => {
		console.log(`name: ${this.name},age: ${this.age}`)
	}
}

let people1 = new People('yjl',20)
let people2 = new People('ddc',19)
people1.getInfo() // name: yjl,age: 20
people2.getInfo() // name: ddc,age: 19
```

## class方式
```js
// 创建一个类l,首字母大写
class People{
	constructor(name,age) {
		this.name = name
		this.age = age
	}
	getInfo(){
		console.log(`name: ${this.name},age: ${this.age}`)
	}
}

// 继承父类
class Student extends People{
	constructor(name,age,number){
		super(name,age) //调用父类的构建方法
		// 特有的构建方法
		this.number = number
	}
	getInfo(){
		// 调用父类的方法
		super.getInfo()
		// 额外方法
		console.log(`number: ${this.number}`)
	}
}

let people1 = new People('yjl',20)
let people2 = new People('ddc',19)
people1.getInfo() // name: yjl,age: 20
people2.getInfo() // name: ddc,age: 19

let student1 = new Student('yjl',20,201806022122)
student1.getInfo() // name: yjl,age: 20 number: 201806022122
```

> constructor - 构建函数（子类不写默认为父类的构建函数）
> extends - 继承关键字
> super - 子类指向父类的属性/方法


## 特殊点
* 子类构建函数在使用this前要先使用super构造  
* 子类不能通过super.属性 获取属性