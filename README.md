#贪吃蛇

``` bash
主要思路：
	1 画出蛇
		1.1 画蛇头和舍身
		1.2 1个蛇头
		1.3 添加蛇头
	
	2 让蛇动起来
		2.1 添加键盘事件
		2.2 animate运动

	3 随机投放食物
		3.1 计算新坐标位置
		3.2 判断是否与蛇头冲突（数组排重）
		
	4 吃食物
		4.1 碰撞检测
	
	5 边缘检测
		5.1 边缘碰撞
		5.2 蛇身碰撞
		5.3 GameOver
```

##计算坐标
###canvas长宽计算
```bash
	1 根据屏幕大小定义canvas大小
	2 将canvas平均分成n份，每份长宽30
```
### 起始中心点计算
```bash
	if(canvas.width / 2 % 30 === 0 )
		x = canvas.width / 2 - r
	else
		x = canvas.width / 2
	if(canvas.height / 2 % 30 === 0) 
		y = canvas.width / 2 - r
	else
		y = canvas.width / 2
```
###碰撞检测
```bash
	设判断坐标为x,y 目标为dir 直径dia
	XMax = x + dia
	Xmin = x - dia
	YMax = y + dia
	YMin = y - dia
	if(dir.x > Xmin && dir.x < Xmax && dir.y > Ymin && dir.y < Ymax)
		return true
	else
		return false
```

##按键
```bash
	keyCode : 
		37 左
		38 上
		39 右
		40 下
```

