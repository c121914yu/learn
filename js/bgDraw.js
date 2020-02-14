var bg
function bgDraw(canvas){
	this.move = false
	let ctx = canvas.getContext('2d')
	ctx.beginPath()
	
	let x = 0,y = 0
	ctx.drawImage(bgImg,x,y,cWidth,cHeight)
	
	this.Move = () => {//背景移动
		if(this.move){
			clear(bgcvs)
			ctx.drawImage(bgImg,x,y,cWidth,cHeight)
			ctx.drawImage(bgImg,x,y-cHeight,cWidth,cHeight)
			y += 2
			if(y > cHeight)
				y = 0
		}
		window.requestAnimationFrame(this.Move)
	}
	this.Move()
}