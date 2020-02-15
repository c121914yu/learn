var props = new Array()
var getBullet = ""
var proIndex = 1
var heroProp = 0
var enemyProp = 0
var propCen = [
	{name:'Bwidth',
		prop:()=>{
			Binfo.width += 1;
			Binfo.offectX += 1
			return "宽度增加"
	}},
	{name:'Bspeed',
		prop:()=>{
			if(Binfo.getBTime >= 130){
				Binfo.getBTime -= 30
				return "射速加快"
			}
			else
				return propCen[0].prop()
	}},
	{name:'Bmode',
		prop:()=>{
			Binfo.mode = 2
			if(Binfo.life < 3){		
				Binfo.life += 0.5
				return "伤害增大"
			}
			else
				return propCen[0].prop()
		}
	}
]
	
function SetGameInfo(type){
	if(Rand(0.02*type)) //一定几率获得炸弹
		props.push(new Prop("bomb_supply"))
	if(userGrad > (proIndex*30)){
		proIndex *= 2
		props.push(new Prop("bullet_supply"))
		enemyHigh()
	}
}

function Prop(name){
	this.width = 50
	this.height = 50
	this.x = getRandX(this.width)
	this.y = -this.height
	this.speed = 2.5
	this.img = getImg(PropImg,name)
	this.type = name === "bomb_supply" ? 'bomb':'bullet'

	const ctx = propcvs.getContext('2d')
	ctx.fillStyle = "#6d7779"
	ctx.font = "lighter normal 25px 'MedievalSharp',cursive"
	
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

function drawProp(text,type){
	const ctx = propcvs.getContext('2d')
	const X = cWidth/2 - 25*2
	const Y = type === 'enemy' ? cHeight*0.1 : cHeight*0.1+25
	const prop = new Prop()
	prop.delay = 150
	prop.draw = () => {
		ctx.fillText(text,X,Y)
	}
	prop.move = () => {
		prop.delay--
		if(prop.delay <= 0)
			return false
		else
			return true
	}
	props.push(prop)
}

function Rand(pro){//概率计算
	const rand = Math.random()
	if(rand <= pro)
		return true
	else
		return false
}
