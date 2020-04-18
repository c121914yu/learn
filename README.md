# 高德地图

```js
// 创建地图
var map = new AMap.Map(domID, {
	zoom: 14, //初始化地图层级,越大越细
	resizeEnable: true, //是否监控地图容器尺寸变化
	center: [120.147723, 30.244324] //初始化地图中心点
})

// 创建一个标记点
var marker = new AMap.Marker({
	position: pos
})

// 创建一条曲线
let polyline = new AMap.Polyline({
	path: path,  
	borderWeight: 2, // 线条宽度，默认为 1
	strokeColor: 'red', // 线条颜色
	lineJoin: 'round' // 折线拐点连接处样式
})
```

> map - API
> getCity(callback) - 获取当前城市信息
> setCity(cityname,code) - 跳转指定城市
> getCenter() - 获取地图中心点坐标
> add() - 添加覆盖物
> remove() - 移除覆盖物
> on(type,callback) - 添加监听事件


```js
//西湖经纬度：
[120.147723, 30.244324]

// 西湖周围维度
[
	[120.135975, 30.250522],
	[120.138024, 30.243867],
	[120.139494, 30.239251],
	[120.144397, 30.229120],
	[120.154466, 30.231864],
	[120.154332, 30.236114],
	[120.154836, 30.238727],
	[120.158747, 30.24768]
]
```