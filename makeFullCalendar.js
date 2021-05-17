const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const month = document.querySelector('#month');
const year = document.querySelector("#year");
const nextMonthBtns = document.querySelector("#nextMonth");
const previousMonthBtns = document.querySelector("#previousMonth");

const thirtyMonth = [4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const today = new Date();
let setYear = today.getFullYear();
let startMonth= today.getMonth()+1;

//달력을 만드는 함수
function makeCalendar(){
  let date = new Date();
  date.setFullYear(`${setYear}`,`${startMonth-1}`,1);
  let firstDay = date.getDay();

  //달력이 2020에서 2022년도까지만 표현가능하게
  if(-12 < startMonth && startMonth <= 24){
    if(-12 < startMonth && startMonth <= 0){
      startMonth += 12;
      setYear = 2020;
    } else if(12 < startMonth && startMonth <= 24){
      startMonth -= 12;
      setYear = 2022;
    }
  } else if(startMonth <= -12){
    alert('2020년도까지만 존재합니다');
    return;
  } else if(24 < startMonth){
    alert('2022년도까지만 존재합니다');
    return;
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //year를 표시해주는 함수
  function showYear(){
    year.textContent = `${setYear}년`;
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //month를 표시해주는 함수
  function showMonth(){
    month.textContent = `${startMonth}월`;
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //30일로 된 month인지 알아내는 함수
  let isItThirty = false;

  function thirtyDaytoggler(){
    if(thirtyMonth.includes(startMonth)){
      isItThirty = true;
      console.log(isItThirty);
    } else {
      isItThirty = false;
      console.log(isItThirty);
    }
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //30일로 된 month인지 알아내는 함수 (2월은 28일)
  function fillDays(){
    if(isItThirty===true){
      for(let i =0;i<thirtyArray.length;i++){
        calendarIndex[firstDay+i].textContent = thirtyArray[i];
      }
    } else {
      if(startMonth === 2){
        for(let i =0;i<thirtyOneArray.length-3;i++){
          calendarIndex[firstDay+i].textContent = thirtyOneArray[i];
        }
      } else {
        for(let i =0;i<thirtyOneArray.length;i++){
          calendarIndex[firstDay+i].textContent = thirtyOneArray[i];
        }
      }
    }
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //날짜에 day를 모두 채우는 함수
  showYear(); //year표시
  showMonth(); //month표시
  thirtyDaytoggler(); //fillDays전에 몇일로 되있는 달인지 확인
  fillDays(); //day표시
}

function reset(){
  if(startMonth < -11 || startMonth > 24){
    setYear = 2021;
    return;
  }
  for(let index of calendarIndex){
    setYear = 2021;
    index.textContent="";
  }
}

makeCalendar(startMonth);
nextMonthBtns.addEventListener('click',()=>{startMonth++; reset(); makeCalendar(startMonth)});
previousMonthBtns.addEventListener('click',()=>{startMonth--; reset(); makeCalendar(startMonth)})