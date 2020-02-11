var canvas,wHeight,wWidth,ctx
var radius = 15
var dia = 2*radius
var grad = 0,speed=120 //分数
var run //动画定时

function start(){
	if(canvas.getContext){
		ctx = canvas.getContext('2d')
		ctx.beginPath()
		ctx.font = "bold 120px arial"
		ctx.strokeText('点击开始',wWidth/4,wHeight/3*2)
		let animate = begining()
		canvas.onclick = function(){
			mark = 0
			run = setInterval(()=>{
				animate()
			},speed)
			canvas.onclick = ""
		}
	}
}
function end(){
	//关闭计时和按键检测
	clearInterval(run)
	document.onkeydown = ""
	setTimeout(() => {
		ctx.clearRect(0,0,wWidth,wHeight)
		ctx.beginPath()
		ctx.font = "bold 50px arial"
		ctx.strokeText(`得分: ${mark}`,wWidth/4+20,wHeight/3)
		ctx.font = "bold 50px arial"
		ctx.strokeText(`重新开始`,wWidth/4,wHeight/2)
		canvas.onclick = function(){
			mark = 0
			speed = 120
			ctx.clearRect(0,0,wWidth,wHeight)
			let animate = begining()
			run = setInterval(()=>{
				animate()
			},speed)
			canvas.onclick = ""
		}
	},120)
}

function begining(){
	ctx.beginPath()
	//画球
	function Ball(x,y,r,color){
		this.x = x
		this.y = y
		this.r = r
		this.color = color
	}
	Ball.prototype.Bdraw = function(){
		ctx.beginPath()
		ctx.fillStyle = this.color
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
		ctx.fill()
	}
	//画蛇
	function Snake(){
		//头
		let x,y
		if(wWidth/2%30 === 0)
			x = wWidth/2-radius
		else
			x = wWidth/2
		if(wHeight/2%30 === 0)
			y = wHeight/2-radius
		else
			y = wHeight/2
		this.head = new Ball(x,y,radius,'blue')
		console.log(wWidth,wHeight)
		console.log(x,y)
		//身体
		this.body = new Array()
		this.direction = 0 //0右 1下 2左 3上
		let Sbody = new Ball(this.head.x-30,this.head.y,radius,'red')
		this.body.push(Sbody)
		
		this.sDraw = function(){
			this.head.Bdraw()
			for(let i=0;i<this.body.length;i++)
				this.body[i].Bdraw()
		}
		this.move = () => { //移动位置计算
			Sbody = new Ball(this.head.x,this.head.y,radius,'red')
			//原蛇头位置添加一个body
			this.body.unshift(Sbody)
			//若没吃到食物,去掉尾部
			if(isInSnake(food.x,food.y,this.head) === false)
				this.body.pop()
			else{
				food = randForFood()
				mark++
				if(mark%5 == 0)
					speed -= 2
			}
			//判断方向,确定头部移动后位置
			switch(this.direction){
				case 0:{
					this.head.x += dia
					break
				}
				case 1:{
					this.head.y += dia
					break
				}
				case 2:{
					this.head.x -= dia
					break
				}
				case 3:{
					this.head.y -= dia
					break
				}
			}
		}//move
	}//snake
	
	function randForFood(){
		let x,y
		let roop = 1
		let getRand = (max) => {
			let rand = Math.round(Math.random() * max)
			return (rand * dia)
		}
		while(roop){
			x = getRand(wWidth / dia - 1) + radius
			y = getRand(wHeight / dia - 1) + radius
			//判断食物是否与蛇头重叠
			if(isInSnake(x,y,snake.head) === false){
				let i = 0
				for(i;i<snake.body.length;i++)
					if(isInSnake(x,y,snake.body[i]))
						break
				if(i === snake.body.length)
					break
			}
		}
		return new Ball(x,y,radius,'green')
	}
	
	/* 判断是否在目标对象内 */
	function isInSnake(x,y,dir){
		const Xmax = x + dia
		const Ymax = y + dia
		const Xmin = x - dia
		const Ymin = y - dia
		// console.log(Xmin,Xmax)
		// console.log(Ymin,Ymax)
		// console.log(dir.x,dir.y)
		if(dir.x > Xmin && dir.x < Xmax && dir.y > Ymin && dir.y < Ymax)
			return true
		else
			return false
	}
	/* 判断碰撞 */
	function isHit(){
		let Xmax = snake.head.x + radius
		let Xmin = snake.head.x - radius
		let Ymax = snake.head.y + radius
		let Ymin = snake.head.y - radius
		if(Xmax > wWidth || Xmin < 0 || Ymax > wHeight || Ymin < 0)
			end()
		snake.body.forEach(item => {
			if(isInSnake(snake.head.x,snake.head.y,item))
				end()
		})
	}
	
	/* 动画更新 */
	function animate(){
		ctx.clearRect(0,0,wWidth,wHeight)
		isHit()
		snake.sDraw()
		food.Bdraw()
		snake.move()
	}
	// run = setInterval(()=>{
	// 	animate()
	// },speed)
	
	/* 添加键盘事件 */
	let last = 39
	document.onkeydown = (event) => {
		let e = event || window.event
		let code = e.keyCode
		if(last === code)
			return
		else if(last === 37 && code === 39)
			return 
		else if(last === 38 && code === 40)
			return
		else if(last === 39 && code === 37)
			return
		else if(last === 40 && code === 38)
			return
		last = code
		switch(code){
			case 37:{
				snake.direction = 2
				snake.move()
				break
			}
			case 38:{
				snake.direction = 3
				snake.move()
				break
			}
			case 39:{
				snake.direction = 0
				snake.move()
				break
			}
			case 40:{
				snake.direction = 1
				snake.move()
				break
			}
		}
	}
	
	ctx.globalCompositeOperation = 'destination-over'
	let snake = new Snake()
	snake.sDraw()
	let food = randForFood()
	food.Bdraw()
	return animate
}

function onLoad(){
	wHeight = document.body.clientHeight - 10
	wHeight = wHeight - (wHeight % 30)
	wWidth = document.body.clientWidth - 10
	wWidth = wWidth - (wWidth % 30)
	canvaSize()
	// begining()
	start()
}

function canvaSize(){
	canvas = document.getElementById('canvas')
	canvas.width = wWidth
	canvas.height = wHeight
}

window.onresize = function() {
  // onLoad()
}
