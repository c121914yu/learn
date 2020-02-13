var enemys = new Array()
var newEnemySpeed = 700
function enemyDraw(canvas){
	eTimer = setInterval(() => {
		if(enemys.length < 30){
			const index = getRandNum()
			const enemy = new Enemy(index)
			enemys.push(enemy)
			enemy.draw()
		}
	},newEnemySpeed)
	
	const ctx = canvas.getContext('2d')
	ctx.globalCompositeOperation = "source-over"
	function Enemy(i){
		const info = objEnemy(i)
		this.width = info.width
		this.height = info.height
		this.life = info.life
		this.grad = info.grad
		this.x = getPlace(this.width)
		this.y = -this.height
		const img = enemyImg[i][0]
		
		this.draw = () => {
			ctx.drawImage(img,this.x,this.y,this.width,this.height)
		}
		this.move = () => {
			this.y += 1
			if(this.y >= cHeight)
				return true
			else
				return false
		}
		this.HeroisHit = () => {
			if(isHitHero(this,hero))
				overGame(homecvs)
		}
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

function objEnemy(i){
	const enemy1 = {
		life : 2,
		width : 36,
		height : 27,
		grad : 1
	}
	const enemy2 = {
		life : 5,
		width : 44,
		height : 63,
		grad : 2
	}
	const enemy3 = {
		life : 8,
		width : 66,
		height : 101,
		grad : 3
	}
	switch(i){
		case 0:return enemy1;break
		case 1:return enemy2;break
		case 2:return enemy3;break
	}
}

function getPlace(width){
	let min = 0
	let max = cWidth-width
	let x = Math.random() * cWidth
	if(x > max)
		x = max
	return x
}

function getRandNum(){
	//出现概率设置
	const rand = Math.random()
	if(rand < 0.6)
		return 0
	else if(rand < 0.85)
		return 1
	else if(rand <= 1)
		return 2
}