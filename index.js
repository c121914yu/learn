const btn1 = document.querySelector('.btn1')
const btn2 = document.querySelector('.btn2')
const ul1 = document.getElementById('ul1')
const ul2 = document.getElementById('ul2')
const main = document.querySelector('.main')

btn1.addEventListener('mouseenter',()=>{
	const height = 30 * ul1.children.length + 5
	console.log(height+'px')
	ul1.style.height = height+'px'
	btn1.classList.add('active')
})
btn1.addEventListener('mouseleave',()=>{
	ul1.style.height = '0'
	btn1.classList.remove('active')
})

let btn2Active = false
btn2.addEventListener('click',(event)=>{
	if(btn2Active){
		btn2Active = false
		ul2.style.height = '0'
		btn2.classList.remove('active')
	}
	else{
		const height = 30 * ul2.children.length + 5
		btn2Active = true
		console.log(height+'px')
		ul2.style.height = height+'px'
		btn2.classList.add('active')
	}
	event.stopPropagation()//阻止事件冒泡
})

main.addEventListener('click',()=>{
	/* 点击其他区域关闭下拉菜单 */
	btn2Active = false
	ul2.style.height = '0'
	btn2.classList.remove('active')
})