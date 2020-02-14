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
		this.speed = 4
		this.bool = 0 //记录飞机状态,1 2图来回切换 
		this.destroyTimes = 4
		this.bomb = new Object()
		this.bombAmount = 0
		this.pr = new Object() //暂停/开始
		this.ImgDelay = 5
		/* 记录方向 */
		this.right = false
		this.left = false
		this.up = false
		this.down = false
		
		let timer
		const ctx = canvas.getContext('2d')
		ctx.beginPath()
		
		this.draw = () => {
			this.lifeing()
		}
		this.lifeing = () => {
			clear(herocvs)
			const info = drawInfo(ctx,this)
			this.bomb = info.bomb
			this.pr = info.pr
			ctx.drawImage(heroImg[this.bool].img,this.x,this.y,this.width,this.height)
		}
		this.destroy = () => {
			getSound('me_down').play()
			this.move = () => false
			if(this.ImgDelay-- === 0){
				this.ImgDelay = 5
				this.destroyTimes--
			}
			if(this.destroyTimes <= 0){
				overGame()
				return 'overGame'
			}
			const img = getImg(heroImg,'me_destroy_' + (5-this.destroyTimes))
			clear(herocvs)
			ctx.drawImage(img,this.x,this.y,this.width,this.height)
			return 'down'
		}
		this.getBomb = () => {
			getSound('get_bomb').play()
			this.bombAmount++
		}
		this.getBullet = () => {
			getSound('get_bullet').play()
			if(heroProp > 2){
				let i = 0
				if(Rand(0.7))
					i = 1
				propCen[i].prop()
				console.log(propCen[i].log)
			}
			else{
				propCen[heroProp].prop()
				console.log(propCen[heroProp].log)
			}
			heroProp++
			console.log(Binfo)
		}
		
		/* 移动位置记录 */
		let lastX = this.x + this.width/2
		let lastY = this.y + this.width/2
		let moveX = this.x + this.width/2
		let moveY = this.y + this.width/2
		
		/* 移动判断 */
		this.move = ()=> {
			const speedX = this.speed
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
			if(isClick(this.bomb,e) && this.bombAmount > 0){
				this.bombAmount--
				getSound('use_bomb').play()
				enemys.forEach((item,i) => {
					enemyDown(i,false)
				})
			}
			else if(isClick(this.pr,e)){
				if(begining)
					pauseGame(true)
				else
					resumeGame()
			}
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

function drawInfo(ctx){
	/* 生命值 */
	const lifeW = 26
	const lifeH = 32
	const lifeX = 50
	const lifeY = 10
	const lifeImg = getImg(heroImg,'life')
	ctx.drawImage(lifeImg,lifeX,lifeY,lifeW,lifeH)
	/* 分数 */
	const gradX = 80
	const gradY = 33
	ctx.fillStyle = "#242828"
	ctx.font = "lighter italic 23px 'MedievalSharp',cursive"
	ctx.fillText(String.fromCharCode(935)+" "+userGrad,gradX,gradY)
	/* 炸弹标志 */
	const bombW = 40
	const bombH = 40
	const bombX = 15
	const bombY = cHeight - 70 - bombW/2
	const bombImg = getImg(heroImg,'bomb')
	ctx.drawImage(bombImg,bombX,bombY,bombW,bombH)
	/* 炸弹文字 */
	const BamX = bombX
	const BamY = bombY + bombH + 30
	ctx.font = "lighter italic 25px 'MedievalSharp',cursive"
	ctx.fillText(" "+hero.bombAmount,BamX,BamY)
	/* 暂停/开始标志 */
	const prImg = begining ? getImg(heroImg,'pause') : getImg(heroImg,'resume')
	const prX = 10
	const prY = 10
	const prW = 30
	const prH = 30
	ctx.drawImage(prImg,prX,prY,prW,prH)
	
	return {
		bomb : {
			width : bombW,
			heigh : bombH,
			x : bombX,
			y : bombY
		},
		pr : {
			width : prW,
			heigh : prH,
			x : prX,
			y : prY
		}
	}
}