var Mbullets = new Array()
var getBTime = 300
var Bspeed = 15
function DrawBullet(canvas){
	newBullet()
	const sound = getSound('bullet')
	Btimer = setInterval(() => {
		newBullet()
		sound.play()
	},getBTime)
	
	function newBullet(){
		let Mbullet = new Bullet()
		Mbullets.push(Mbullet)
	}
	
	/* 对象Bullet */
	function Bullet(i){
		const ctx = canvas.getContext('2d')
		this.height = 20
		this.width = 6
		this.speed = Bspeed
		this.mode = 1 //子弹1,子弹2
		
		this.x1 = hero.x + hero.width/5 - this.width/2
		this.x2 = hero.x + hero.width/5*4 - this.width/2 + 1
		this.y = hero.y - this.height/2
		
		this.draw = () => {
			ctx.drawImage(MbulletImg[this.mode-1],this.x1,this.y,this.width,this.height)
			ctx.drawImage(MbulletImg[this.mode-1],this.x2,this.y,this.width,this.height)
		}
		this.move = () => {
			this.y -= this.speed
			if(this.y < -this.height)
				return true
			for(let i=0;i<enemys.length;i++){
				if(enemys[i].life > 0 && isHit(enemys[i],this,hero.width)){
					enemys[i].isHit = true
					enemys[i].life -= this.mode
					if(enemys[i].life === 0)
						enemyDown(i)
					return true
				}
			}
			return false
		}
	}
}
	
