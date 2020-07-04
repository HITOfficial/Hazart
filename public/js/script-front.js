let userData
 var dataToSend = [
  {
      "login": "login1",
      "money": 1000
  }
]
//fetch GET
fetch("./new_user_data.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    userData = data;
  })
  .catch(error => console.log(error))
  //fetch POST
fetch('/',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(dataToSend)
})


const loadUser = () => {
  document.querySelector('.money').innerHTML = userData[0].money;
  document.querySelector('.money-per-click').innerHTML = userData[0].moneyPerClick;
  document.querySelector('.money-per-auto').innerHTML = userData[0].moneyPerAuto;
  document.querySelector('.value-multipler-bonus').innerHTML = userData[0].valueMultiplerBonus;
  document.querySelector('.value-click-bonus').innerHTML = userData[0].valueClickBonus;
  document.querySelector('.factories-bonus').innerHTML = userData[0].factoriesBonus;
  document.querySelector('.workers-bonus').innerHTML = userData[0].workersBonus;

  userData[0].autoMachine.forEach( machine => {
    document.querySelectorAll('.machine-cost')[machine.id -1].innerHTML = machine.cost
  });
  userData[0].workerMachine.forEach( worker => {
    document.querySelectorAll('.worker-cost')[worker.id -1].innerHTML = worker.cost
  });





  }
document.querySelector('body').addEventListener('click', () => {
  console.log(userData)
  loadUser()
})

