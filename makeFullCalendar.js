const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const monthArea = document.querySelector('#month');
const yearArea = document.querySelector("#year");
const nextMonthBtns = document.querySelector("#nextMonth");
const previousMonthBtns = document.querySelector("#previousMonth");

const thirtyMonth = [4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

let addMonth = 0;
let addYear = 0;

//오늘날짜기준 month 구하는 함수
function updateMonth(){
  let date2 = new Date();
  date.setMonth(date2.getMonth());
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//달력을 만드는 함수
function makeCalendar(){

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  today.setFullYear(`${year}`,`${month}`,1);
  
  //year를 표시해주는 함수
  function showYear(){
    yearArea.textContent = `${year+addYear}년`;
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //month를 표시해주는 함수
  function showMonth(){
    monthArea.textContent = `${month+addMonth+1}월`;
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //30일로 된 month인지 알아내는 함수
  let isItThirty = false;

  function thirtyDaytoggler(){
    if(thirtyMonth.includes(month+1)){
      isItThirty = true;
    } else {
      isItThirty = false;
    }
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //1일이 무슨 요일인지 구하는 함수
  function whatIsFirstDay(){
    let firstDay = today.getDay();
    
    if(firstDay < 0){
      return firstDay += 7;
    } else {
      return firstDay;
    }
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //day를 표시하는 함수(2월은 28일)
  function fillDays(){
    if(isItThirty===true){
      for(let i =0;i<thirtyArray.length;i++){
        calendarIndex[whatIsFirstDay()+i].textContent = thirtyArray[i];
      }
    } else {
      if(month+1 === 2){
        for(let i =0;i<thirtyOneArray.length-3;i++){
          calendarIndex[whatIsFirstDay()+i].textContent = thirtyOneArray[i];
        }
      } else {
        for(let i =0;i<thirtyOneArray.length;i++){
          calendarIndex[whatIsFirstDay()+i].textContent = thirtyOneArray[i];
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
  for(let index of calendarIndex){
    index.textContent="";
  }
}

//표시해야하는 year를 구하는 함수
function changeYear(input){
  const abs = Math.abs(input);

  if(month >= 13){
    startMonth -= 12;
    yearAdd = month/12 +1;
  }
  if(month < 1){
    startMonth = 12 - (abs%12);
    yearAdd = -((abs/12)+1);
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

makeCalendar();
nextMonthBtns.addEventListener('click',()=>{addMonth++; reset(); makeCalendar()});
previousMonthBtns.addEventListener('click',()=>{addMonth--; reset(); makeCalendar()})