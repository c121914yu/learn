var Mbullets = new Array()
var Binfo = {
	offectX : 0,
	width : 6,
	getBTime : 300,
	mode : 1,
	life : 1
}
function DrawBullet(canvas){
	newBullet()
	const sound = getSound('bullet')
	Btimer = setInterval(() => {
		newBullet()
		sound.play()
	},Binfo.getBTime)
	
	function newBullet(){
		let Mbullet = new Bullet()
		Mbullets.push(Mbullet)
	}
	
	/* 对象Bullet */
	function Bullet(i){
		const ctx = canvas.getContext('2d')
		this.height = 20
		this.width = Binfo.width
		this.speed = 14
		this.mode = Binfo.mode //子弹1,子弹2
		this.life = Binfo.life //额外伤害
		this.x1 = hero.x + 10 - Binfo.offectX
		this.x2 = hero.x + hero.width - 10 + Binfo.offectX
		this.y = hero.y
		this.more = this.x2 - this.x1 + this.width
		
		this.draw = () => {
			ctx.drawImage(MbulletImg[this.mode-1],this.x1,this.y,this.width,this.height)
			ctx.drawImage(MbulletImg[this.mode-1],this.x2,this.y,this.width,this.height)
		}
		this.move = () => {
			this.y -= this.speed
			if(this.y < -this.height)
				return true
			for(let i=0;i<enemys.length;i++){
				if(enemys[i].life > 0 && isHit(enemys[i],this,this.more,5)){
					enemys[i].isHit = true
					enemys[i].life -= this.life
					if(enemys[i].life <= 0)
						enemyDown(i)
					return true
				}
			}
			return false
		}
	}
}
	
