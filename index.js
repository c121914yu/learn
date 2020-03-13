//初始化 speechesynthesis API
var synth = window.speechSynthesis

//获取DOM节点
const body = document.querySelector('body')
const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitch-value')

// 创建voices arry 并获得下拉框语言选项
let voices = []

function getVoices(){
  voices = synth.getVoices()
  // console.log(voices)
  // 循环voices并创建option下拉选项
  voices.forEach(voice => {
    const option = document.createElement('option')
    //插入语言名称和编码
    option.textContent = voice.name + `(${voice.lang})`
    // 设置option属性
    option.setAttribute('data-name',voice.name)
    option.setAttribute('data-lang',voice.lang)
    voiceSelect.append(option)
  })
}
getVoices()
if(synth.onvoiceschanged !== undefined)
  synth.onvoiceschanged = getVoices
  
// speak
function speak(){
  //验证是否在说话
  if(synth.speaking){
    synth.cancel()
  }
  if(textInput.value != ""){
    //获得说话文本
    const speakText = new SpeechSynthesisUtterance(textInput.value)
    
    // 说话结束事件
    synth.onend = () => {
      console.log(说话结束)
    }
    //说话错误
    synth.onerror = (err) => {
      console.error(err)
    }
    
    //获得选中语言
    const selectVoice = voiceSelect.selectedOptions[0].getAttribute("data-name")
    //遍历voices
    voices.forEach(voice => {
      if(voice.name === selectVoice)
        speakText.voice = voice
    })
    //设置音速，音调,音量
    speakText.rate = rate.value
    speakText.pitch = pitch.value
    speakText.volume = 1
    //发音
    synth.speak(speakText)
    console.log(speakText)
  }
}

//form提交事件
textForm.onsubmit = (e) => {
  e.preventDefault()
  speak()
  textInput.blur()
}

// 监听音速和音调变化
rate.oninput = () => {
  rateValue.innerText = rate.value
}
pitch.oninput = () => {
  pitchValue.textContent = pitch.value
}