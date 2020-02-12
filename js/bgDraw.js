function bgDraw(canvas){
	let ctx = canvas.getContext('2d')
	ctx.beginPath()
	let x = 0,y = 0
	bgMove()
	function bgMove(){//背景移动
		clear(ctx)
		ctx.drawImage(bgImg,x,y,cWidth,cHeight)
		ctx.drawImage(bgImg,x,y-cHeight,cWidth,cHeight)
		y += 2
		if(y > cHeight)
			y = 0
		window.requestAnimationFrame(bgMove)
	}
}