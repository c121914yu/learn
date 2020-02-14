var enemys = new Array()
var newEnemySpeed = 700
function enemyDraw(canvas){
	eTimer = setInterval(() => {
		if(enemys.length < 30){
			const index = getRandNum()
			const enemy = new Enemy(index)
			enemys.push(enemy)
			enemy.draw()
			if(index === 2)
				setTimeout(() => {
					getSound('enemy3_flying').play()
				},200)
		}
	},newEnemySpeed)
	
	const ctx = canvas.getContext('2d')
	ctx.globalCompositeOperation = "source-over"
	function Enemy(i){
		this.type = i //记录敌机类型
		const info = objEnemy(this.type)
		this.width = info.width
		this.height = info.height
		this.life = info.life
		this.grad = info.grad
		this.downTimes = info.downTimes
		this.downSound = info.downSound
		this.x = getRandX(this.width)
		this.y = -this.height
		this.speed = 1
		this.isHit = false
		this.ImgDelay = 3 //延迟一定碰撞动画时间
		
		this.draw = () => {
			if(this.life <= 0)
				return this.down()
			else
				return this.lifeing()
		}
		this.lifeing = () => {//生存中
			const img = getEnemyImg(this.isHit,this.type)
			if(this.isHit){
				if(this.ImgDelay-- === 0){
					this.isHit = false
					this.ImgDelay = 3
				}
			}
			else
				this.isHit = false
			ctx.drawImage(img,this.x,this.y,this.width,this.height)
			return false
		}
		this.down = () => {//击落函数
			if(this.ImgDelay-- === 0){
				this.downTimes--
				this.ImgDelay = 3
			}
			if(this.downTimes === 0)
				return true
			const img = enemyImg[this.type][enemyImg[this.type].length - this.downTimes]
			if(img)
				ctx.drawImage(img,this.x,this.y,this.width,this.height)
			return false
		}
		this.move = () => {
			if(this.y >= cHeight)
				return true
			else{
				this.y += this.speed
				return false
			}
		}
		this.HeroisHit = () => {
			if(isHitHero(this,hero)){
				hero.draw = () => {hero.destroy()}
				enemys.forEach((item,i) => {
					enemyDown(i,false,false)
				})
				return true
			}
			else
				return false
		}
	}
}

function getEnemyImg(isHit,i){//获取照片
	if(i != 0 && isHit)
		return enemyImg[i][1]
	else
		return enemyImg[i][0]
}

function enemyDown(i,addGrad=true,sound=true){
	if(sound)
		enemys[i].downSound.play()
	enemys[i].life = 0
	if(addGrad){
		userGrad += enemys[i].grad
		SetGameInfo(enemys[i].grad)
	}
}

function isHitHero(obj1,obj2){//判断碰撞
	const minX1 = obj1.x
	const minY1 = obj1.y
	const maxX1 = minX1 + obj1.width
	const maxY1 = minY1 + obj1.height
	
	const minX2 = obj2.x
	const minY2 = obj2.y
	const maxX2 = minX2 + obj2.width
	const maxY2 = minY2 + obj2.height
	
	const minX = Math.max(minX1,minX2)
	const minY = Math.max(minY1,minY2)
	const maxX = Math.min(maxX1,maxX2)
	const maxY = Math.min(maxY1,maxY2)
	
	if(minX < maxX && minY < maxY)
		return true
	else
		return false
}

function objEnemy(i){//敌机信息
	const enemy1 = {
		life : 2,
		width : 36,
		height : 27,
		grad : 1,
		downTimes : 4,
		downSound : getSound('enemy1_down')
	}
	const enemy2 = {
		life : 5,
		width : 44,
		height : 63,
		grad : 2,
		downTimes : 4,
		downSound : getSound('enemy2_down')
	}
	const enemy3 = {
		life : 8,
		width : 66,
		height : 101,
		grad : 3,
		downTimes : 6,
		downSound : getSound('enemy3_down')
	}
	switch(i){
		case 0:return enemy1;break
		case 1:return enemy2;break
		case 2:return enemy3;break
	}
}

function getRandNum(){//随机获取敌机
	//出现概率设置
	const rand = Math.random()
	if(rand < 0.6)
		return 0
	else if(rand < 0.85)
		return 1
	else if(rand <= 1)
		return 2
}