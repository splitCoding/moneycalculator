const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const date = new Date();
let month = 1;
date.setFullYear(2021,`${month-1}`,1);
const firstDay = date.getDay();
const thirtyMonth = [2,4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let isItThirty = false;

function changeMonth(){
  const monthArea = document.querySelector('#month');
  monthArea.textContent = `${month}월`;
}

changeMonth();

function thiryDaytoggle(){
  if(thirtyMonth.includes(month)){
    isItThirty = true;
    console.log(isItThirty);
  } else {
    isItThirty = false;
    console.log(isItThirty);
  }
}

thiryDaytoggle();

function fillDays(){
  if(isItThirty===true){
    for(let i =0;i<thirtyArray.length;i++){
      calendarIndex[firstDay+i].textContent = thirtyArray[i];
    }
  } else {
    for(let i =0;i<thirtyOneArray.length;i++){
      calendarIndex[firstDay+i].textContent = thirtyOneArray[i];
    }
  }
}

fillDays();