var cWidth,cHeight //画布尺寸
var bgcvs,herocvs,bulletcvs,enemycvs,homecvs,propcvs //各canvas对象

var userGrad = 0
var begining = false

var imgIndex = 0 //用于判断图片全部加载完成

var bgImg = ""
var homeImg = new Array()
var heroImg = new Array()//0 1 默认状态,2-5 destroy
var MbulletImg = new Array() 
var PropImg = new Array() //道具
var enemyImg = new Array()
var infoImg = new Array()
var sounds = new Array() //各声音

var Btimer,eTimer//定时器

var clear = (canvas) => {
	const ctx = canvas.getContext('2d')
	ctx.clearRect(0,0,cWidth,cHeight)
}

//开始游戏
function startGame(){
	requestFullScreen(document.documentElement);
	homecvs.style.display = 'none'
	heroDraw(herocvs)
	initGame()
	resumeGame()
}

//结束游戏
function overGame(){
	pauseGame()
	overDraw()
	homecvs.style.display = 'block'
	Mbullets = new Array()
	enemys = new Array()
	clear(herocvs)
	clear(bulletcvs)
	clear(enemycvs)
	getSound('bgGame').pause()
	getSound('enemy3_flying').pause()
}

//暂停
function pauseGame(draw=false){
	begining = false
	bg.move = false
	clearInterval(Btimer)
	clearInterval(eTimer)
	//再画一次hero
	if(draw){
		hero.draw()
		sounds.forEach((item) => {
			item.audio.pause()
		})
	}
}
//resume
function resumeGame(){
	getSound('bgGame').play()
	bg.move = true
	DrawBullet(bulletcvs)
	enemyDraw(enemycvs)
	begining = true
}

function initGame(){//初始游戏信息
	clear(propcvs)
	clear(enemycvs)
	userGrad = 0
	bgSpeed = 2
	Einfo = {
		speed : 1,
		newEnemySpeed : 700,
		mulGrad : 0,
		rand1 : 0.7,
		rand2 : 0.8
	}
	Binfo = {
		offectX : 0,
		width : 6,
		getBTime : 300,
		mode : 1,
		life : 1
	}
}

function getRandX(width){//获取出现的x轴
	let min = 0
	let max = cWidth-width
	let x = Math.random() * cWidth
	if(x > max)
		x = max
	return x
}

//判断是否点击
function isClick(dir,e){
	const x = e.changedTouches[0].pageX
	const y = e.changedTouches[0].pageY
	
	const minX = dir.x
	const maxX = minX + dir.width
	const minY = dir.y
	const maxY = minY + dir.heigh
	if(x > minX && x < maxX && y > minY && y < maxY)
		return true
	else
		return false
}
//判断碰撞
function isHit(obj1,obj2,more=0,less=0){
	const minX1 = obj1.x
	const minY1 = obj1.y
	const maxX1 = minX1 + obj1.width
	const maxY1 = minY1 + obj1.height
	
	const minX2 = (obj2.x || obj2.x1) - less
	const minY2 = obj2.y
	const maxX2 = minX2 + obj2.width + more
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
