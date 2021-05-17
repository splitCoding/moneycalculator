const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');

const thirtyMonth = [2,4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const nextMonthBtns = document.querySelector("#nextMonth");
const previousMonthBtns = document.querySelector("#previousMonth");
const year = document.querySelector("#year");
const monthArea = document.querySelector('#month');
let date = new Date();

//month를 구하는 함수
function updateMonth(){
  let date2 = new Date();
  date.setMonth(date2.getMonth());
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//달력만드는 함수 (매개변수는 현재 몇월인지)
function makeCalendar(startMonth){

  const today = new Date();
  const year = today.getFullYear();
  const yearMinus = year-1;
  const yearMinus2 = year-2;

  //2019에서 2021년도까지 표현할 수 있게 그 이상은 alert
  if(-24 < startMonth && startMonth <= 0){
    if(startMonth > -12){
      startMonth += 12;
      year = yearMinus;
    } else if(startMonth <= -12){
      startMonth += 24;
      year = yearMinus2;
    }
  } else if(startMonth <= -24){
    alert('2019년도까지만 존재합니다');
    return;
  }
  if(startMonth>12){
    alert('2021년도까지만 존재합니다');
    return;
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //year표시 함수
  function showYear(){
    year.textContent = `${year}년`;
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //month표시 함수
  function showMonth(){
    monthArea.textContent = `${startMonth}월`;
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //30일이 마지막인 month인지 알아내는 함수
  let isItThirty = false;

  function thiryDaytoggler(){
    if(thirtyMonth.includes(startMonth)){
      isItThirty = true;
      console.log(isItThirty);
    } else {
      isItThirty = false;
      console.log(isItThirty);
    }
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //1일이 무슨 Date인지 구하는 함수
  function whatIsFirstDay(){
    let rest = today.getDate()%7;
    let firstDay = today.getDay() - rest +1;
    
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
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//모든 day칸을 지우는 함수
function reset(){
  if(startMonth < -23 || startMonth > 12){
    return;
  }
  for(let index of calendarIndex){
    index.textContent="";
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
updateMonth();
let startMonth = date.getMonth()+1;
makeCalendar(startMonth);

nextMonthBtns.addEventListener('click',()=>{startMonth++; reset(); makeCalendar(startMonth)});
previousMonthBtns.addEventListener('click',()=>{startMonth--; reset(); makeCalendar(startMonth)})