const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const monthArea = document.querySelector('#month');
const yearArea = document.querySelector("#year");
const nextMonthBtns = document.querySelector("#nextMonth");
const previousMonthBtns = document.querySelector("#previousMonth");

const thirtyMonth = [4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

//오늘날짜기준 month 구하는 함수
function updateMonth(){
  let date = new Date();
  date.setMonth(date2.getMonth());
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//오늘을 기준으로 이번달 1일이 무슨 요일인지 구하는 함수(setFullYear로 지정했기떄문에 사용하지 않음)
function whatIsFirstDay(){
  let firstDay = today.getDay();
  
  if(firstDay < 0){
    return firstDay += 7;
  } else {
    return firstDay;
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//달력을 만드는 함수
let addMonth = 0;
let addYear = 0;
// addYear += Math.floor((Math.abs(addMonth)-1)/12);

function makeCalendar(){
  let today = new Date();
  let startMonth = today.getMonth()+addMonth;
  let startYear = today.getFullYear()+addYear;

  //현재month를 기준으로 이전과 이후로 이동할때 startMonth, startYear 재지정
  if(startMonth >= 0){
    startYear+=parseInt(startMonth/12)
    startMonth%=12
  } else if(startMonth < 0){
    startYear += -1+parseInt((startMonth+1)/12);
    startMonth = -12*(parseInt((startMonth+1)/12)-1) - Math.abs(startMonth);
  }
  
  //startYear을 year로 startMonth를 month로 설정하고 화면에 표시하는 함수실행

  function setYearAndMonth(){
    today.setFullYear(`${startYear}`,`${startMonth}`,1);
    yearArea.textContent = `${startYear}년`;
    monthArea.textContent = `${startMonth+1}월`;
  }
  setYearAndMonth();

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //30일로 된 month인지 알아내는 함수실행

  let isItThirty = false;

  function thirtyDaytoggler(){
    if(thirtyMonth.includes((month+1)+addMonth)){
      isItThirty = true;
    } else {
      isItThirty = false;
    }
  }
  thirtyDaytoggler();

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //day를 표시하는 함수실행(2월은 28일 윤달은 29일)
  
  function fillDays(){
    let day = today.getDay();
    if(isItThirty===true){
      for(let i =0;i<thirtyArray.length;i++){
        calendarIndex[day+i].textContent = thirtyArray[i];
      }
    } else {
      if((startMonth)%12 === 1){
        if(startYear%4===0){
          for(let i =0;i<thirtyOneArray.length-2;i++){
            calendarIndex[day+i].textContent = thirtyOneArray[i];
          }
        } else { 
          for(let i =0;i<thirtyOneArray.length-3;i++){
            calendarIndex[day+i].textContent = thirtyOneArray[i];
          }
        }
      } else {
        for(let i =0;i<thirtyOneArray.length;i++){
          calendarIndex[day+i].textContent = thirtyOneArray[i];
        }
      }
    }
  }
  fillDays(); 
  
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
}
makeCalendar();

//모든 날짜칸을 비우는 함수
function reset(){
  for(let index of calendarIndex){
    index.textContent="";
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

nextMonthBtns.addEventListener('click',()=>{addMonth++; reset(); makeCalendar()});
previousMonthBtns.addEventListener('click',()=>{addMonth--; reset(); makeCalendar()})