const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const thirtyMonth = [2,4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const nextMonthBtns = document.querySelector("#nextMonth");
const previousMonthBtns = document.querySelector("#previousMonth");
const year = document.querySelector("#year");
let setYear = 2021;

function makeCalendar(start){
  if(start <= 0){
    if(start < -11){
      alert('2020년도까지만 존재합니다.');
      return;
    }
    start += 12;
    setYear = 2020;
  }
  
  let date = new Date();
  let month = start;
  date.setFullYear(`${setYear}`,`${month-1}`,1);
  year.textContent = `${setYear}년`;
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
  if(start < -11){
    return;
  }
  for(let index of calendarIndex){
    index.textContent="";
  }
}

let start= 5;
makeCalendar(start);

nextMonthBtns.addEventListener('click',()=>{start++; reset(); makeCalendar(start)});
previousMonthBtns.addEventListener('click',()=>{start--; reset(); makeCalendar(start)})