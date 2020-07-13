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
		super(name,age)
		this.number = number
	}
	getInfo(){
		super.getInfo()
		console.log(`number: ${this.number}`)
	}
}

// let people1 = new People('yjl',20)
// let people2 = new People('ddc',19)
// people1.getInfo() // name: yjl,age: 20
// people2.getInfo() // name: ddc,age: 19

// let student1 = new Student('yjl',20,201806022122)
// student1.getInfo()

// 封装dom选择
var $ = function(id){
	return document.getElementById(id)
}
class Text{
	constructor(dom){
		this.dom = dom
	}
	space(){
		this.dom.innerText = ""
	}
	addtext(text){
		this.dom.innerText = text
	}
}
const text1 = new Text($('test'))

text1.addtext('测试')

setTimeout(() => {
	text1.space()
},1000)