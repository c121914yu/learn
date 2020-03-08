//或许dom元素
const resultPsw = document.getElementById('resultPsw')
const Pswlength = document.getElementById('length')
const hasupper = document.getElementById('uppercase')
const haslower = document.getElementById('lowercase')
const hasnumbers = document.getElementById('numbers')
const hassymbols = document.getElementById('symbols')
const randomPsw = document.getElementById('randomPsw')
const copy = document.getElementById('copy')

//构建随机函数对象
const randomFunc = {
  upper : getUppercase,
  lower : getLowercase,
  numbers : getNumber,
  symbol : getSymbol
}

//监听点击
randomPsw.onclick = () => {
  const length = +Pswlength.value
  //获取到选中的条件
  const checkArr = [
    {upper : hasupper.checked},
    {lower : haslower.checked},
    {numbers : hasnumbers.checked},
    {symbol : hassymbols.checked}
  ].filter(item => Object.values(item)[0])
  //生成密码
  if(checkArr.length === 0){
    resultPsw.innerHTML = ''
    return ""
  }
  let result = ""
  for(let i=0;i<length;i+=checkArr.length){
    checkArr.forEach(item => {
      const key = Object.keys(item)[0]
      result += randomFunc[key]()
    })
  }
  resultPsw.innerHTML = result.slice(0,length)
}

copy.onclick = () => {
  const textarea = document.createElement('textarea')
  const password = resultPsw.innerText
  if(!password)
    return
  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('复制成功')
}

//随机生成函数
function getUppercase(){
  return String.fromCharCode(Math.floor(Math.random()*26)+65)
}
function getLowercase(){
  return String.fromCharCode(Math.floor(Math.random()*26)+97)
}
function getNumber(){
  return String.fromCharCode(Math.floor(Math.random()*10)+48)
}
function getSymbol(){
  const symbol = "!@#$%*(){}+-[],./()"
  return symbol[Math.floor(Math.random()*symbol.length)]
}
