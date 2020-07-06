let valuePerClick, moneyPerAuto
let moneyObject = document.querySelector('.money');
let valuePerClickObject = document.querySelector('.money-per-click');
let moneyPerAutoObject = document.querySelector('.money-per-auto');
//fetch GET user_data
fetch("./user_data.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    userData = data;
    tax = userData[0].tax.bonus
    money = userData[0].money
    console.log(tax)
  })
  .catch(error => console.log(error))
// fetch GET upgrade_data
fetch("./update_data.json")
  .then(response => response.json())
  .then(updateDataJson => {
    console.log(updateDataJson);
    updateData = updateDataJson;
  })


const loadUser = () => {
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
  // valuePerClick and moneyPerAuto with included bonuses
  valuePerClick = Math.round((userData[0].moneyPerClick * userData[0].valueClickBonus.bonus * userData[0].valueMultiplerBonus.bonus * userData[0].moneyBoost.bonus));
  MoneyPerClick = Math.round((userData[0].moneyPerAuto * userData[0].moneyBoost.bonus));
  // main => show bonuses
  moneyObject.innerHTML = userData[0].money;
  valuePerClickObject.innerHTML = valuePerClick;
  moneyPerAutoObject.innerHTML = userData[0].moneyPerAuto;
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
  valuePerClickObject.innerHTML = Math.round(moneyPerClick)
  money = Math.round(money + moneyPerClick);
  moneyObject.innerHTML = money;
 })
}

// updating curently money every second function
const moneyEverySec = () => {
  moneyTime = (userData[0].moneyPerAuto * userData[0].moneyBoost.bonus) 
  if(userData[0].multipleMoneySkill.active) {
    moneyTime *= userData[0].multipleMoneySkillUpgrade.bonus;
  }
  moneyPerAutoObject.innerHTML = Math.round(moneyTime);
  money = Math.round(money + moneyTime);
  moneyObject.innerHTML = money; 
}

// updating curently money every second function included in interval function 
const autoMoneyUpdate = () => {
  setInterval(moneyEverySec, 1000)
}

// exporting data to the server with fetch POST, and then on a server automaticaly save as JSON file
const saveUserData = () => {
  document.querySelector('.save-game').addEventListener('click', () => {
    userData[0].money = money
    console.log(userData[0].money)
    fetch('/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
  })
}

//                      UPGRADES
// valueMultiplerBonusUpgrade
const valueMultiplerBonusUpgrade = () => {
  document.querySelector('.value-multipler-bonus-container').addEventListener('click', () => {
    if(money >= (userData[0].valueMultiplerBonus.upgradeCost - (userData[0].valueMultiplerBonus.upgradeCost * tax))) {
      money = Math.round(money - (userData[0].valueMultiplerBonus.upgradeCost - (userData[0].valueMultiplerBonus.upgradeCost * tax)))
      moneyObject.innerHTML = money
      userData[0].valueMultiplerBonus = updateData.valueMultiplerBonus[userData[0].valueMultiplerBonus.actualLevel ++];
      document.querySelector('.upgrade-multipler-click-bonus-cost').innerHTML = userData[0].valueMultiplerBonus.upgradeCost
      document.querySelector('.value-multipler-bonus').innerHTML = userData[0].valueMultiplerBonus.bonus;
    }
  })
}
//starting game
const startGame = () =>{
  loadUser();
  clickerUpdate();
  autoMoneyUpdate();
  saveUserData();
  valueMultiplerBonusUpgrade();
}
window.onload = startGame
