const jinInput = document.getElementById('jinInput')
const kgOutput = document.getElementById('kgOutput')
const poundOutput = document.getElementById('poundOutput')
const ozOutput = document.getElementById('ozOutput')

document.getElementById('output').style.visibility = "hidden"

jinInput.oninput = (e) => {
	const val = e.target.value
	
	if(val){
		document.getElementById('output').style.visibility = "visible"
		kgOutput.innerHTML = val * 0.5
		poundOutput.innerHTML = val * 1.1023113
		ozOutput.innerHTML = val * 17.636981
	}
	else
		document.getElementById('output').style.visibility = "hidden"
}