function startDraw(canvas){
	bg = new bgDraw(bgcvs)
	const ctx = canvas.getContext('2d')
	ctx.beginPath()
	
	/* 绘制飞机 */
	const heroX = cWidth/2 - 33
	const heroY = cHeight/2- 91 - 82
	ctx.drawImage(heroImg[0],heroX,heroY,66,82)
	/* 绘制文字 */
	const fontSize = 45
	const fX = cWidth/2-90
	const fY = cHeight/2-50
	ctx.font = `bold italic ${fontSize}px 'MedievalSharp',cursive`
	ctx.fillStyle = "#6d7779"
	ctx.fillText("\"",fX-40,fY)
	ctx.fillText("飞",fX-10,fY)
	ctx.fillText("机",fX+fontSize,fY)
	ctx.fillText("大",fX+2*fontSize,fY)
	ctx.fillText("战",fX+3*fontSize,fY)
	ctx.fillText("\"",fX+4*fontSize+10,fY)
	/* 开始按键 */
	ctx.strokeStyle = "#484f51"
	const btnX = cWidth/2 - 70
	const btnY = cHeight/2
	ctx.drawImage(homeImg[0].img,btnX,btnY,140,50)
	/* 判断是否点击到开始按键 */
	canvas.ontouchend = (event) => {
		const e = event || window.event
		const x = e.changedTouches[0].pageX
		const y = e.changedTouches[0].pageY
		
		const minX = cWidth/2 - 70
		const maxX = cWidth/2 + 70
		const minY = cHeight/2
		const maxY = cHeight/2 + 50
		
		if(x > minX && x <maxX && y > minY && y <maxY){
			clear(canvas)
			startGame()
		}
	}
}

function overDraw(){
	/* 计算历史最高 */
	let highGrad = Number(localStorage.getItem('highGrad'))
	if(userGrad > highGrad){
		localStorage.setItem('highGrad',String(userGrad))
		highGrad = userGrad
	}
	
	const ctx = homecvs.getContext('2d')
	ctx.beginPath()
	ctx.fillStyle = "#6d7779"
	const img = homeImg.find(item => {
		return item.name === "gameover"
	})
	
	/* 图片 */
	const imgX = cWidth*0.1
	const imgW = cWidth*0.8
	const imgH = imgW*2/3
	const imgY = cHeight/2 - imgH/2
	ctx.drawImage(img.img,imgX,imgY,imgW,imgH)
	
	/*  历史最高 */
	const highX = cWidth/2 - 80
	const highY = cHeight*0.15
	loadText(highX,highY,'bolder','italic',40,"历史最高")
	
	/* 最高分数 */
	const fontLen = String(highGrad).length
	const HgradX = cWidth/2 - fontLen/2*20
	const HgradY = highY + 60
	loadText(HgradX,HgradY,'normal','normal',30,highGrad)
	
	/* 成绩 */
	const gradX = imgX + imgW*0.25
	const gradY = imgY + imgH*0.25
	loadText(gradX,gradY,'lighter','italic',25,userGrad)
	
	/* 重新开始 */
	const againX = cWidth/2 - 44
	const againY = imgY + imgH*0.61
	loadText(againX,againY,'normal','normal',22,"重新开始")
	
	/* 上传分数 */
	const upX = cWidth/2 - 44
	const upY = imgY + imgH*0.84
	loadText(upX,upY,'normal','normal',22,"提交分数")
	
	function loadText(x,y,weight,style,size,text){
		ctx.font = `${weight} ${style} ${size}px 'MedievalSharp',cursive`
		ctx.fillText(text,x,y)
	}
	
	homecvs.ontouchend = (event) => {
		const e = event || window.event
		const x = e.changedTouches[0].pageX
		const y = e.changedTouches[0].pageY
		
		const minX1 = againX - imgW*0.2
		const maxX1 = againX + 4*25 + imgW*0.18
		const minY1 = againY - 25
		const maxY1 = againY + 5
		
		const minX2 = upX - imgW*0.2
		const maxX2 = upX + 4*25 + imgW*0.15
		const minY2 = upY - 25
		const maxY2 = upY + 10
		if(x > minX1 && x <maxX1 && y > minY1 && y <maxY1){
			clear(homecvs)
			startGame()
		}
		else if(x > minX2 && x <maxX2 && y > minY2 && y <maxY2)
			alert("暂未设计")
	}
}