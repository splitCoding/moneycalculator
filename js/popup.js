const incomeInput = document.querySelector("#income input");
const incomeBtn = document.querySelector("#incomeBtn");
const expenditureInput = document.querySelector("#expenditure input");
const expenditureBtn = document.querySelector("#expenditureBtn");
const monthIncome = document.querySelector("#incomeAndExpenditure p:nth-child(1)");
const monthExpenditure = document.querySelector("#incomeAndExpenditure p:nth-child(2)");
const monthRest = document.querySelector("#incomeAndExpenditure p:nth-child(3)");

incomeBtn.addEventListener('click',applyIncome);
expenditureBtn.addEventListener('click',applyExpenditure);
let totalInput = 0;
let totalExpenditure = 0;

function showRest(){
  monthRest.textContent = `잔액 : ${totalInput-totalExpenditure} 원`
}

function applyIncome(){
  totalInput += Number(incomeInput.value);
  monthIncome.textContent = `수입 : ${totalInput} 원`;
  incomeInput.value = "";
  showRest();
}

function applyExpenditure(){
  totalExpenditure += Number(expenditureInput.value);
  monthExpenditure.textContent = `지출 : ${totalExpenditure} 원`;
  expenditureInput.value = "";
  showRest();
}


