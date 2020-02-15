var fs = require('fs');
var path = require('path')

function airplane(app){
	app.get('/game/airplane', (req, res) => {
	  console.log("飞机大战")
	  res.sendFile(path.resolve(__dirname, 'game', 'airplane', 'index.html'))
	})
	
	app.get('/game/airplane/img/:name', (req, res) => {
	  const name = req.params.name
	  const rs = fs.createReadStream(`${__dirname}/img/${name}`) //获取图片的文件名
		// console.log(`${__dirname}/img/${name}`)
	  rs.pipe(res)
	})
	app.get('/game/airplane/sound/:name', (req, res) => {
	  const name = req.params.name
	  const rs = fs.createReadStream(`${__dirname}/sound/${name}`) //获取图片的文件名
		// console.log(`${__dirname}/sound/${name}`)
	  rs.pipe(res)
	})
}

module.exports = airplane