// 创建地图
var map = new AMap.Map('container', {
	zoom: 14, //初始化地图层级,越大越细
	resizeEnable: true, //是否监控地图容器尺寸变化
	center: [120.147723, 30.244324] //初始化地图中心点,若不写则默认是当前位置
})

//获取当前城市信息
map.getCity(res => {
	console.log(res)
})
 
// 跳转指定城市
// map.setCity("杭州市")

// 获取当前地图中心点
const circle = map.getCenter()

// 添加标记
var marker
function addMark(pos){
 //if(marker)
	//map.remove(marker) // 移除标记
 marker = new AMap.Marker({
		position: pos
 })
 map.add(marker)
}

// 根据点绘制曲线
function drawLine(path){
	let polyline = new AMap.Polyline({
		path: path,  
		borderWeight: 2, // 线条宽度，默认为 1
		strokeColor: 'red', // 线条颜色
		lineJoin: 'round' // 折线拐点连接处样式
	})
	map.add(polyline)
	// 展示 / 隐藏
	//polyline.show()
	//polyline.hide()
}
// drawLine()

// 路线规划
function pathPlan(){
	AMap.plugin('AMap.Walking', () => {
		var driving = new AMap.Walking({
			map,
			autoFitView: true
		})
		
		let points = [
			[120.135975, 30.250522],
			[120.138024, 30.243867],
			[120.139494, 30.239251],
			[120.144397, 30.229120],
			[120.154466, 30.231864],
			[120.154332, 30.236114],
			[120.154836, 30.238727],
			[120.158747, 30.24768]
		]
		
		driving.search(points[7], points[0],(status, result) => {
			const routes = result.routes[0]
			console.log("总路程：" + routes.distance + "米")
			console.log("预计时间: " + (routes.time/60).toFixed(1) + "分钟")
		})
	})
}
pathPlan()

// 获取当前位置坐标
function getSelfPosition(){
	AMap.plugin('AMap.Geolocation', function() {
	  var geolocation = new AMap.Geolocation({
	    // 是否使用高精度定位，默认：true
	    enableHighAccuracy: true,
	    // 设置定位超时时间，默认：无穷大
	    timeout: 10000,
	    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	    zoomToAccuracy: true,     
			// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
			buttonOffset: new AMap.Pixel(10, 20),
	    //  定位按钮的排放位置,  RB表示右下
	    buttonPosition: 'RB'
	  })
	
	  geolocation.getCurrentPosition()
	  AMap.event.addListener(geolocation, 'complete', onComplete)
	  AMap.event.addListener(geolocation, 'error', onError)
	
	  function onComplete (data) {
			addMark(data.position)
			console.log(data)
	  }
	  function onError (err) {
	    // 定位出错
			console.log(err)
	  }
	})
}
// getSelfPosition()

// 地图点击事件
// map.on('click',e => {
// 	const pos = [e.lnglat.getLng(),e.lnglat.getLat()]
// 	addMark(pos)
// 	console.log(pos)
// })
