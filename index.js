const container = document.querySelector('.container')
const colors = ['#5b8ff9','#6dc8ec','#945fb9','#5ad8a6','#1e9493','#5d7092','#ff9845','#e86452','#ff99c3','#f6bd16']
const totalSquare = 500

for(let i=0;i<totalSquare;i++){
  const square = document.createElement('div')
  square.classList.add('square')
  
  square.onmouseover = () => {
    setColor(square)
  }
  square.onmouseout = () => {
    removeColor(square)
  }
  
  container.appendChild(square)
}

function setColor(square){
  const color = colors[Math.floor(Math.random()*colors.length)]
  square.style.backgroundColor = color
  square.style.boxShadow = `0 0 2px ${color}`
}
function removeColor(square){
  square.style.backgroundColor = '#1d1d1d'
  square.style.boxShadow = `0 0 2px #000000`
}