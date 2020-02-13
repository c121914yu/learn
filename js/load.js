var cWidth,cHeight
var userGrad = 0
var bgcvs,herocvs,bulletcvs,enemycvs,homecvs
var begining = false

var bgImg = ""
var homeImg = new Array()
var heroImg = new Array()//0 1 默认状态,2-5 destroy
var MbulletImg = new Array() 
var enemyImg = new Array()

var Btimer,eTimer
var sounds = new Array()

var clear = (canvas) => {
	const ctx = canvas.getContext('2d')
	ctx.clearRect(0,0,cWidth,cHeight)
}

function loadHome(){
	homeImg = [
		{name:'start',url:'img/start.jpg'},
		{name:'pause',url:'img/pause_nor.png'},
		{name:'resume',url:'img/resume_nor.png'},
		{name:'gameover',url:'img/gameover.jpg'}
	]
	let index = 1
	homeImg.forEach(item => {
		loadImg(item.url)
		.then(res => {
			index++
			item.img = res
			if(index === 5)
				loadBgImg()
		})
	})
}
function loadBgImg(){
	const url = 'img/background.png'
	loadImg(url)
	.then(res => {
		bgImg = res
		loadHeroImg()
	})
}
function loadHeroImg(){
	const urls = ['img/me1.png','img/me2.png','img/me_destroy_1.png','img/me_destroy_2.png','img/me_destroy_3.png','img/me_destroy_4.png']
	/* 加载图片,加载完成再绘制 */
	urls.forEach((url,index) => {
		loadImg(url)
		.then(res => {
			heroImg[index] = res
			if(index === urls.length-1)
				loadBulletImg()
		})
	})
}
function loadBulletImg(){
	const urls = ["img/bullet1.png","img/bullet2.png"]
	urls.forEach((item,index) => {
		loadImg(item)
		.then(res => {
			MbulletImg[index] = res
			if(MbulletImg.length === 2){
				loadEnemyImg()
			}
		})
	})
}
function loadEnemyImg(){
	const urls = [
		['img/enemy1.png','img/enemy1_down1.png','img/enemy1_down2.png','img/enemy1_down3.png','img/enemy1_down4.png'],
		['img/enemy2.png','img/enemy2_down1.png','img/enemy2_down2.png','img/enemy2_down3.png','img/enemy2_down4.png','img/enemy2_hit.png'],
		['img/enemy3.png','img/enemy3_down1.png','img/enemy3_down2.png','img/enemy3_down3.png','img/enemy3_down4.png','img/enemy3_down5.png','img/enemy3_down6.png','img/enemy3_hit.png']
	]
	const names = ['enemy1','enemy2','enemy3']
	urls.forEach((items,a) => {
		enemyImg[a] = new Array()
		items.forEach((url,i) => {
			loadImg(url)
			.then(res => {
				enemyImg[a][i] = res
				if(a === urls.length-1 && i === items.length - 1)
					startDraw(homecvs)
			})
		})
	})
}

async function loadImg(url){
	return new Promise((res,rej) => {
		let img = new Image()
		img.src = url
		img.onload = () => {
			res(img)
		}
	}) 
}

//加载背景声音
function loadSound(){
	sounds = [
		{name:'bgGame',url:'sound/game_music.ogg',volume:0.7,loop:true},
		{name:'bullet',url:'sound/get_bullet.wav',volume:1,loop:false},
	]
	sounds.forEach(item => {
		const sound = new Audio(item.url)
		sound.volume = item.volume
		sound.loop = item.loop
		item.audio = sound
	})
}

//开始游戏
function startGame(){
	bg.move = true
	bg.Move()
	const bgsound = sounds.find((item,index) => {
		return item.name === "bgGame"
	})
	bgsound.audio.play()
	homecvs.style.display = 'none'
	heroDraw(herocvs)
	DrawBullet(bulletcvs)
	enemyDraw(enemycvs)
	home.ontouchend = ""
	userGrad = 0
	begining = true
}

//结束游戏
function overGame(){
	begining = false
	bg.move = false
	clearInterval(Btimer)
	clearInterval(eTimer)
	
	overDraw()
	homecvs.style.display = 'block'
	Mbullets = new Array()
	enemys = new Array()
	clear(herocvs)
	clear(bulletcvs)
	clear(enemycvs)
	
	const bgsound = sounds.find((item,index) => {
		return item.name === "bgGame"
	})
	bgsound.audio.pause()
}

function onLoad(){
	canvasSize()//设置画布尺寸
	loadSound()
	if(bgcvs.getContext){
		loadHome()//加载图片
		/* 刷新界面 */
		loop()
		let heroIndex = 0
		function loop(){
			if(begining){//保证已加载完成
				hero.draw(hero.x,hero.y) //绘制主角
				hero.move()
				heroIndex++
				if(heroIndex === 10){
					heroIndex = 0
					hero.bool = hero.bool ? 0 : 1
				}
				/* 子弹移动 */
				clear(bulletcvs)
				for(let i=0;i<Mbullets.length;i++){
					if(Mbullets[i].move())
						Mbullets.splice(i,1)
					else
						Mbullets[i].draw()
				}
				/* 敌机移动 */
				clear(enemycvs)
				for(let i=0;i<enemys.length;i++){
					if(enemys[i].move())
						enemys.splice(i,1)
					enemys[i].draw()
					enemys[i].HeroisHit()
				}
			}
			window.requestAnimationFrame(loop)
		}
	}
}

function canvasSize(){
	bgcvs = document.getElementById('bkg')
	herocvs = document.getElementById('hero')
	bulletcvs = document.getElementById('bullet')
	enemycvs = document.getElementById('enemy')
	homecvs = document.getElementById('home')
	
	cWidth = window.screen.width
	cHeight = window.screen.height
	
	/* 使画布铺满屏幕 */
	bgcvs.width = cWidth
	bgcvs.height = cHeight
	herocvs.width = cWidth
	herocvs.height = cHeight
	bulletcvs.width = cWidth
	bulletcvs.height = cHeight
	enemycvs.width = cWidth
	enemycvs.height = cHeight
	homecvs.width = cWidth
	homecvs.height = cHeight
}