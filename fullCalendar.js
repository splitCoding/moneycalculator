const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const thirtyMonth = [2,4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const nextMonthBtns = document.querySelector("#nextMonth");
const previousMonthBtns = document.querySelector("#previousMonth");
const year = document.querySelector("#year");
const today = new Date();
let setYear = today.getFullYear();

function makeCalendar(startMonth){

  //2019에서 2021년도까지 표현할 수 있게 그 이상은 alert
  if(-24 < startMonth && startMonth <= 0){
    if(startMonth > -12){
      startMonth += 12;
      setYear = 2020;
    } else if(startMonth <= -12){
      startMonth +=24;
      setYear = 2019;
    }
  } else if(startMonth <= -24){
    alert('2019년도까지만 존재합니다');
    return;
  }
  if(startMonth>12){
    alert('2021년도까지만 존재합니다');
    return;
  }


  function putMonth(){
    const monthArea = document.querySelector('#month');
    monthArea.textContent = `${startMonth}월`;
  }

  let date = new Date();
  date.setFullYear(`${setYear}`,`${startMonth}`,1);
  year.textContent = `${setYear}년`;
  let firstDay = date.getDay();

  
  let isItThirty = false;

  function thiryDaytoggle(){
    if(thirtyMonth.includes(startMonth)){
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

  thiryDaytoggle();
  putMonth();
  fillDays();
}

function reset(){
  if(startMonth < -23 || startMonth > 12){
    return;
  }
  for(let index of calendarIndex){
    index.textContent="";
  }
}

let startMonth= today.getMonth()+1;
makeCalendar(startMonth);

nextMonthBtns.addEventListener('click',()=>{startMonth++; reset(); makeCalendar(startMonth)});
previousMonthBtns.addEventListener('click',()=>{startMonth--; reset(); makeCalendar(startMonth)})