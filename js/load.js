var cWidth,cHeight
var userGrad = 0
var bgcvs,herocvs,bulletcvs,enemycvs,home
var begining = false

var bgImg = ""
var homeImg = new Array()
var heroImg = new Array()//0 1 默认状态,2-5 destroy
var MbulletImg = '' //数组存储子弹
var enemyImg = new Array()

var Btimer,eTimer

var clear = (ctx) => {
	ctx.clearRect(0,0,cWidth,cHeight)
}

function loadBgImg(){
	const url = 'img/background.png'
	loadImg(url)
	.then(res => {
		bgImg = res
		bgDraw(bgcvs)
		loadHeroImg()
	})
	let soundUrl = 'sound/game_music.ogg'
	loadSound(soundUrl,true,0.7)//加载背景声音
}
function loadHome(){
	// const urls = ['img']
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
	const url = "img/bullet2.png"
	loadImg(url)
	.then(res => {
		MbulletImg = res
		loadEnemyImg()
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
				if(a === urls.length-1 && i === items.length - 1){
					heroDraw(herocvs)
					DrawBullet(bulletcvs)
					enemyDraw(enemycvs)
					userGrad = 0
					begining = true
				}
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

function loadSound(url,loop,volume=1){
	let sound = new Audio(url)
	sound.volume = volume
	sound.loop = loop
	// sound.play()
}

function onLoad(){
	canvasSize()//设置画布尺寸
	
	if(bgcvs.getContext){
		loadBgImg()
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
				clear(bulletcvs.getContext('2d'))
				for(let i=0;i<Mbullets.length;i++){
					if(Mbullets[i].move())
						Mbullets.splice(i,1)
					else
						Mbullets[i].draw()
				}
				/* 敌机移动 */
				clear(enemycvs.getContext('2d'))
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
	home = document.getElementById('home')
	
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
	home.width = cWidth
	home.height = cHeight
}