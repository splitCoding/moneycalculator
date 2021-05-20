const jsCalendar = document.querySelector(".js-calendar");
const calendarIndex = jsCalendar.querySelectorAll('td');
const monthArea = document.querySelector('#month');
const yearArea = document.querySelector("#year");
const nextMonthBtns = document.querySelector("#nextMonth");
const previousMonthBtns = document.querySelector("#previousMonth");
const inputFullDate = document.querySelector('#inputFullDate');
const inputs = inputFullDate.querySelectorAll('input');
const inputBtn = inputFullDate.querySelector('button');
const inputYear = inputs[0];
const inputMonth = inputs[1];
const backToNow = document.querySelector("#backToNow");
const backToNowBtn = backToNow.querySelector("button");
const popUp = document.querySelector('#popUp');
const thirtyMonth = [4,6,9,11];
const thirtyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const thirtyOneArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

//모든 년도, 월, 날짜칸을 비우고 dayActive클래스 삭제 함수
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
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//popUp창이 나타나게 하는 함수
function showPopUp(){ popUp.style.display = "inline-block"; }
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//dayActive클래스가 있는 칸을 클릭시 popUp창 나타나는 함수
function dayActivePopUp(array){
  for(let element of array){
    if(Array.from(element.classList).includes('dayActive')){
      element.addEventListener('click',showPopUp);
    }
  }
}
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//다음달, 이전달, 입력한 년도와 달로 이동하는 버튼 기능
nextMonthBtns.addEventListener('click',()=>{addMonth++; makeCalendar()});
previousMonthBtns.addEventListener('click',()=>{addMonth--; makeCalendar()});
inputBtn.addEventListener('click',makeCalendarWhenInputExist);
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

let addMonth = 0;
let addYear = 0;

//달력을 만드는 함수*********************************************
function makeCalendar(){
  reset();

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
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //startYear을 year로 startMonth를 month로 설정하고 화면에 표시하는 함수 실행
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
    if(thirtyMonth.includes(startMonth%12+1)){
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
        calendarIndex[day+i].classList.add('dayActive');
      }
    } else if(isItThirty===false){
      if((startMonth)%12 === 1){
        if(startYear%4===0){
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
  fillDays(); 
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //오늘의 날짜를 달력에 표시
  let today2 = new Date();

  function checkToday(){
    if(today2.getFullYear() === startYear && today2.getMonth() ===startMonth){
      for(let element of calendarIndex){
        if(Number(element.textContent) === today2.getDate()){
          element.setAttribute("id","thisIsToday");
        }
      }
    }
  }
  checkToday();
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //dayActivePopUp함수를 dayActive 클래스를 가진 모든요소에 대입
  let dayActiveAfter = document.querySelectorAll(".dayActive");
  dayActivePopUp(dayActiveAfter);
}
//***************************************************** 

let addinputMonth = 0;
let addinputYear = 0;

//Input으로 날짜를 바꿨을때 달력만들어주는 함수********************************
function makeCalendarWhenInputExist(){
  //숫자가 아닌 값이 입력됐을때 return;
  if((inputYear.value-'0')!==Number(inputYear.value)||(inputMonth.value-'0')!==Number(inputMonth.value)){
    alert("숫자를 입력해주세요");
    return;
  }

  reset();
  let today2 = new Date();
  let startYear = (inputYear.value-'0') + addinputYear;
  let startMonth = (inputMonth.value-'0') + addinputMonth -1;
    
  //현재month를 기준으로 이전과 이후로 이동할때 startMonth, startYear 재지정
  if(startMonth >= 0){
    startYear+=parseInt(startMonth/12)
    startMonth%=12
  } else if(startMonth < 0){
    startYear += -1+parseInt((startMonth+1)/12);
    startMonth = -12*(parseInt((startMonth+1)/12)-1) - Math.abs(startMonth);
  }
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //startYear을 year로 startMonth를 month로 설정하고 화면에 표시하는 함수실행
  function setYearAndMonth(){
    today2.setFullYear(`${startYear}`,`${startMonth}`,1);
    yearArea.textContent = `${startYear}년`;
    monthArea.textContent = `${startMonth+1}월`;
  }
  setYearAndMonth();
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //30일로 된 month인지 알아내는 함수실행
  let isItThirty = false;

  function thirtyDaytoggler(){
    if(thirtyMonth.includes(startMonth%12+1)){
      isItThirty = true;
    } else {
      isItThirty = false;
    }
  }
  thirtyDaytoggler();
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  //day를 표시하는 함수실행(2월은 28일 윤달은 29일)
  function fillDays(){
    let day = today2.getDay();
    if(isItThirty===true){
      for(let i =0;i<thirtyArray.length;i++){
        calendarIndex[day+i].textContent = thirtyArray[i];
        calendarIndex[day+i].classList.add('dayActive');
      }
    } else if(isItThirty===false){
      if((startMonth)%12 === 1){
        if(startYear%4===0){
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
  fillDays(); 
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //오늘의 날짜를 달력에 표시
  let today3 = new Date();

  function checkToday(){
    if(today3.getFullYear() === startYear && today3.getMonth() ===startMonth){
      for(let element of calendarIndex){
        if(Number(element.textContent) === today3.getDate()){
          element.setAttribute("id","thisIsToday");
        }
      }
    }
  }
  checkToday();
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //다음달, 이전달 버튼비활성화
  nextMonthBtns.style.display = "none";
  previousMonthBtns.style.display ="none";
  
  let dayActiveAfter = document.querySelectorAll(".dayActive");
  dayActivePopUp(dayActiveAfter);
}
//***************************************************************

//현재 기준의 년도와 달로 다시 이동하는 버튼 기능
backToNowBtn.addEventListener('click',()=>{
  addMonth =0;
  addYear =0;
  nextMonthBtns.style.display = "flex";
  previousMonthBtns.style.display ="flex";
  makeCalendar();
});
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//popUp창의 x버튼을 누를시 popUp창 사라짐
const popUpBtn = document.querySelector("#popUp img");
popUpBtn.addEventListener('click',()=>{
  document.querySelector("#popUp").style.display = "none";
})
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

makeCalendar();