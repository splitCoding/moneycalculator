const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const date = new Date();
const month = date.getMonth()+1;
const day = date.getDate();
const week = ['sunday','monday','tuesday','wednesday', 'thursday','friday','saturday'];
const today = date.getDay();
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let isItThirty = false;

function changeMonth(){
  const monthArea = document.querySelector('#month');
  monthArea.textContent = `${month}월`;
}

function monthStart(){
  const rest = day % 7;
  let firstDate = today-rest+1;
  if(firstDate < 0){ firstDate += 7; }
  console.log(week[firstDate]);
  fillDays(firstDate);
}

function thiryDaytoggle(){
  const thirtyMonth = [2,4,6,9,11];
  
  if(thirtyMonth.includes(month)){
    isItThirty = true;
    console.log(isItThirty);
  } else {
    isItThirty = false;
    console.log(isItThirty);
  }
}

function fillDays(start){
  if(isItThirty===true){
    for(let i =0;i<thirtyArray.length;i++){
      calendarIndex[i+start].textContent = thirtyArray[i];
    }
  } else {
    for(let i =0;i<thirtyOneArray.length;i++){
      calendarIndex[i+start].textContent = thirtyOneArray[i];
    }
  }
}

function init(){
  changeMonth();
  monthStart();
  thiryDaytoggle();
}
init();