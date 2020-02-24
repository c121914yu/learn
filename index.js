//获取节点
const search = document.getElementById('search')
const matchList = document.getElementById('match-list')
let data

getData()
async function getData(){
	data = await fetch('./states.json')
	data = await data.json()
}

search.oninput = (e) => {
	const val = e.target.value
	
	//数据过滤
	let matches = data.filter(item => {
		const regex = new RegExp(`^${val}`,'gi')
		return regex.test(item.name) || regex.test(item.abbr)
	})
	if(val.length === 0)
		matches = []
	outPut(matches)
}
function outPut(data){
	if(data.length > 0){
		const html = data.map(item => 
			`
				<div class="card card-body mb-1">
					<h4>${item.name} (${item.abbr}) <span class="text-primary">${item.capital}</span></h4>
					<small>Lat: ${item.lat} / Long: ${item.long}</small>
				</div>
			`
		).join("")
		matchList.innerHTML = html
	}
	else
		matchList.innerHTML = ""
}