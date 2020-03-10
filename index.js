// 初始化评分
const ratings = {
  vue : 4.7,
  node : 3.4,
  jquery : 2.3,
  djingo : 4.1
}
// 设置总分变量
const starsTotal = 5

//获取操作节点
const select = document.getElementById('produce-select')
const input = document.getElementById('rating-control')
let product

select.onchange = (e) => {
  product = e.target.value
  //启动输入框
  input.disabled = false
  input.value = ratings[product]
}

input.onchange = (e) => {
  const value = e.target.value
  ratings[product] = value
  getRatings()
}

//加载完毕
document.addEventListener('DOMContentLoaded',getRatings)
// 设置评分函数
function getRatings(){
  for(let rating in ratings){//遍历对象，rating为对象的key值
    // 获取分数百分比
    const starPercentage = (ratings[rating] / starsTotal) * 100
    //获得四舍五入到十位的百分比
    const starPercentageRounded = `${Math.round(starPercentage/10)*10}%`
    //点亮星标，按百分比设置宽度使其显示
    document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded
    //插入分数
    document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating]
  }
}