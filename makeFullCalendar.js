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

function makeCalendar(){
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  showYearAndMonth(month);
  today.setFullYear(`${year}`,`${month+addMonth}`,1);
  let day = today.getDay();
  
  //표시해야하는 year과 month를를 구하는 함수
  function showYearAndMonth(month){
    const absdivide12 = Math.floor(Math.abs((month)+addMonth)/12);
    if(month + 1 + addMonth < 1){
      monthArea.textContent = `${(month+1)+addMonth+(12*(absdivide12+1))}월`;
      yearArea.textContent = `${year+addYear-(absdivide12+1)}년`;
    } else if(month + 1 +addMonth > 12){
      monthArea.textContent = `${(month+1)+addMonth-(12*(absdivide12))}월`;
      yearArea.textContent = `${year+addYear+(absdivide12)}년`;
    } else {
      yearArea.textContent = `${year+addYear}년`;
      monthArea.textContent = `${(month+1)+addMonth}월`;
    }
  }


  //30일로 된 month인지 알아내는 함수
  let isItThirty = false;

  function thirtyDaytoggler(){
    if(thirtyMonth.includes((month+1)+addMonth)){
      isItThirty = true;
    } else {
      isItThirty = false;
    }
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


  //day를 표시하는 함수(2월은 28일)
  function fillDays(){
    if(isItThirty===true){
      for(let i =0;i<thirtyArray.length;i++){
        calendarIndex[day+i].textContent = thirtyArray[i];
      }
    } else {
      if(month+1 === 2){
        for(let i =0;i<thirtyOneArray.length-3;i++){
          calendarIndex[day+i].textContent = thirtyOneArray[i];
        }
      } else {
        for(let i =0;i<thirtyOneArray.length;i++){
          calendarIndex[day+i].textContent = thirtyOneArray[i];
        }
      }
    }
  }

  thirtyDaytoggler(); //fillDays전에 몇일로 되있는 달인지 확인
  fillDays(); //day표시
}
//모든 날짜칸을 비우는 함수
function reset(){
  for(let index of calendarIndex){
    index.textContent="";
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

makeCalendar();
nextMonthBtns.addEventListener('click',()=>{addMonth++; reset(); makeCalendar()});
previousMonthBtns.addEventListener('click',()=>{addMonth--; reset(); makeCalendar()})