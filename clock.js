
// STOPWATCH NUMBER DISPLAY
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var appendMin = document.getElementById("minute")

var min = 0 ;
var sec = 0 ;
var mili = 0;

var retrievedObject;
var span_lap_diff = document.createElement("span")
var span_lap_gen = document.createElement("span")
var lapDiv = document.createElement("div")
var retriveTime = [];
var glob = 0;
var LapDiff;
LapDiff=new Array();
//CHECK LOCAL STORAGE DATA
function checklocalstore(){
  
    var storeMili;
    var storeSec;
    var storeMin;
    
  if( storeMili!=NaN &&storeSec!=NaN &&  storeMin!=NaN)
  {    
    
    retriveTime=JSON.parse(localStorage.getItem('storeTime'));
    console.log(retriveTime);
     storeMili=retriveTime[2];
     storeSec=retriveTime[1];
     storeMin=retriveTime[0];

         if(storeMili!=0 ||storeSec!=0 || storeSec!=0 )
        {
            console.log('localstore value display');
        
            mili=Number (storeMili);
            sec=Number(storeSec);
            min=Number(storeMin);
            console.log(typeof(mili));
            Stopwatch_timer_preloader();
           
        }else{
            console.log('in else')
        
            mili=0;
            sec=0;
            min=0;
        Stopwatch_timer();

        }
}

}


//ON LOAD CALL
window.onload= checklocalstore();


function Stopwatch_timer_preloader()
{
    appendTens.innerHTML = mili;
    appendSeconds.innerHTML = sec;
    appendMin.innerHTML = min;
    Stopwatch_timer();
}

function timer() {
//console.log(`${mili}   sec ${sec}  min${min}` );
console.log(sec);

    mili++;
    //console.log(mili);
    var storeTime = [min, sec, mili];
    appendTens.innerHTML = mili;
  
   
   
    if (mili == 100) {

        mili = 0;

        console.log(sec);
        sec++;
        appendTens.innerHTML = mili;
        appendSeconds.innerHTML = sec;

        if (sec == 60) {
            sec = 0;
            min++;
            // console.log(sec)
            //var testObject = { 'mili': mili, 'sec': sec, 'min': min };
            //console.log(testObject)
            appendTens.innerHTML = mili;
            appendSeconds.innerHTML = sec;
            appendMin.innerHTML = min;
            // console.log(min)
        }
        storeTime=[min,sec,mili];

        localStorage.setItem('storeTime', JSON.stringify(storeTime));
    }

}
//ON BEFORE STORE LOCALSTORAGE VALUE
window.onbeforeunload = function(event)
    {  
        localStorage.setItem('storeTime', storeTime);
        console.log('onbrfore')
      //  return confirm("Confirm refresh");
      var localstoreLapData = JSON.parse(localStorage.getItem('LapDiff'));
     console.log(localstoreLapData)
    };

//START BUTTON CLICK FUNCTION 
function Stopwatch_timer() {
    interval = setInterval(function(){
        timer();
         }, 10);
    
    offset = new Date();
    offset = offset.getTime();
}

//STOP FUNCTION
function stop_timer() {
    clearInterval(interval);
}

//RESET VALUES
function reset_timer() {
    clearInterval(interval);
   
    min = 0,
        sec = 0,
        mili = 0;
    appendTens.innerHTML = mili;
    appendSeconds.innerHTML = sec;
    appendMin.innerHTML = min;
    localStorage.clear();
    lap_timer();
}

//LAPTIMER FUNCTION GENERATE LAP AND BETWEEN TWO LAP TIMING MEASURE
function lap_timer() {
    var now = new Date();
    now = now.getTime();
    s = now - offset;

    offset = now;

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    diff = mins + ':' + secs + ':' + ms
  
    var retrievedLap =JSON.parse(localStorage.getItem('storeTime'));
   
    var lapDiv = document.createElement("div")
    lapDiv.setAttribute("class","lap")
    lapDiv.setAttribute("id","lap")
    lapDiv.setAttribute("background","#fff")

    var span_lap_diff = document.createElement("span")
    var value_lap_diff=  document.createTextNode(diff)
      span_lap_diff.appendChild(value_lap_diff)
    lapDiv.appendChild(span_lap_diff);
    
    min_lap = retrievedLap[0]
    sec_lap = retrievedLap[1]
    mini_lap = retrievedLap[2]
    
    
    LapObj= {};
    LapObj.time=retrievedLap;
    LapObj.diff=diff;

    LapDiff.push(LapObj);
    console.log(LapDiff);
    
    localStorage.setItem('LapDiff', JSON.stringify(LapDiff));
   
    gen_lap= min_lap + ':' + sec_lap + ':' + mini_lap
    var span_lap_gen = document.createElement("span")
    var value_lap_gen=  document.createTextNode(gen_lap)
   span_lap_gen.appendChild(value_lap_gen)
   lapDiv.appendChild(span_lap_gen);
  
 
    console.log(diff)
    console.log(retrievedLap);
    document.getElementById("lap-holder").appendChild(lapDiv);
}

//HISTORY GET AND CREATE FUNCTION 
function history_lap(){
    document.getElementById("h1").innerHTML = "History";

    var lapDivMainTag = document.getElementById("div")
    lapDivMainTag.innerHTML=""
   
    console.log('here');
   var localstoreLapData = JSON.parse(localStorage.getItem('LapDiff'));
   console.log(typeof(localstoreLapData));
    for(var i=0 ;i<localstoreLapData.length ;i++){
        console.log(localstoreLapData[i].time)
        console.log(localstoreLapData[i].diff)
        
        lapDivHistory= document.createElement("div")
        lapDivHistory.setAttribute("class","lap_history")
     
       var span_lap_gen = document.createElement("span")
       var value_lap_gen=  document.createTextNode(localstoreLapData[i].diff)
      span_lap_gen.appendChild(value_lap_gen)
    
    var span_lap_diff = document.createElement("span")
    var value_lap_diff=  document.createTextNode(localstoreLapData[i].time)
      span_lap_diff.appendChild(value_lap_diff)
  
      lapDivHistory.appendChild(span_lap_gen);
      lapDivHistory.appendChild(span_lap_diff);
      lapDivMainTag.appendChild(lapDivHistory);
   
    }
   

}