// 获取input元素 
let filterInput = document.getElementById('filterInput')

filterInput.addEventListener('keyup',filterNames)

function filterNames(){
	//获取到input内容
	let val = document.getElementById('filterInput').value.toUpperCase()
	//获取ul内容
	let ul = document.getElementById('names')
	let li = ul.querySelectorAll('li.collection-item')
	
	li.forEach(item => {
		const a = item.getElementsByTagName('a')[0]
		//indexOf查找指定字符,若不包含返回-1,若包含返回大于-1
		console.log(a.innerHTML.toUpperCase().indexOf(val))
		if(a.innerHTML.toUpperCase().indexOf(val) > -1){
			item.style.display = ""
		}
		else
			item.style.display = "none"
	})
}
