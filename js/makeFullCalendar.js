const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const monthArea = document.querySelector('#month');
const yearArea = document.querySelector("#year");
const nextMonthBtns = document.querySelector("#nextMonth");
const previousMonthBtns = document.querySelector("#previousMonth");
const inputFullDate = document.querySelector('#inputFullDate');
const inputBtn = inputFullDate.querySelector('button');
const inputs = inputFullDate.querySelectorAll('input');
const inputYear = inputs[0];
const inputMonth = inputs[1];
const backToNow = document.querySelector("#backToNow");
const backToNowBtn = backToNow.querySelector("button");
const popUp = document.querySelector('#popUp');
const popUpBtn = document.querySelector("#popUp img");

const thirtyMonth = [4,6,9,11]; //30일이 마지막인 month
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]; 
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let addYear = 0; //year값 변동을 위해 추가되는 값
let addMonth = 0; //month값 변동을 위해 추가되는 값
let addMonthForInputExist = 0; //날짜가 입력되었을시 그후 변동을 위해 추가되는 값
let addYearForInputExist = 0; //날짜가 입력되었을시 그후 변동을 위해 추가되는 값
let isItThirty = false; //thirtyDayToggler에 쓰일 값

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@단독 function들 리스트 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//1. reset : 모든 년도, 월, 날짜칸을 비우고 dayActive클래스 삭제 함수
function reset(){
  for(let index of calendarIndex){
    index.textContent="";
    yearArea.textContent = "";
    monthArea.textContent = "";
    if(Array.from(index.classList).includes('dayActive')){
      const thisIsTodayID = document.getElementById('thisIsToday');

      index.classList.remove("dayActive");
      if(thisIsTodayID !== null){
        thisIsTodayID.removeAttribute("id");
      }
      index.removeEventListener('click',showPopUp);
    }
  }
}


//2. showPopUp : popUp창의 display가 none에서 inline-block으로 바뀜(eventlistener에 사용)
function showPopUp(){ popUp.style.display = "inline-block"; }


//3. dayActivePopUp : 매개변수로 받은 배열의 요소중 dayActive클래스가 있는 칸에 클릭시 showPopup 함수실행되는 이벤트리스너 추가
function dayActivePopUp(array){
  for(let element of array){
    if(Array.from(element.classList).includes('dayActive')){
      element.addEventListener('click',showPopUp);
    }
  }
}


//4. putMonthAndDayInPopUp : 
function putMonthAndDayInPopUp(){
  document.querySelector("#popUpMonthAndDay").textContent = `년 일`
}
putMonthAndDayInPopUp();


//5. setYearAndMonth : 입력한 year값과 month값으로 지금 날짜가 정해지고 화면에 표시하는 함수 실행
function setYearAndMonth(inputYear, inputMonth, dateObject){
  dateObject.setFullYear(`${inputYear}`,`${inputMonth}`,1);
  yearArea.textContent = `${inputYear}년`;
  monthArea.textContent = `${inputMonth+1}월`;
}


//6. thirtyDayToggler : 30일로 된 month인지 아닌지
function thirtyDayToggler(inputMonth){
  if(thirtyMonth.includes(inputMonth%12+1)){
    isItThirty = true;
  } else {
    isItThirty = false;
  }
}


//7. fillDays : month에 알맞은 day를 달력에 표시하는 함수(2월은 28일 윤달은 29일)
function fillDays(inputYear, inputMonth, dateObject){
  let day = dateObject.getDay();
  if(isItThirty===true){
    for(let i =0;i<thirtyArray.length;i++){
      calendarIndex[day+i].textContent = thirtyArray[i];
      calendarIndex[day+i].classList.add('dayActive');
    }
  } else if(isItThirty===false){
    if((inputMonth+1)%12 === 2){
      if(inputYear%4===0){
        for(let i =0;i<thirtyOneArray.length-2;i++){
          calendarIndex[day+i].textContent = thirtyOneArray[i];
          calendarIndex[day+i].classList.add('dayActive');
        }
      } else { 
        for(let i =0;i<thirtyOneArray.length-3;i++){
          calendarIndex[day+i].textContent = thirtyOneArray[i];
          calendarIndex[day+i].classList.add('dayActive');
        }
      }
    } else {
      if(isItThirty===false){
        for(let i =0;i<thirtyOneArray.length;i++){
          calendarIndex[day+i].textContent = thirtyOneArray[i];
          calendarIndex[day+i].classList.add('dayActive');
        }
      }
    }
  }
}

//8. checkToday : 달력에 오늘 날짜를 표시
function checkToday(inputYear, inputMonth, dateObject){
  if(dateObject.getFullYear() === inputYear && dateObject.getMonth() ===inputMonth){
    for(let element of calendarIndex){
      if(Number(element.textContent) === dateObject.getDate()){
        element.setAttribute("id","thisIsToday");
      }
    }
  }
}


//9. makeCalendar : 달력을 만들어주는 함수
function makeCalendar(){
  reset(); //만들기전에 reset 함수실행

  const today2 = new Date();//오늘날짜를 표시하기 위한 today2이름의 Date객체
  const today = new Date(); //달력설정을 위해 쓰일 today이름의 Date객체 
  let year = today.getFullYear()+addYear; //나중에 year값이 변할 수 있도록 addYear값 추가한 
  let month = today.getMonth()+addMonth; //나중에 month값이 변할 수 있도록 addMonth값 추가

  if(month >= 0){
    year+=parseInt(month/12);
    month%=12;
  } else {
    year+= parseInt((month+1)/12)-1;
    month= -12 * (parseInt((month+1)/12)-1)-Math.abs(month);
  }
  //addMonth값이 변함에따라 month와 year값을 알맞게 바꿔주기(13월 -> 다음년도 1월)

  setYearAndMonth(year,month,today);
  thirtyDayToggler(month);
  fillDays(year, month, today);
  checkToday(year, month, today2);
  dayActivePopUp(document.querySelectorAll(".dayActive"));
}


//10. makeCalendarWhenInputExist : year와 month를 입력했을시 달력을 만들어주는 함수
function makeCalendarWhenInputExist(){
  if((inputYear.value-'0')!==Number(inputYear.value)||(inputMonth.value-'0')!==Number(inputMonth.value)){
    alert("숫자를 입력해주세요");
    return;
  } //입력값들 중 숫자가 아닌 값이 존재할 시 return하고 alert

  reset();
  
  const today2 = new Date();//오늘 날짜를 표시하기 위한 today3이름의 Date객체
  const today = new Date();
  let year = Number(inputYear.value) + addYearForInputExist;
  let month = Number(inputMonth.value) + addMonthForInputExist -1;
    
  if(month >= 0){
    year+=parseInt(month/12)
    month%=12
  } else if(month < 0){
    year += -1+parseInt((month+1)/12);
    month = -12*(parseInt((month+1)/12)-1) - Math.abs(month);
  }
  //addMonth값이 변함에따라 month와 year값을 알맞게 바꿔주기(13월 -> 다음년도 1월)

  setYearAndMonth(year, month, today);
  thirtyDayToggler(month);
  fillDays(year, month, today);
  checkToday(year, month, today2);
  dayActivePopUp(document.querySelectorAll(".dayActive"));
  nextMonthBtns.style.display = "none";
  previousMonthBtns.style.display ="none";
}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@바로실행되는 코드들@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
makeCalendar();
nextMonthBtns.addEventListener('click',()=>{addMonth++; makeCalendar()}); //오른쪽버튼 클릭시 month값에 더해지는 addMonth값에 1을 추가하고 다시 달력즉시생성
previousMonthBtns.addEventListener('click',()=>{addMonth--; makeCalendar()}); //왼쪽버튼 클릭시 month값에 더해지는 addMonth값에 1을 빼고 다시 달력즉시생성
inputBtn.addEventListener('click',makeCalendarWhenInputExist); //입력버튼 클릭시 입력값이 존재할시 달력을 만들어주는 함수 실행

backToNowBtn.addEventListener('click',()=>{
  addMonth =0;
  addYear =0;
  nextMonthBtns.style.display = "flex";
  previousMonthBtns.style.display ="flex";
  makeCalendar();
}); //현재 기준의 년도와 달로 다시 이동하는 버튼 기능

popUpBtn.addEventListener('click',()=>{
  document.querySelector("#popUp").style.display = "none";
}) //popUp창의 x버튼을 누를시 popUp창 사라짐
