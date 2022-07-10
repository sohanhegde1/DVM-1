var MaxTime=60,
newTime=MaxTime,rot;
var timer=document.getElementById('timer');
var restart=document.getElementById('restart2');
var displayText=document.getElementById('type1');
var inputText=document.getElementById('type2');
var hGlass=document.getElementById('hourglass');
var n=1;
var displayCheck=displayText.innerText;
var charIndex=0;
var errors=0;
var para5=document.getElementById('para5');
var accuracy=document.getElementById('accur');
accuracy.innerText=100;
var wpm=document.getElementById('wpm1');
var charTyped=0;

function areaFocus()
{
inputText.focus();

}
document.addEventListener('keydown',areaFocus);
function showTime(){
if(newTime>0)
{ 
newTime--;
timer.innerText=newTime;
wpm.innerText= Math.round((((charTyped-errors) / 5) / (60-newTime)) * 60);
accuracy.innerText= (charTyped-errors)*100/(charTyped)+"%";

}
else
{
newTime=00;
inputText.disabled=true;

}
}


function rotor()
{
if(newTime>0)
{
hGlass.style.transform="rotate("+180*n+"deg)";
n++;
}
else
{
clearInterval(rot);
}
}
restart.addEventListener('click',()=>{
document.location.reload();
})

rot=setInterval(rotor,2000);
setInterval(showTime,1000);
var len;
function getRandomQuote() {
    return fetch('http://api.quotable.io/random')
      .then(response => response.json())
      .then(data => data.content)
  }
async function generateNewQuote() {
    var quote = await getRandomQuote();
    displayText.innerHTML = '';
    quote.split('').forEach(character => {
      const charSpan = document.createElement('span');
      charSpan.innerText = character;
      displayText.appendChild(charSpan);
     
    })
}

generateNewQuote();

 inputText.addEventListener('input',()=>
{   
    var displayChar=displayText.querySelectorAll("span");
    inData=inputText.value.split('');
    console.log(inputText.value.split('')[charIndex]);
    len=displayText.innerText.length;
    if(inputText.value.length===len)
    {
    generateNewQuote();
    inputText.value="";
    charIndex=0;
    }
    if (inputText.value.split('')[charIndex]==null) {
        if(charIndex!=0)
        { 
        charIndex--;
        charTyped--;
        if(displayChar[charIndex].classList.contains("incorrect"))
        {
        errors--;
        }
        displayChar[charIndex].classList.remove("correct");
        displayChar[charIndex].classList.remove("incorrect");
       displayChar[charIndex].classList.add("norm");
        }
    }
    else if(displayChar[charIndex].innerText===inData[charIndex])
    {
    displayChar[charIndex].classList.remove("norm"); 
    displayChar[charIndex].classList.add("correct");
   
    charIndex++;
    charTyped++;
    }
    else{
        displayChar[charIndex].classList.remove("norm"); 
    displayChar[charIndex].classList.add("incorrect");
   
    charIndex++;
    errors++;
    charTyped++;
    }
});
