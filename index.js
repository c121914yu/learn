const slides = document.querySelectorAll('.slide')
const next = document.querySelector('.next')
const back = document.querySelector('.back')

let auto = setInterval(() => {
	nextSlide()
},5000)

function nextSlide(){
	const current = document.querySelector('.current')
	/* 为下一个元素添加current */
	if(current.nextElementSibling)
		current.nextElementSibling.classList.add('current')
	else
		slides[0].classList.add('current')
	
	current.classList.remove('current')
}

function backSlide(){
	const current = document.querySelector('.current')
	/* 为上一个元素添加current */
	if(current.previousElementSibling)
		current.previousElementSibling.classList.add('current')
	else
		slides[slides.length-1].classList.add('current')
	
	current.classList.remove('current')
}