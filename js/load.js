function loadHome(){
	homeImg = [
		{name:'start',url:'img/start.jpg'},
		{name:'gameover',url:'img/gameover.jpg'}
	]
	homeImg.forEach(item => {
		loadImg(item.url)
		.then(res => {
			item.img = res
		})
	})
}
function loadBgImg(){
	const url = 'img/background.png'
	loadImg(url)
	.then(res => {
		bgImg = res
	})
}
function loadHeroImg(){
	heroImg = [
		{name:'me1',url:'img/me1.png'},
		{name:'me2',url:'img/me2.png'},
		{name:'me_destroy_1',url:'img/me_destroy_1.png'},
		{name:'me_destroy_2',url:'img/me_destroy_2.png'},
		{name:'me_destroy_3',url:'img/me_destroy_3.png'},
		{name:'me_destroy_4',url:'img/me_destroy_4.png'},
		{name:'life',url:'img/life.png'},
		{name:'bomb',url:'img/bomb.png'},
		{name:'pause',url:'img/pause.png'},
		{name:'resume',url:'img/resume.png'},
	]
	heroImg.forEach(item => {
		loadImg(item.url)
		.then(res => {
			item.img = res
		})
	})
}
function loadPropImg(){
	PropImg = [
		{name:'bomb_supply',url:'img/bomb_supply.png'},
		{name:'bullet_supply',url:'img/bullet_supply.png'},
	]
	PropImg.forEach(item => {
		loadImg(item.url)
		.then(res => {
			item.img = res
		})
	})
}
function loadBulletImg(){
	const urls = ["img/bullet1.png","img/bullet2.png"]
	urls.forEach((item,index) => {
		loadImg(item)
		.then(res => {
			MbulletImg[index] = res
		})
	})
}
function loadEnemyImg(){
	const urls = [
		['img/enemy1.png','img/enemy1_down1.png','img/enemy1_down2.png','img/enemy1_down3.png','img/enemy1_down4.png'],
		['img/enemy2.png','img/enemy2_hit.png','img/enemy2_down1.png','img/enemy2_down2.png','img/enemy2_down3.png','img/enemy2_down4.png'],
		['img/enemy3.png','img/enemy3_hit.png','img/enemy3_down1.png','img/enemy3_down2.png','img/enemy3_down3.png','img/enemy3_down4.png','img/enemy3_down5.png','img/enemy3_down6.png']
	] 
	const names = ['enemy1','enemy2','enemy3']
	urls.forEach((items,a) => {
		enemyImg[a] = new Array()
		items.forEach((url,i) => {
			loadImg(url)
			.then(res => {
				enemyImg[a][i] = res
			})
		})
	})
}

async function loadImg(url){
	return new Promise((res,rej) => {
		let img = new Image()
		img.src = url
		img.onload = () => {
			imgIndex++
			res(img)
			if(imgIndex === 36)
				startDraw(homecvs)
		}
	}) 
}
function getImg(imgs,name){
	const img = imgs.find(item => {
		return item.name === name
	})
	return img.img
}

//加载声音
function loadSound(){
	sounds = [
		{name:'bgGame',url:'sound/game_music.ogg',volume:0.3,loop:true},
		{name:'button',url:'sound/button.wav',volume:0.9,loop:false},
		{name:'me_down',url:'sound/me_down.wav',volume:1,loop:false},
		{name:'bullet',url:'sound/bullet.wav',volume:1,loop:false},
		{name:'use_bomb',url:'sound/use_bomb.wav',volume:1,loop:false},
		{name:'enemy1_down',url:'sound/enemy1_down.wav',volume:1,loop:false},
		{name:'enemy2_down',url:'sound/enemy2_down.wav',volume:1,loop:false},
		{name:'enemy3_down',url:'sound/enemy3_down.wav',volume:1,loop:false},
		{name:'enemy3_flying',url:'sound/enemy3_flying.wav',volume:0.5,loop:false},
		{name:'get_bomb',url:'sound/get_bomb.wav',volume:0.5,loop:false},
		{name:'get_bullet',url:'sound/get_bullet.wav',volume:0.5,loop:false},
	]
	sounds.forEach(item => {
		const sound = new Audio(item.url)
		sound.volume = item.volume
		sound.loop = item.loop
		item.audio = sound
	})
}
function getSound(name){
	const sound = sounds.find(item => {
		return item.name === name
	})
	return sound.audio
}


function onLoad(){
	imgIndex = 0
	canvasSize()//设置画布尺寸
	if(bgcvs.getContext){
		loadAll()
		/* 刷新界面 */
		running()
	}
}

var heroIndex = 0
function running(){
	if(begining){//保证已加载完成
		hero.move()
		heroIndex++
		if(heroIndex === 10){
			heroIndex = 0
			hero.bool = hero.bool ? 0 : 1
		} 
		hero.draw() //绘制主角
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
			let splice = false
			splice = enemys[i].move()
			if(splice === false){
				splice = enemys[i].draw()
				if(enemys[i].HeroisHit())
					break
			}
			if(splice){
				enemys.splice(i,1) //防止清楚数组后,下标错位
				i--
			}
		}
		/* 加载道具 */
		clear(propcvs)
		for(let i=0;i<props.length;i++){
			if(props[i].move())
				props[i].draw()
			else{
				props.splice(i,1)
				i--
			}
		}
	}
	window.requestAnimationFrame(running)
}

function loadAll(){
	loadSound()//加载音频
	
	loadHome()//加载图片
	loadBgImg()
	loadHeroImg()
	loadPropImg()
	loadBulletImg()
	loadEnemyImg()
}

function canvasSize(){
	bgcvs = document.getElementById('bkg')
	herocvs = document.getElementById('hero')
	bulletcvs = document.getElementById('bullet')
	enemycvs = document.getElementById('enemy')
	homecvs = document.getElementById('home')
	propcvs = document.getElementById('prop')
	
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
	propcvs.width = cWidth
	propcvs.height = cHeight
}