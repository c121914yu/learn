# 评分系统

> 知识点
> 1. css before伪元素
> 2. css隐藏与显示 
> 3. js对象操作新方法

```javascript 
// 对象遍历
for(item in obj)//item为obj的key值
  obj[item] //获取到value值

//评分转化成星计算方式
const rating = 4.7 //评分
const starsTotal = 5 //总分
const starPercentage = (ratings[rating] / starsTotal) * 100 //获取到百分比
//获取四舍五入到十位的百分比
const starPercentageRounded = `${Math.round(starPercentage/10)*10}%`
```

```css
/* 隐藏与显示 */
.stars-inner{
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}
/* 
  通过设置width控制星显示得数量
  有5星，每颗占20%,半颗占10%，所以js部分四舍五入百分比也是这个道理
  控制百分比只能取10的整数倍
 */
```