// let userData , money, moneyPerClick, moneyPerAuto, valueMultiplerBonus, valueMultiplerBonusCost, valueClickBonus, valueClickBonusCost, factoriesBonusCost, workersBonus, workersBonusCost, machineCost, workerC
let money = document.querySelector('.money')
var dataToSend = [
  {
      "login": "login1",
      "money": 1000
  }
]
//fetch GET
fetch("./user_data.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    userData = data;
  })
  .catch(error => console.log(error))


const loadUser = () => {
  // main => show bonuses
  document.querySelector('.money').innerHTML = userData[0].money;
  document.querySelector('.money-per-click').innerHTML = userData[0].moneyPerClick;
  document.querySelector('.money-per-auto').innerHTML = userData[0].moneyPerAuto;
  // main => upgrades (four squares)
  document.querySelector('.value-multipler-bonus').innerHTML = userData[0].valueMultiplerBonus.bonus;
  document.querySelector('.upgrade-multipler-click-bonus-cost').innerHTML = userData[0].valueMultiplerBonus.upgradeCost;
  document.querySelector('.value-click-bonus').innerHTML = userData[0].valueClickBonus.bonus;
  document.querySelector('.upgrade-value-click-bonus-cost').innerHTML = userData[0].valueClickBonus.upgradeCost;
  document.querySelector('.factories-bonus').innerHTML = userData[0].factoriesBonus.bonus;
  document.querySelector('.upgrade-factories-bonus-cost').innerHTML = userData[0].factoriesBonus.upgradeCost;
  document.querySelector('.workers-bonus').innerHTML = userData[0].workersBonus.bonus;
  document.querySelector('.upgrade-workers-bonus-cost').innerHTML = userData[0].workersBonus.upgradeCost;
  // main => machines and workers
  userData[0].autoMachine.forEach( machine => {
    document.querySelectorAll('.machine-cost')[machine.id -1].innerHTML = machine.cost
  });
  userData[0].workerMachine.forEach( worker => {
    document.querySelectorAll('.worker-cost')[worker.id -1].innerHTML = worker.cost
  });
  // tools => upgrades status
  document.querySelector('.bonus-money-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-money-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.bonus-money-cost').innerHTML = userData[0].moneyBoost.upgradeCost;
  document.querySelector('.bonus-gift-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-gift-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.gift-cost').innerHTML = userData[0].moneyBoost.upgradeCost;
  document.querySelector('.bonus-tax-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-tax-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.tax-cost').innerHTML = userData[0].moneyBoost.upgradeCost;
  document.querySelector('.bonus-cooldown-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-cooldown-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.cooldown-cost').innerHTML = userData[0].moneyBoost.upgradeCost;
  document.querySelector('.gift-cost').innerHTML = userData[0].gift.upgradeCost;
  document.querySelector('.tax-cost').innerHTML = userData[0].tax.upgradeCost;
  document.querySelector('.cooldown-cost').innerHTML = userData[0].cooldown.upgradeCost;
  // tools => upgrades skills
  document.querySelector('.reset-skills-actual-level').innerHTML = userData[0].resetSkillsUpgrade.actualLevel
  document.querySelector('.reset-skills-max-level').innerHTML = userData[0].resetSkillsUpgrade.maxLevel;
  document.querySelector('.reset-skills-upgrade-cost').innerHTML = userData[0].resetSkillsUpgrade.upgradeCost;
  document.querySelector('.multiple-click-skill-actual-level').innerHTML = userData[0].multipleClickSkillUpgrade.actualLevel
  document.querySelector('.multiple-click-skill-max-level').innerHTML = userData[0].multipleClickSkillUpgrade.maxLevel;
  document.querySelector('.multiple-click-skill-upgrade-cost').innerHTML = userData[0].multipleClickSkillUpgrade.upgradeCost;
  document.querySelector('.multiple-money-skill-actual-level').innerHTML = userData[0].multipleMoneySkillUpgrade.actualLevel
  document.querySelector('.multiple-money-skill-max-level').innerHTML = userData[0].multipleMoneySkillUpgrade.maxLevel;
  document.querySelector('.multiple-money-skill-upgrade-cost').innerHTML = userData[0].multipleMoneySkillUpgrade.upgradeCost;
  document.querySelector('.multiple-gift-skill-actual-level').innerHTML = userData[0].multipleGiftSkillUpgrade.actualLevel
  document.querySelector('.multiple-gift-skill-max-level').innerHTML = userData[0].multipleGiftSkillUpgrade.maxLevel;
  document.querySelector('.multiple-gift-skill-upgrade-cost').innerHTML = userData[0].multipleGiftSkillUpgrade.upgradeCost;
  // tools => clickers
  document.querySelector('.auto-clicker-cost').innerHTML = userData[0].autoClicker.cost;
  document.querySelector('.auto-skills-cost').innerHTML = userData[0].autoSkills.cost;
}

// Cliker Function with skills
const clickerUpdate = () => {
 document.querySelector('.clicker-box').addEventListener('click', () =>{
  moneyPerClick = (userData[0].moneyPerClick * userData[0].valueClickBonus.bonus * userData[0].valueMultiplerBonus.bonus * userData[0].moneyBoost.bonus);
  if(userData[0].multipleClickSkill.active) {
    moneyPerClick *= userData[0].multipleClickSkillUpgrade.bonus;
  }
  if(userData[0].multipleMoneySkill.active) {
    moneyPerClick *= userData[0].multipleMoneySkillUpgrade.bonus;
  }
  moneyPerClick = Math.floor(moneyPerClick * 100) / 100;
  userData[0].money = Math.round(userData[0].money + moneyPerClick);
  money.innerHTML = userData[0].money;
 })
}

// updating curently money every second function
const moneyEverySec = () => {
  moneyTime = (userData[0].moneyPerAuto * userData[0].moneyBoost.bonus ) 
  if(userData[0].multipleMoneySkill.active) {
    moneyTime *= userData[0].multipleMoneySkillUpgrade.bonus
  }
  userData[0].money = Math.round(userData[0].money + moneyTime)
  money.innerHTML =userData[0].money; 
}

// updating curently money every second function included in interval function 
const autoMoneyUpdate = () => {
  setInterval(moneyEverySec, 1000)
}

// exporting data to the server with fetch POST, and then on a server automaticaly save as JSON file
const saveUserData = () => {
  document.querySelector('.save-game').addEventListener('click', () => {
    fetch('/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
  })
}

//starting game
const startGame = () =>{
  loadUser();
  clickerUpdate();
  autoMoneyUpdate();
  saveUserData();
}
window.onload = startGame
