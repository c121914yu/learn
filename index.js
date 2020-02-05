//请求接口 http://jsonplaceholder.typicode.com/todos
var url = 'http://jsonplaceholder.typicode.com/todos'
//设置token
axios.defaults.headers.common["X-Auth-Token"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

function get(){
	// axios({
	// 	method : 'GET',
	// 	url : url,
	// 	params : {
	// 		_limit : 5
	// 	}
	// })
	// .then(res => {
	// 	showData(res)
	// })
	// .catch(err => console.error(err))
	axios.get(url + '?_limit=5')
	.then(res => showData(res))
	.catch(err => console.error(err))
}

function post(){
	//地址,data,请求头
	axios.post(url,{
		title: "Axios POST测试",
		completed: true,
		id : 201
	})
	.then(res => showData(res))
	.catch(err => console.error(err))
}

function put(){
	//put 更新数据 /id 传入多少最后剩多少,没有指定的数据被删除
	/* axios.put(url + '/10',{
		title: "Axios put测试",
		completed: true,
	})
	.then(res => showData(res))
	.catch(err => console.error(err)) */
	
	//patch 更新数据 /id 只更新传入的数据,未指定的数据保留不变
	axios.patch(url + '/10',{
		title: "Axios patch测试",
		completed: true,
	})
	.then(res => showData(res))
	.catch(err => console.error(err))
}

function Delete(){
	axios.delete(url + '/1')
	.then(res => showData(res))
	.catch(err => console.error(err))
}

function batch_axios(){
	axios.all([
		axios.get(url + '?_limit=5'),
		axios.get('http://jsonplaceholder.typicode.com/posts?_limit=5')
	])
	// .then(res => console.log(res)) 得到一个数组
	.then(axios.spread((res1,res2) => showData(res2)))
	.catch(err => console.error(err))
}

function header(){
	const config = {
		headers : {
			"Content-Type":"application/json",
			Authorization : "token"
		}
	}
	axios.post(url,{
		title: "自定义请求头",
		completed: true,
	},config)
	.then(res => showData(res))
	.catch(err => console.error(err))
}

function errorHanding(){
	axios.get(url + '22')
	.then(res => showData(res))
	.catch(err => {
		if(err.response){
			showData(err.response)
			const status = err.response.status
			if(status === 404)
				alert('客户端请求错误')
			else if(status >= 500)
				alert('服务端请求错误')
		}
		else if(err.request)
			console.error(err.request)
		else
			console.error(err.message)
	})
}

function cancel(){
	const source = axios.CancelToken.source()
	
	axios.get(url,{
		cancelToken:source.token
	})
	.then(res => showData(res))
	.catch(thrown => {
		if(axios.isCancel(thrown)){
			console.log(thrown.message)
		}
	})
	//可判断是否满足请求条件
	if(true)
		source.cancel("请求取消") // thrown.message内容
}

//请求拦截 每次请求开始都会执行一次
axios.interceptors.request.use(
	res => {
		document.querySelector('.loading').style.display = 'block'
		console.log(`${res.method.toUpperCase()} request sent to &{res.url} at ${new Date().getTime()}`)
		return res
	},
	err => {
		return Promise.reject(err)
	}
)
//响应拦截 收到响应后统一处理
axios.interceptors.response.use(
	res => {
		document.querySelector('.loading').style.display = 'none'
		showData(res)
		return res
	},
	err => {
    //响应出错进入的函数
		document.querySelector('.loading').style.display = 'none'
    return Promise.reject(err);
	}
);

//实例化
const axiosinstance = axios.create({
	baseURL : "http://jsonplaceholder.typicode.com"
})
// axiosinstance.get('/todos?_limit=5')
// .then(res => showData(res))
// .catch(err => console.error(err))

function showData(res){
	document.getElementById('show').innerHTML = 
	`
		<div class="card card-body mb-4">
			<h2>Status : ${JSON.stringify(res.status,null,2)}</h2>
		</div>
		<div class="card mt-3">
			<div class="card-header"><h2>Headers</h2></div>
			<div class="card-body">
				<pre>${JSON.stringify(res.headers,null,2)}</pre>
			</div>
		</div>
		<div class="card mt-3">
			<div class="card-header"><h2>Data</h2></div>
			<div class="card-body">
				<pre>${JSON.stringify(res.data,null,2)}</pre>
			</div>
		</div>
		<div class="card mt-3">
			<div class="card-header"><h2>Config</h2></div>
			<div class="card-body">
				<pre>${JSON.stringify(res.config,null,2)}</pre>
			</div>
		</div>
	`
}