# 鼠标指南针

```js
// 向量夹角
function angleTo(ratial1,ratial2){
	// ab/|a||b|
	const ab = (ratial1.x * ratial2.x) + (ratial1.y * ratial2.y)
	const A = Math.sqrt(Math.pow(ratial1.x,2)+Math.pow(ratial1.y,2))
	const B = Math.sqrt(Math.pow(ratial2.x,2)+Math.pow(ratial2.y,2))
	const angle = Math.acos(ab/A/B)
	return angle
}
```

