var props = new Array()
var getBullet = ""
var proIndex = 1
var heroProp = 0
var enemyProp = 0
var propCen = [
	{name:'Bwidth',log:"子弹宽度增加",prop:()=>{Binfo.width+=1;Binfo.offectX+=1}},
	{name:'Bspeed',log:"子弹速度/数量增加",prop:()=>{Binfo.speed+=1.5;Binfo.getBTime-=30}},
	{name:'Bmode',log:"子弹伤害增加",prop:()=>Binfo.mode=2}
]
	
function SetGameInfo(grad){
	if(Rand(0.02*grad)) //一定几率获得炸弹
		props.push(new NewProp(propcvs,"bomb_supply"))
	if(userGrad > (proIndex*30) && userGrad < 3900){//30*2^7=3840 最多升级7次
		proIndex *= 2
		props.push(new NewProp(propcvs,"bullet_supply"))
		enemyHigh()
	}
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
				hero.getBullet()
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
	if(rand <= pro)
		return true
	else
		return false
}
