//获取节点
const fill = document.querySelector(".fill")
const empties = document.querySelectorAll('.empty')

for(const empty of empties){
  empty.addEventListener('dragover',dragOver)
  empty.addEventListener('dragenter',dragEnter)
  empty.addEventListener('dragleave',dragLeave)
  empty.addEventListener('drop',dragDrop)
}

//图片拖拽事件
fill.ondragstart = (e) => {
  e.target.className += " hold"
  setTimeout(() => {
    e.target.className = "invisible"
  },0)
}

fill.ondragend = (e) => {
  e.target.className = "fill"
}

//空格监听拖拽事件
function dragOver(e){//拖动对象处于容器内时
  e.preventDefault()//阻止默认拖拽时间才能有drop事件
}
function dragEnter(e){//进入容器范围
  this.className += ' hovered'
}
function dragLeave(){//离开容器
  this.className = 'empty'
}
function dragDrop(){//释放
  this.className = 'empty'
  this.append(fill)
}