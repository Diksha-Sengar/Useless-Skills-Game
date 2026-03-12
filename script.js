let startBtn=document.getElementById("startBtn")
let challenge=document.getElementById("challenge")
let result=document.getElementById("result")
let progressBar=document.getElementById("progressBar")

let score=0
let challengeNumber=0

// cursor glow

let glow=document.querySelector(".cursor-glow")

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px"
glow.style.top=e.clientY+"px"

})

// sounds

function playSound(freq){

let ctx=new AudioContext()

let osc=ctx.createOscillator()

osc.type="sine"

osc.frequency.value=freq

osc.connect(ctx.destination)

osc.start()

setTimeout(()=>{

osc.stop()

},100)

}

startBtn.onclick=()=>{

playSound(300)

startBtn.style.display="none"

timerChallenge()

}

function updateProgress(){

challengeNumber++

progressBar.style.width=(challengeNumber/3)*100+"%"

}

function timerChallenge(){

updateProgress()

challenge.innerHTML=`

<h2>Challenge 1</h2>

<p>Stop the timer at exactly <b>3.21 seconds</b></p>

<button id="stopTimer">Stop</button>

<h3 id="time">0.00</h3>

`

let timeDisplay=document.getElementById("time")

let stopBtn=document.getElementById("stopTimer")

let time=0

let interval=setInterval(()=>{

time+=0.01

timeDisplay.innerText=time.toFixed(2)

},10)

stopBtn.onclick=()=>{

clearInterval(interval)

playSound(500)

if(Math.abs(time-3.21)<0.15){

score++

}

sliderChallenge()

}

}

function sliderChallenge(){

updateProgress()

challenge.innerHTML=`

<h2>Challenge 2</h2>

<p>Stop the slider exactly at <b>69</b></p>

<input type="range" min="0" max="100" id="slider">

<button id="submitSlider">Submit</button>

`

let slider=document.getElementById("slider")

let button=document.getElementById("submitSlider")

button.onclick=()=>{

playSound(400)

let value=slider.value

if(Math.abs(value-69)<=2){

score++

}

targetChallenge()

}

}

function targetChallenge(){

updateProgress()

challenge.innerHTML=`

<h2>Challenge 3</h2>

<p>Catch the moving target!</p>

<button id="movingTarget">CLICK ME</button>

`

let target=document.getElementById("movingTarget")

let moves=0

let moveInterval=setInterval(()=>{

target.style.left=Math.random()*80+"%"

target.style.top=Math.random()*70+"%"

moves++

if(moves>20){

clearInterval(moveInterval)

endGame()

}

},500)

target.onclick=()=>{

score++

playSound(800)

particleExplosion()

clearInterval(moveInterval)

endGame()

}

}

function particleExplosion(){

for(let i=0;i<40;i++){

let p=document.createElement("div")

p.className="particle"

p.style.left=event.clientX+"px"

p.style.top=event.clientY+"px"

document.body.appendChild(p)

let x=(Math.random()-0.5)*200

let y=(Math.random()-0.5)*200

p.animate([

{transform:"translate(0,0)",opacity:1},

{transform:`translate(${x}px,${y}px)`,opacity:0}

],{

duration:600

})

setTimeout(()=>{

p.remove()

},600)

}

}

function confetti(){

for(let i=0;i<70;i++){

let piece=document.createElement("div")

piece.className="particle"

piece.style.left=Math.random()*100+"vw"

piece.style.top="-10px"

document.body.appendChild(piece)

let fall=setInterval(()=>{

piece.style.top=parseInt(piece.style.top)+6+"px"

if(parseInt(piece.style.top)>window.innerHeight){

piece.remove()

clearInterval(fall)

}

},20)

}

}

function endGame(){

challenge.innerHTML=""

let message=""

if(score===3){

message="🏆 Legendary useless skills!"

confetti()

}

else if(score===2){

message="👏 Impressive useless talent!"

}

else if(score===1){

message="😅 Slightly useless."

}

else{

message="🤨 Suspiciously competent."

}

result.innerHTML=`

<h2>Your Score: ${score}/3</h2>

<p>${message}</p>

<button onclick="location.reload()">Play Again</button>

`

}
