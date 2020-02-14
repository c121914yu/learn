var props = new Array()
var getBullet = ""
function SetGameInfo(grad){
	if(Rand(0.025*grad))
		props.push(new NewProp(propcvs,"bomb_supply"))
}

function NewProp(canvas,name){
	this.i = props.length
	this.width = 50
	this.height = 50
	this.x = getRandX(this.width)
	this.y = -this.height
	this.speed = 2.5
	this.img = getImg(PropImg,name)
	this.type = name === "bomb_supply" ? 'bomb':'bullet'

	const ctx = canvas.getContext('2d')
	this.draw = () => {
	 ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
	}
	this.move = () => {
		this.y += this.speed
		if(isHit(this,hero)){
			if(this.type === "bomb")
				hero.getBomb()
			else
				console.log("获得子弹")
			return false
		}
		if(this.y >= cHeight)
			return false
		else
			return true
	}
}

function Rand(pro){//概率计算
	const rand = Math.random()
	console.log(rand)
	if(rand <= pro)
		return true
	else
		return false
}
