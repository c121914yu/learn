const circle1 = document.querySelector('.circle1')
const circle2 = document.querySelector('.circle2')
const radius = 25

class Vector{
	constructor(x,y){
		this.x = x
		this.y = y
	}
}
const oVector = new Vector(circle1.offsetLeft+radius,circle1.offsetTop+radius)

function angleTo(ratial1,ratial2){
	// ab/|a||b|
	const ab = (ratial1.x * ratial2.x) + (ratial1.y * ratial2.y)
	const A = Math.sqrt(Math.pow(ratial1.x,2)+Math.pow(ratial1.y,2))
	const B = Math.sqrt(Math.pow(ratial2.x,2)+Math.pow(ratial2.y,2))
	const angle = Math.acos(ab/A/B)
	return angle
}

window.onmousemove = (e) => {
	const mVector = new Vector(e.clientX,e.clientY)
	// 求出ox，oy与鼠标的向量
	const ratial = new Vector(mVector.x - oVector.x,mVector.y - oVector.y)
	// 计算鼠标向量与标准向量（1，0)的夹角
	const standard = new Vector(1,0)
	// 0-180
	let angle = angleTo(ratial,standard) * 180 /Math.PI
	
	if(mVector.y < oVector.y)
		angle = -angle
	circle2.style.transform = `rotate(${angle}deg)`
}