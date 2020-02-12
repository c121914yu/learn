var Mbullets = new Array()
function DrawBullet(canvas){
	newBullet()
	Btimer = setInterval(() => {
		newBullet()
		loadSound("sound/get_bullet.wav",false)
	},200)
	
	function newBullet(){
		let Mbullet = new Bullet()
		Mbullets.push(Mbullet)
	}
	
	/* 对象Bullet */
	function Bullet(i){
		const ctx = canvas.getContext('2d')
		this.height = 20
		this.width = 6
		this.speed = 8
		
		this.x1 = hero.x + hero.width/5 - this.width/2
		this.x2 = hero.x + hero.width/5*4 - this.width/2 + 1
		this.y = hero.y - this.height/2
		
		this.draw = () => {
			ctx.drawImage(MbulletImg,this.x1,this.y,this.width,this.height)
			ctx.drawImage(MbulletImg,this.x2,this.y,this.width,this.height)
		}
		this.move = () => {
			this.y -= this.speed
			if(this.y < -this.height)
				return true
			for(let i=0;i<enemys.length;i++){
				if(isHit(enemys[i],this)){
					enemys[i].life--
					if(enemys[i].life === 0){
						userGrad += enemys[i].grad
						enemys.splice(i,1)
					}
					return true
				}
			}
			return false
		}
	}
}

function isHit(obj1,obj2){
	const minX1 = obj1.x
	const minY1 = obj1.y
	const maxX1 = minX1 + obj1.width
	const maxY1 = minY1 + obj1.height
	
	const minX2 = obj2.x1
	const minY2 = obj2.y
	const maxX2 = minX2 + hero.width - obj2.width
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
	
