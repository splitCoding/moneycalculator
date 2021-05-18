const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');

const thirtyMonth = [2,4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const nextMonthBtns = document.querySelector("#nextMonth");
const previousMonthBtns = document.querySelector("#previousMonth");

const yearArea = document.querySelector("#year");
const monthArea = document.querySelector('#month');

let date = new Date();

let monthAdd = 0;
let yearAdd = 0;

let startMonth = date.getMonth()+ monthAdd;

//오늘날짜기준 month 구하는 함수
function updateMonth(){
  let date2 = new Date();
  date.setMonth(date2.getMonth());
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//표시해야하는 year를 구하는 함수
function changeYear(month){
  const abs = Math.abs(month);

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

//달력만드는 함수 (매개변수는 현재 몇월인지)
function makeCalendar(startMonth){
  const today = new Date();
  let year = today.getFullYear() + yearAdd;

  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //year표시 함수
  function showYear(){
    yearArea.textContent = `${year}년`;
    console.log(year);
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //month표시 함수
  function showMonth(){
    monthArea.textContent = `${startMonth+1}월`;
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //30일이 마지막인 month인지 알아내는 함수
  let isItThirty = false;

  function thiryDaytoggler(){
    if(thirtyMonth.includes(startMonth+1)){
      isItThirty = true;
    } else {
      isItThirty = false;
    }
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //1일이 무슨 Date인지 구하는 함수
  function whatIsFirstDay(){
    let rest = today.getDate()%7;
    let firstDay = (today.getDay()+1) - rest;
    
    if(firstDay < 0){
      return firstDay += 7;
    } else {
      return firstDay;
    }
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //빈칸에 모든 day를 넣어주는 함수
  function showDays(){
    if(isItThirty===true){
      for(let i =0;i<thirtyArray.length;i++){
        calendarIndex[whatIsFirstDay()+i].textContent = thirtyArray[i];
      }
    } else {
      for(let i =0;i<thirtyOneArray.length;i++){
        calendarIndex[whatIsFirstDay()+i].textContent = thirtyOneArray[i];
      }
    }
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  showYear(); //연도표시
  showMonth(); //월표시
  thiryDaytoggler(); //30일인 달인지 구함
  showDays(); //일표시
}
//makeCalendar함수 끝ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//모든 day칸을 지우는 함수
function reset(){
  for(let index of calendarIndex){
    index.textContent="";
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

updateMonth();
makeCalendar(startMonth);

nextMonthBtns.addEventListener('click',()=>{monthAdd++; changeYear(startMonth); reset(); makeCalendar(startMonth)});
previousMonthBtns.addEventListener('click',()=>{monthAdd--; changeYear(startMonth); reset(); makeCalendar(startMonth)})