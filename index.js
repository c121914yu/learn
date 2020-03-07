const current = document.getElementById("current")
const imgs = document.querySelectorAll('.imgs img')
const opacity = 0.6

imgs[0].style.opacity = opacity

imgs.forEach(img => {
  img.onclick = (e) => {
    const clickImg = e.target
    const clickSrc = clickImg.src
    
    imgs.forEach(img => {
      img.style.opacity = 1
    })
    
    current.classList.add('fade-in')
    current.src = clickSrc
    setTimeout(()=>current.classList.remove('fade-in'),500)
    clickImg.style.opacity = opacity
  }
})