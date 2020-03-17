var lastX,lastY
var click = false
var angleX = angleY = Math.PI / 4
function move(render){
  // 监听事件
  render.onmousedown = (event) => {
    const e = event || window.event
    lastX = e.clientX
    lastY = e.clientY
    click = true
  }
  render.onmouseup = () => {
    click = false
  }
  render.onmouseleave = () => {
    click = false
  }
  render.onmousemove = (event) => {
    if(!click) return
    const e = event || window.event
    const x = e.clientX
    const y = e.clientY
    if(x-lastX < 0){
      angleX -= Math.PI / 360
    }
    else if(x-lastX > 0){
      angleX += Math.PI / 360
    }
    if(y-lastY < 0){
      angleY += Math.PI / 360
    }
    else if(y-lastY > 0)
      angleY -= Math.PI / 360
    camera.lookAt(5*Math.cos(angleX),75**0.5*Math.sin(angleY),5*Math.sin(angleX))
    camera.updateProjectionMatrix () //更新相机数据
    lastX = x
    lastY = y
  }
  
  // 键盘
  window.onkeydown = (e) => {
    console.log(e)
  }
}