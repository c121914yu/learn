const container = document.getElementById('container')
const circleArr = []//[行][列]

const rows = 15
const cols = 15

for(let i=0;i<cols;i++){
	circleArr[i] = new Array()
	for(let j=0;j<rows;j++){
		const circle = document.createElement('div')
		circle.classList.add('circle')
		container.appendChild(circle)
		circleArr[i].push(circle)
	}
}

circleArr.forEach((circle,i) => {
	circle.forEach((item,j) => {
		item.onclick = () => {
			growCircle(i,j)
		}
	})
})

function growCircle(i,j){
	if(circleArr[i] && circleArr[i][j]){
		if(!circleArr[i][j].classList.contains('grow')){
			circleArr[i][j].classList.add('grow')
			setTimeout(() => {
				growCircle(i-1,j)
				growCircle(i+1,j)
				growCircle(i,j-1)
				growCircle(i,j+1)
			},100)
			setTimeout(() => {
				circleArr[i][j].classList.remove('grow')
			},300)
		}
	}
}