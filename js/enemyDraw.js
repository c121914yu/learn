var enemys = new Array()
var Einfo = {
	speed : 1,
	newEnemySpeed : 700,
	mulGrad : 0,
	rand1 : 0.7,
	rand2 : 0.9
}
function enemyDraw(canvas){
	eTimer = setInterval(() => {
		if(enemys.length < 30){
			const index = getRandNum()
			const enemy = new Enemy(index)
			enemys.push(enemy)
			enemy.draw()
			getSound('enemy3_flying').play()
		}
	},Einfo.newEnemySpeed)
	
	const ctx = canvas.getContext('2d')
	ctx.globalCompositeOperation = "source-over"
	function Enemy(i){
		this.type = i //记录敌机类型
		const info = objEnemy(this.type)
		this.width = info.width
		this.height = info.height
		this.life = info.life
		this.grad = info.grad + Einfo.mulGrad
		this.downTimes = info.downTimes
		this.downSound = info.downSound
		this.x = getRandX(this.width)
		this.y = -this.height
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
				this.y += Einfo.speed
				return false
			}
		}
		this.HeroisHit = () => {
			if(isHit(this,hero)){
				hero.draw = () => {
					hero.destroy()
				}
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

var EnemyProp = [
	{name:'SetRand',log:"敌机出现概率改变",prop:()=>{Einfo.rand1-=0.05;Einfo.rand2-=0.05}},
	{name:'amountMore',log:"敌机数量少量增加",prop:()=>{Einfo.newEnemySpeed-=50}},
	{name:'faster',log:"敌机速度增加",prop:()=>{Einfo.speed+=0.5;bgSpeed+=0.5}},
	{name:'amountMore',log:"敌机数量大量增加",prop:()=>{Einfo.newEnemySpeed-=80}},
]
function enemyHigh(){
	if(enemyProp > 2){
		let i = 0
		if(Rand(0.4))
			i = 4
		else if(Rand(0.3))
			i = 2
		EnemyProp[i].prop()
		console.log(EnemyProp[i].log)
	}
	else{
		EnemyProp[enemyProp].prop()
		console.log(EnemyProp[enemyProp].log)
	}
	enemyProp++
	Einfo.mulGrad +=enemyProp
	console.log(Einfo)
}

function getRandNum(){//随机获取敌机
	//出现概率设置
	const rand = Math.random()
	if(rand < Einfo.rand1)
		return 0
	else if(rand < Einfo.rand2)
		return 1
	else
		return 2
}