var hero = ""
function heroDraw(canvas){
	hero = new Hero()
	/* hero对象 */
	function Hero(){
		this.width = 66
		this.height = 82
		this.beginX = cWidth/2 - this.width/2
		this.beginY = cHeight - this.height - 20
		this.x = this.beginX
		this.y = this.beginY
		this.bool = 0 //记录飞机状态,1 2图来回切换 
		/* 记录方向 */
		this.right = false
		this.left = false
		this.down = false
		this.up = false
		
		let timer
		const ctx = canvas.getContext('2d')
		ctx.beginPath()
		
		this.draw = function(x,y){
			clear(herocvs)
			ctx.drawImage(heroImg[this.bool],x,y,this.width,this.height)
		}
		
		/* 移动位置记录 */
		let lastX = this.x + this.width/2
		let lastY = this.y + this.width/2
		let moveX = this.x + this.width/2
		let moveY = this.y + this.width/2
		
		/* 移动判断 */
		this.move = ()=> {
			const speedX = 4
			const speedY = speedX+1
			if(this.left && this.x > 1 && this.x > (moveX-this.width)){
				this.x -= speedX
				lastX = this.x
			}
			else if(this.right && (this.x+this.width) < cWidth-1 && this.x < (moveX-this.width)){
				this.x += speedX
				lastX = this.x
			}
			if(this.up && this.y > 1 && this.y > (moveY-this.height)){
				this.y -= speedY
				lastY = this.y
			}
			else if(this.down && (this.y+this.height) < cHeight-1 && this.y < (moveY-this.height)){
				this.y += speedY
				lastY = this.y
			}
		}
		
		let start = () => {
			if(moveX > lastX){
				this.right = true
				this.left = false
			}
			else if(moveX < lastX){
				this.left = true
				this.right = false
			}
			if(moveY > lastY){
				this.down = true
				this.up = false
			}
			else if(moveY < lastY){
				this.up = true
				this.down = false
			}
			lastX = moveX
			lastY = moveY
		}
		let stop = () => {
			herocvs.onmousemove = ""
			herocvs.ontouchmove = ""
			this.right = false
			this.left = false
			this.down = false
			this.up = false
		}
		
		/* 移动端事件 */
		herocvs.ontouchstart = () => {
			let e = event || window.event
			herocvs.ontouchmove = (event) => {
				let e = event || window.event
				moveX = e.changedTouches[0].pageX + this.width/2
				moveY = e.changedTouches[0].pageY + this.width/2
				start()
			}
		}
		herocvs.ontouchcancel = () => {
			stop()
		}
		herocvs.ontouchend = () => {
			stop()
		}
		/* pc端事件 */
		herocvs.onmousedown = () => {//鼠标按下后监听移动
			herocvs.onmousemove = (event) => { 
				let e = event || window.event
				moveX = e.offsetX + this.width/2
				moveY = e.offsetY + this.width/2
				start()
			}
		}
		herocvs.onmouseup = () => { //鼠标抬起
			stop()
		}
		herocvs.onmouseleave = () => { //鼠标离开
			stop()
		}	
	}
}