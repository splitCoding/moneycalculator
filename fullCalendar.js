const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const thirtyMonth = [2,4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const nextMonthBtns = document.querySelector("#nextMonth");

function makeCalendar(start){
  let date = new Date();
  let month = start;
  date.setFullYear(2021,`${month-1}`,1);
  let firstDay = date.getDay();

  function changeMonth(){
    const monthArea = document.querySelector('#month');
    monthArea.textContent = `${month}월`;
  }
  
  let isItThirty = false;

  function thiryDaytoggle(){
    if(thirtyMonth.includes(month)){
      isItThirty = true;
      console.log(isItThirty);
    } else {
      isItThirty = false;
      console.log(isItThirty);
    }
  }

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

  changeMonth();
  thiryDaytoggle();
  fillDays();
}

function reset(){
  for(let index of calendarIndex){
    index.textContent="";
  }
}

let start= 1;
makeCalendar(start);

nextMonthBtns.addEventListener('click',()=>{start++; reset(); makeCalendar(start)})