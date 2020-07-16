// MENU
let login, password, email
let availableData = {
  login: true,
  password: true,
  email: true
}
const changePanel = (arrowToHide, arrowToRotate, panel, panelHide, panelUnhide) => {
  arrowToHide.classList.toggle('visibility-hidden');
  arrowToRotate.classList.toggle('rotate-arrow');
  panel.classList.toggle(`${panelHide}`);
  panel.classList.toggle(`${panelUnhide}`);
}
const panelRegister = () => {
  changePanel(document.querySelector('.arrow-forgotten-password'), document.querySelector('.arrow-register'), document.querySelector('.register-panel'), 'register-hide', 'register-unhide');
}
const panelForgottenPassword = () => {
  changePanel(document.querySelector('.arrow-register'), document.querySelector('.arrow-forgotten-password'), document.querySelector('.forgotten-password-panel'), 'forgotten-password-hide', 'forgotten-password-unhide');
}
document.querySelector('.arrow-register').addEventListener('click', panelRegister);
document.querySelector('.registration-return').addEventListener('click', panelRegister);
document.querySelector('.register-text').addEventListener('click', panelRegister);
document.querySelector('.arrow-forgotten-password').addEventListener('click', panelForgottenPassword);
document.querySelector('.forgotten-password-return').addEventListener('click', panelForgottenPassword);
document.querySelector('.forgotten-password').addEventListener('click', panelForgottenPassword);

const createAccount = () => {
  availableData = {
    login: true,
    password: true,
    email: true
  }
 login = document.querySelector('.login-registration').value;
 email = document.querySelector('.e-mail-registration').value
 password = document.querySelector('.password-registration').value;
 userData.forEach((user) => {
   if(user.login == login) {
     availableData.login = false
   }
   if(user.email == email) {
     availableData.email = false;
   }
 })
 if(availableData.login == false || availableData.email == false) {
  console.log('try another data');
 }
}
document.querySelector('.register-button').addEventListener('click', createAccount);

//GAME
let valuePerClick, moneyPerAuto, moneyPerClick, moneyTime, objectUpdateData, visibleValue, giftMoney, intervalClicker, intervalSkill
let moneyObject = document.querySelector('.money');
let valuePerClickObject = document.querySelector('.money-per-click');
let moneyPerAutoObject = document.querySelector('.money-per-auto');
let waitWithUpgradeWorker = [false, false, false, false, false,] // I added new table to stop upgrade automaticaly within buying a worker if user has enought money
let effectivity = 0;
let autoMachineBonus = 0;
let workerMachineBonus = 0;
//fetch GET user_data
fetch("./user_data.json")
  .then(response => response.json())
  .then(data => {
    userData = data;
    tax = userData[0].tax.bonus
    money = userData[0].money
  })
  .catch(error => console.log(error))
// fetch GET upgrade_data
fetch("./update_data.json")
  .then(response => response.json())
  .then(updateDataJson => {
    updateData = updateDataJson;
  })
  fetch("./new_user_data.json")
  .then(response => response.json())
  .then(data => {
    newUserData = data;
  })

const loadUser = () => {
  // main => upgrades (four squares)
  document.querySelector('.value-multipler-bonus').innerHTML = userData[0].valueMultiplerBonus.bonus;
  document.querySelector('.upgrade-multipler-click-bonus-cost').innerHTML = Math.round(userData[0].valueMultiplerBonus.upgradeCost- (userData[0].valueMultiplerBonus.upgradeCost * tax));
  hideSkillLevel(userData[0].valueMultiplerBonus, document.querySelector('.upgrade-multipler-click-cost-container'));
  document.querySelector('.value-click-bonus').innerHTML = userData[0].valueClickBonus.bonus;
  document.querySelector('.upgrade-value-click-bonus-cost').innerHTML = Math.round(userData[0].valueClickBonus.upgradeCost - (userData[0].valueClickBonus.upgradeCost * tax));
  hideSkillLevel(userData[0].valueClickBonus, document.querySelector('.upgrade-value-click-cost-container'));
  document.querySelector('.factories-bonus').innerHTML = userData[0].factories.bonus;
  document.querySelector('.upgrade-factories-bonus-cost').innerHTML = Math.round(userData[0].factories.upgradeCost - (userData[0].factories.upgradeCost * tax));
  hideSkillLevel(userData[0].factories, document.querySelector('.upgrade-factories-bonus-cost-container'));
  document.querySelector('.workers-bonus').innerHTML = userData[0].workers.bonus;
  document.querySelector('.upgrade-workers-bonus-cost').innerHTML = Math.round(userData[0].workers.upgradeCost - (userData[0].workers.upgradeCost * tax));
  
  // main => machines and workers
  userData[0].autoMachine.forEach( factory => {
    if(factory.bought !== true) {
      document.querySelectorAll('.cost-auto-container-factory')[factory.id -1].childNodes[1].innerHTML = Math.round(factory.cost - (factory.cost * tax));
    }
    else {
      document.querySelectorAll('.cost-auto-container-factory')[factory.id -1].parentNode.classList.remove('buy-factory', 'upgrade-border');
      document.querySelectorAll('.cost-auto-container-factory')[factory.id -1].parentNode.classList.add('factory-gif');
    }
  });
  extraRemovingFactoryOpacity(userData[0].autoMachine);
  userData[0].workerMachine.forEach( worker => {
    if(worker.bought !== true){
      document.querySelectorAll('.worker-cost')[worker.id -1].innerHTML = Math.round(worker.cost - (worker.cost * tax));
    }
    else {
      upgradeWorkerChangeImg(worker.level, document.querySelectorAll('.worker-machine')[worker.id -1]);
      document.querySelectorAll('.update-worker-container')[worker.id -1].classList.remove('cost-auto-container-worker');
      document.querySelectorAll('.update-worker-container')[worker.id -1].parentNode.classList.remove('buy-worker', 'upgrade-border');
      document.querySelectorAll('.worker-cost')[worker.id -1].innerHTML = Math.round(worker.upgradeCost - (worker.upgradeCost * tax));
      waitWithUpgradeWorker[worker.id -1] = true;
      if(worker.level == 5) {
        document.querySelectorAll('.update-worker-container')[worker.id -1].style.setProperty('visibility','hidden');
      }
    }
  });
  // tools => upgrades status

  document.querySelector('.money-boost-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.money-boost-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.money-boost-cost').innerHTML = Math.round(userData[0].moneyBoost.upgradeCost - (userData[0].moneyBoost.upgradeCost * tax)) ;
  insideRemover(userData[0].moneyBoost, document.querySelector('.money-boost'));
  document.querySelector('.bonus-gift-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-gift-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.bonus-gift-cost').innerHTML = Math.round(userData[0].moneyBoost.upgradeCost - (userData[0].moneyBoost.upgradeCost * tax));
  insideRemover(userData[0].gift ,document.querySelector('.bonus-gift'));
  document.querySelector('.bonus-tax-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-tax-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.bonus-tax-cost').innerHTML = Math.round(userData[0].moneyBoost.upgradeCost - (userData[0].moneyBoost.upgradeCost * tax));
  insideRemover(userData[0].tax ,document.querySelector('.tax'));
  document.querySelector('.bonus-cooldown-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-cooldown-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.bonus-cooldown-cost').innerHTML = Math.round(userData[0].moneyBoost.upgradeCost - (userData[0].moneyBoost.upgradeCost * tax));
  insideRemover(userData[0].cooldown ,document.querySelector('.cooldown'));
  // tools => upgrades skills
  document.querySelector('.reset-skills-upgrade-actual-level').innerHTML = userData[0].resetSkillsUpgrade.actualLevel
  document.querySelector('.reset-skills-upgrade-max-level').innerHTML = userData[0].resetSkillsUpgrade.maxLevel;
  document.querySelector('.reset-skills-upgrade-cost').innerHTML = Math.round(userData[0].resetSkillsUpgrade.upgradeCost - (userData[0].resetSkillsUpgrade.upgradeCost * tax));
  document.querySelector('.multiple-click-skill-upgrade-actual-level').innerHTML = userData[0].multipleClickSkillUpgrade.actualLevel
  document.querySelector('.multiple-click-skill-upgrade-max-level').innerHTML = userData[0].multipleClickSkillUpgrade.maxLevel;
  document.querySelector('.multiple-click-skill-upgrade-cost').innerHTML = Math.round(userData[0].multipleClickSkillUpgrade.upgradeCost - (userData[0].multipleClickSkillUpgrade.upgradeCost * tax));
  document.querySelector('.multiple-money-skill-upgrade-actual-level').innerHTML = userData[0].multipleMoneySkillUpgrade.actualLevel
  document.querySelector('.multiple-money-skill-upgrade-max-level').innerHTML = userData[0].multipleMoneySkillUpgrade.maxLevel;
  document.querySelector('.multiple-money-skill-upgrade-cost').innerHTML = Math.round(userData[0].multipleMoneySkillUpgrade.upgradeCost - (userData[0].multipleMoneySkillUpgrade.upgradeCost * tax));
  document.querySelector('.multiple-gift-skill-upgrade-actual-level').innerHTML = userData[0].multipleGiftSkillUpgrade.actualLevel
  document.querySelector('.multiple-gift-skill-upgrade-max-level').innerHTML = userData[0].multipleGiftSkillUpgrade.maxLevel;
  document.querySelector('.multiple-gift-skill-upgrade-cost').innerHTML = Math.round(userData[0].multipleGiftSkillUpgrade.upgradeCost - (userData[0].multipleGiftSkillUpgrade.upgradeCost * tax));
  //main => top container - unhide skills 
  showSkill(userData[0].resetSkills, document.querySelector('.reset-skills'));
  showSkill(userData[0].multipleClickSkill, document.querySelector('.multiple-click-skill'));
  showSkill(userData[0].multipleMoneySkill, document.querySelector('.multiple-money-skill'));
  showSkill(userData[0].multipleGiftSkill, document.querySelector('.multiple-gift-skill'));
  // tools => clickers
  document.querySelector('.auto-clicker-cost').innerHTML = Math.round(userData[0].autoClicker.cost - (userData[0].autoClicker.cost * tax));
  document.querySelector('.auto-skills-cost').innerHTML = Math.round(userData[0].autoSkills.cost - (userData[0].autoSkills.cost * tax));
  hideAutoCost(userData[0].autoClicker, document.querySelector('.auto-clicker-cost-container'));
  hideAutoCost(userData[0].autoSkills, document.querySelector('.auto-skills-cost-container'));
  // valuePerClick and moneyPerAuto with included bonuses
  valuePerClick = Math.round((userData[0].moneyPerClick * userData[0].valueClickBonus.bonus * userData[0].valueMultiplerBonus.bonus * userData[0].moneyBoost.bonus));
  MoneyPerClick = Math.round((userData[0].moneyPerAuto * userData[0].moneyBoost.bonus));
  // main => show bonuses
  moneyUpdate();
  moneyEverySecFunctionWithoutAddingMoney();
  clickerUpdateFunctionWithotAddingMoney()
}
//////////////////////////////////////////////////////////////////////
// Clicker Function with skills
const clickerUpdateFunctionWithotAddingMoney = () => {
  moneyPerClick = (userData[0].moneyPerClick * userData[0].valueClickBonus.bonus * userData[0].valueMultiplerBonus.bonus * userData[0].moneyBoost.bonus);
  if(userData[0].multipleClickSkill.active) {
    moneyPerClick *= userData[0].multipleClickSkillUpgrade.bonus;
  }
  if(userData[0].multipleMoneySkill.active) {
    moneyPerClick *= userData[0].multipleMoneySkillUpgrade.bonus;
  }
  valuePerClickObject.innerHTML = Math.round(moneyPerClick);
  moneyUpdate();
}
// Seperated updating money, becouse clickerUpdateFunctionWithotAddingMoney I'll need later to use also in upgrades
const clickerUpdateFunctionAddingMoney = () => {
  money = Math.round(money + moneyPerClick);
  moneyUpdate();
}
const clickerUpdateFunction = () => {
  clickerUpdateFunctionWithotAddingMoney();
  clickerUpdateFunctionAddingMoney();
}
// Runing Clicker Function with skills
const clickerUpdate = () => {
 document.querySelector('.clicker-box').addEventListener('click', clickerUpdateFunction)
}
//////////////////////////////////////////////////////////////////////
const moneyEverySecFunctionWithoutAddingMoney = () => {
  moneyTime = (userData[0].moneyPerAuto * userData[0].moneyBoost.bonus * factoriesBonus() * workersBonus());
  if(userData[0].multipleMoneySkill.active) {
    moneyTime *= userData[0].multipleMoneySkillUpgrade.bonus;
  }
  moneyPerAutoObject.innerHTML = Math.round(moneyTime);
}
// Seperated updating money, becouse moneyEverySecFunctionWithoutAddingMoney I'll need later to use also in upgrades
const moneyEverySecFunctionAddingMoney = () => {
  money = Math.round(money + moneyTime);
  moneyUpdate();
}
// updating curently money every second function
const moneyEverySecFunction = () => {
  moneyEverySecFunctionWithoutAddingMoney();
  moneyEverySecFunctionAddingMoney();
}
// updating curently money every second function included in interval function 
const autoMoneyUpdate = () => {
  setInterval(moneyEverySecFunction, 1000)
}
//////////////////////////////////////////////////////////////////////
// exporting data to the server with fetch POST, and then on a server automaticaly save as JSON file
const saveUserData = () => {
  document.querySelector('.save-game').addEventListener('click', () => {
    userData[0].money = money;
    userData[0].resetSkills.ready = true;
    userData[0].multipleClickSkill.ready = true;
    userData[0].multipleMoneySkill.ready = true;
    userData[0].multipleGiftSkill.ready = true;
    userData[0].resetSkills.active = false;
    userData[0].multipleClickSkill.active = false;
    userData[0].multipleMoneySkill.active = false;
    userData[0].multipleGiftSkill.active = false;
    userData[0].autoSkills.active = false;
    userData[0].autoClicker.active = false;
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
const valueMultiplerBonusUpgrade = () => {
  document.querySelector('.multipler-click').addEventListener('click', () => {
    if((money >= (userData[0].valueMultiplerBonus.upgradeCost - (userData[0].valueMultiplerBonus.upgradeCost * tax))) && (userData[0].valueMultiplerBonus.actualLevel < userData[0].valueMultiplerBonus.maxLevel)) {
      upgradeSquareSkill(userData[0].valueMultiplerBonus, updateData.valueMultiplerBonus, document.querySelector('.upgrade-multipler-click-bonus-cost'), document.querySelector('.value-multipler-bonus'));
      userData[0].valueMultiplerBonus = objectUpdateData;
      hideSkillLevel(userData[0].valueMultiplerBonus, document.querySelector('.upgrade-multipler-click-cost-container'));
    }
  })
}
const valueClickBonusUpgrade = () => {
  document.querySelector('.value-click').addEventListener('click', () => {
    if((money >= (userData[0].valueClickBonus.upgradeCost - (userData[0].valueClickBonus.upgradeCost * tax))) && (userData[0].valueClickBonus.actualLevel < userData[0].valueClickBonus.maxLevel)) {
      upgradeSquareSkill(userData[0].valueClickBonus, updateData.valueClickBonus, document.querySelector('.upgrade-value-click-bonus-cost'), document.querySelector('.value-click-bonus'));
      userData[0].valueClickBonus = objectUpdateData;
      hideSkillLevel(userData[0].valueClickBonus, document.querySelector('.upgrade-value-click-cost-container'));
    }
  })
}
factoriesBonusUpgrade = () => {
  document.querySelector('.factories-upgrade').addEventListener('click', () => {
    if((money >= (userData[0].factories.upgradeCost - (userData[0].factories.upgradeCost *tax))) && (userData[0].factories.actualLevel < userData[0].factories.maxLevel)) {
      upgradeSquareSkill(userData[0].factories, updateData.factories, document.querySelector('.upgrade-factories-bonus-cost'), document.querySelector('.factories-bonus'));
      userData[0].factories = objectUpdateData;
      hideSkillLevel(userData[0].factories, document.querySelector('.upgrade-factories-bonus-cost-container'));
    }
  })
}
workersBonusUpgrade = () => {
  document.querySelector('.workers-upgrade').addEventListener('click', () => {
    if((money >= (userData[0].workers.upgradeCost - (userData[0].workers.upgradeCost *tax))) && (userData[0].workers.actualLevel < userData[0].workers.maxLevel)) {
      upgradeSquareSkill(userData[0].workers, updateData.workers, document.querySelector('.upgrade-workers-bonus-cost'), document.querySelector('.workers-bonus'));
      userData[0].workers = objectUpdateData;
      hideSkillLevel(userData[0].workers, document.querySelector('.upgrade-workers-bonus-cost-container'));
    }
  })
}
const buyFactory = () => {
  userData[0].autoMachine.forEach(factory => {
    document.querySelectorAll('.auto-machine')[factory.id -1].addEventListener('click', () => {
      if(factory.bought == true) return 0;
      else {
        if(money >= (userData[0].autoMachine[factory.id -1].cost - userData[0].autoMachine[factory.id -1].cost * tax)){
          buy(userData[0].autoMachine[factory.id -1], document.querySelectorAll('.auto-machine')[factory.id -1], 'factory-gif', 'buy-factory', document.querySelectorAll('.cost-auto-container-factory')[factory.id -1]);
          moneyEverySecFunctionWithoutAddingMoney();
          borderDuringUpdate(document.querySelectorAll('.auto-machine')[factory.id -1]);
        }
      }
    })
  })
}
const buyWorker = () => {
  userData[0].workerMachine.forEach(worker => {
    document.querySelectorAll('.worker-machine')[worker.id -1].addEventListener('click', () => {
      if(worker.bought == true) return 0;
      else {
        if(money >= (userData[0].workerMachine[worker.id -1].cost - userData[0].workerMachine[worker.id -1].cost * tax)){
          buy(userData[0].workerMachine[worker.id -1], document.querySelectorAll('.worker-machine')[worker.id -1], null, 'buy-worker', document.querySelectorAll('.update-worker-container')[worker.id -1], 'cost-auto-container-worker');
          moneyEverySecFunctionWithoutAddingMoney();
          borderDuringUpdate(document.querySelectorAll('.worker-machine')[worker.id -1]);
          setTimeout(() => {
            document.querySelectorAll('.worker-cost')[worker.id -1].innerHTML = Math.round(worker.upgradeCost - (worker.upgradeCost * tax));
            waitWithUpgradeWorker[worker.id -1] = true;
          },1400)
        }
      }
    })
  })
}
const workerUpgrade = () => {
  userData[0].workerMachine.forEach(worker => {
    document.querySelectorAll('.worker-machine')[worker.id -1].addEventListener('click', () => {
      if((worker.bought == true) && (money >= (userData[0].workerMachine[worker.id -1].upgradeCost - userData[0].workerMachine[worker.id -1].upgradeCost * tax)) && (userData[0].workerMachine[worker.id -1].level < 5) && (waitWithUpgradeWorker[worker.id -1] == true)){
        money = money - (userData[0].workerMachine[worker.id -1].upgradeCost - (userData[0].workerMachine[worker.id -1].upgradeCost * tax));
        moneyUpdate();
        upgradeWorkerDataUpdate(userData[0].workerMachine[worker.id -1]);
        moneyEverySecFunctionWithoutAddingMoney();
        setTimeout(() => {
          document.querySelectorAll('.worker-cost')[worker.id -1].innerHTML = Math.round(worker.upgradeCost - (worker.upgradeCost * tax));
          upgradeWorkerChangeImg(worker.level, document.querySelectorAll('.worker-machine')[worker.id -1]);
          if(worker.level == 5) {
            document.querySelectorAll('.update-worker-container')[worker.id -1].style.setProperty('visibility','hidden');
          }
        },1400)
      } else return 0;
    })
  })
}
const moneyBoostUpgrade = () =>{
  document.querySelector('.money-boost').addEventListener('click', () => {
    objectUpdateData;
    upgrader(userData[0].moneyBoost, updateData.moneyBoost, document.querySelector('.money-boost-cost'), document.querySelector('.money-boost-actual-level'), document.querySelector('.money-boost'));
    userData[0].moneyBoost = objectUpdateData;
    moneyEverySecFunctionWithoutAddingMoney();
  })
}
const bonusGiftUpgrade = () =>{
  document.querySelector('.bonus-gift').addEventListener('click', () => {
    objectUpdateData;
    upgrader(userData[0].gift, updateData.gift, document.querySelector('.bonus-gift-cost'), document.querySelector('.bonus-gift-actual-level'), document.querySelector('.money-boost'));
    userData[0].gift = objectUpdateData;
    moneyEverySecFunctionWithoutAddingMoney();
  })
}
const taxUpgrade = () =>{
  document.querySelector('.tax').addEventListener('click', () => {
    objectUpdateData;
    upgrader(userData[0].tax, updateData.tax, document.querySelector('.bonus-tax-cost'), document.querySelector('.bonus-tax-actual-level'), document.querySelector('.tax'));
    userData[0].tax = objectUpdateData;
    tax = userData[0].tax.bonus;
    moneyEverySecFunctionWithoutAddingMoney();
  })
}
const cooldownUpgrade = () =>{
  document.querySelector('.cooldown').addEventListener('click', () => {
    objectUpdateData;
    upgrader(userData[0].cooldown, updateData.cooldown, document.querySelector('.bonus-cooldown-cost'), document.querySelector('.bonus-cooldown-actual-level'), document.querySelector('.cooldown'));
    userData[0].cooldown = objectUpdateData;
    moneyEverySecFunctionWithoutAddingMoney();
  })
}
const resetSkillsUpgrade = () => {
  document.querySelector('.reset-skills-upgrade').addEventListener('click', () => {
    if(userData[0].resetSkills.visible == false){
      buySkill(userData[0].resetSkills, userData[0].resetSkillsUpgrade);
      userData[0].resetSkills.visible = visibleValue;
      userData[0].resetSkillsUpgrade.actualLevel = 1;
      document.querySelector('.reset-skills-upgrade-actual-level').innerHTML = userData[0].resetSkillsUpgrade.actualLevel;
      showSkill(userData[0].resetSkills, document.querySelector('.reset-skills'));
    }
    else {
      objectUpdateData;
      upgrader(userData[0].resetSkillsUpgrade, updateData.resetSkillsUpgrade, document.querySelector('.reset-skills-upgrade-cost'), document.querySelector('.reset-skills-upgrade-actual-level'), document.querySelector('.reset-skills-upgrade'));
      userData[0].resetSkillsUpgrade = objectUpdateData;
      hideSkillLevel(userData[0].resetSkillsUpgrade, document.querySelector('.reset-skills-upgrade-cost-container'));
    }
  })
}
const multipleClickSkillUpgrade = () => {
  document.querySelector('.multiple-click-skill-upgrade').addEventListener('click', () => {
    if(userData[0].multipleClickSkill.visible == false){
      buySkill(userData[0].multipleClickSkill, userData[0].multipleClickSkillUpgrade);
      userData[0].multipleClickSkill.visible = visibleValue;
      userData[0].multipleClickSkillUpgrade.actualLevel = 1;
      document.querySelector('.multiple-click-skill-upgrade-actual-level').innerHTML = userData[0].multipleClickSkillUpgrade.actualLevel;
      showSkill(userData[0].multipleClickSkill, document.querySelector('.multiple-click-skill'));
    }
    else {
      objectUpdateData;
      upgrader(userData[0].multipleClickSkillUpgrade, updateData.multipleClickSkillUpgrade, document.querySelector('.multiple-click-skill-upgrade-cost'), document.querySelector('.multiple-click-skill-upgrade-actual-level'), document.querySelector('.multiple-click-skill-upgrade'));
      userData[0].multipleClickSkillUpgrade = objectUpdateData;
      hideSkillLevel(userData[0].multipleClickSkillUpgrade, document.querySelector('.multiple-click-skill-upgrade-cost-container'));
    }
  })
}
const multipleMoneySkillUpgrade = () => {
  document.querySelector('.multiple-money-skill-upgrade').addEventListener('click', () => {
    if(userData[0].multipleMoneySkill.visible == false){
      buySkill(userData[0].multipleMoneySkill, userData[0].multipleMoneySkillUpgrade);
      userData[0].multipleMoneySkill.visible = visibleValue;
      userData[0].multipleMoneySkillUpgrade.actualLevel = 1;
      document.querySelector('.multiple-money-skill-upgrade-actual-level').innerHTML = userData[0].multipleMoneySkillUpgrade.actualLevel;
      showSkill(userData[0].multipleMoneySkill, document.querySelector('.multiple-money-skill'));
    }
    else {
      objectUpdateData;
      upgrader(userData[0].multipleMoneySkillUpgrade, updateData.multipleMoneySkillUpgrade, document.querySelector('.multiple-money-skill-upgrade-cost'), document.querySelector('.multiple-money-skill-upgrade-actual-level'), document.querySelector('.multiple-money-skill-upgrade'));
      userData[0].multipleMoneySkillUpgrade = objectUpdateData;
      hideSkillLevel(userData[0].multipleMoneySkillUpgrade, document.querySelector('.multiple-money-skill-upgrade-cost-container'));
    }
  })
}
const multipleGiftSkillUpgrade = () => {
  document.querySelector('.multiple-gift-skill-upgrade').addEventListener('click', () => {
    if(userData[0].multipleGiftSkill.visible == false){
      buySkill(userData[0].multipleGiftSkill, userData[0].multipleGiftSkillUpgrade);
      userData[0].multipleGiftSkill.visible = visibleValue;
      userData[0].multipleGiftSkillUpgrade.actualLevel = 1;
      document.querySelector('.multiple-gift-skill-upgrade-actual-level').innerHTML = userData[0].multipleGiftSkillUpgrade.actualLevel;
      showSkill(userData[0].multipleGiftSkill, document.querySelector('.multiple-gift-skill'));
    }
    else {
      objectUpdateData;
      upgrader(userData[0].multipleGiftSkillUpgrade, updateData.multipleGiftSkillUpgrade, document.querySelector('.multiple-gift-skill-upgrade-cost'), document.querySelector('.multiple-gift-skill-upgrade-actual-level'), document.querySelector('.multiple-gift-skill-upgrade'));
      userData[0].multipleGiftSkillUpgrade = objectUpdateData;
      hideSkillLevel(userData[0].multipleMoneySkillUpgrade, document.querySelector('.multiple-gift-skill-upgrade-cost-container'));
    }
  })
}
// I did not do a multi function to resetSkills becouse, this one is difrent inside
const resetSkills = () => {
  document.querySelector('.reset-skills').addEventListener('click',resetSkillsFunction);
}
const resetSkillsFunction = () => {
  if((userData[0].resetSkills.visible == true) && (userData[0].resetSkills.ready == true)){
    userData[0].resetSkills.ready = false;
    userData[0].multipleClickSkill.ready = true;
    userData[0].multipleMoneySkill.ready = true;
    userData[0].multipleGiftSkill.ready = true;
    document.querySelector('.reset-skills').classList.add('white');
    document.querySelector('.multiple-click-skill').classList.remove('white');
    document.querySelector('.multiple-money-skill').classList.remove('white');
    document.querySelector('.multiple-gift-skill').classList.remove('white');
    setTimeout( () => {
      userData[0].resetSkills.ready = true;
      document.querySelector('.reset-skills').classList.add('white');
    }, userData[0].resetSkills.cooldown - (userData[0].resetSkills.cooldown * userData[0].cooldown.bonus))
    clickerUpdateFunctionWithotAddingMoney();
    moneyEverySecFunctionWithoutAddingMoney();
  }
  else return 0;
}
const multipleClickSkill = () => {
  document.querySelector('.multiple-click-skill').addEventListener('click', multipleClickSkillFunction );
}
multipleClickSkillFunction = () => {
  turnOnSkill(userData[0].multipleClickSkill, document.querySelector('.multiple-click-skill'));
}
const multipleMoneySkill = () => {
  document.querySelector('.multiple-money-skill').addEventListener('click', multipleMoneySkillFunction);
}
const multipleMoneySkillFunction = () => {
  turnOnSkill(userData[0].multipleMoneySkill, document.querySelector('.multiple-money-skill'));
}
const multipleGiftSkill = () => {
  document.querySelector('.multiple-gift-skill').addEventListener('click', multipleGiftSkillFunction);
}
const multipleGiftSkillFunction = () => {
  turnOnSkill(userData[0].multipleGiftSkill, document.querySelector('.multiple-gift-skill'));
}
const AutoClicker = () => {
  document.querySelector('.auto-clicker').addEventListener('click', () => {
    if(userData[0].autoClicker.bought == false && (money >= (userData[0].autoClicker.cost - (userData[0].autoClicker.cost * tax)))) { // I added also here requirement to cost of auto clicker to do not have complication with objectData undefined
      autoBuy(userData[0].autoClicker, document.querySelector('.auto-clicker-cost-container'));
      userData[0].autoClicker.bought = objectUpdateData;
    } else {
        if(userData[0].autoClicker.active == false && userData[0].autoSkills.bought == true) {
          userData[0].autoClicker.active = true;
          document.querySelector('.auto-clicker').classList.add('auto-box-clicked');
        }
        else if(userData[0].autoClicker.active == true) {
          userData[0].autoClicker.active = false;
          clearInterval(intervalClicker);
          document.querySelector('.auto-clicker').classList.remove('auto-box-clicked');
        }
        if(userData[0].autoClicker.active == true) {
          intervalClicker = setInterval(clickerUpdateFunction, 1000);
      }
    }
  })
}
const AutoSkills = () => {
  document.querySelector('.auto-skills').addEventListener('click', () => {
    if((userData[0].autoSkills.bought == false) && (money >= (userData[0].autoSkills.cost - (userData[0].autoSkills.cost * tax)))) { // I added also here requirement to cost of auto skills to do not have complication with objectData undefined
      autoBuy(userData[0].autoSkills, document.querySelector('.auto-skills-cost-container'));
      userData[0].autoSkills.bought = objectUpdateData;
    } else {
        if(userData[0].autoSkills.active == false && userData[0].autoSkills.bought == true) {
          userData[0].autoSkills.active = true;
          document.querySelector('.auto-skills').classList.add('auto-box-clicked');
        }
        else if(userData[0].autoSkills.active == true) {
          userData[0].autoSkills.active = false;
          clearInterval(intervalSkill);
          document.querySelector('.auto-skills').classList.remove('auto-box-clicked');
        }
        if(userData[0].autoSkills.active == true) {
          intervalSkill = setInterval(skills, 1000);
      }
    }
  })
}
//Counting Bonuses of every single factory and worker
const factoriesBonus = () => {
  effectivity = 0;
  countBonus(userData[0].autoMachine);
  autoMachineBonus = effectivity;
  autoMachineBonus *= (userData[0].factories.bonus / 100)
  return autoMachineBonus;
}
const workersBonus = () => {
  effectivity = 0;
  countBonus(userData[0].workerMachine)
  workerMachineBonus = effectivity;
  workerMachineBonus *= (userData[0].workers.bonus / 100)
  return workerMachineBonus;
}
const skills = () => {
  multipleClickSkillFunction();
  multipleMoneySkillFunction();
  multipleGiftSkillFunction();
  clickerUpdateFunctionWithotAddingMoney();
  moneyEverySecFunctionWithoutAddingMoney();
  resetSkillsFunction();
}
// packing all updating functions inside one
const upgrades= () => {
  valueMultiplerBonusUpgrade();
  valueClickBonusUpgrade();
  factoriesBonusUpgrade();
  workersBonusUpgrade();
  buyFactory();
  buyWorker();
  workerUpgrade();
  moneyBoostUpgrade();
  bonusGiftUpgrade();
  taxUpgrade();
  cooldownUpgrade();
  resetSkillsUpgrade();
  multipleClickSkillUpgrade();
  multipleMoneySkillUpgrade();
  multipleGiftSkillUpgrade();
  resetSkills();
  multipleClickSkill();
  multipleMoneySkill();
  multipleGiftSkill();
  AutoClicker();
  AutoSkills();
}
//////////////////////////////////////////////////////////////////////
// functions wchih could be use more time:
const borderDuringUpdate = (actual) => {
  setTimeout(() => {
    actual.classList.remove('upgrade-border');
    actual.classList.add('upgrade-border-red');
    setTimeout(() => {
      actual.classList.remove('upgrade-border-red');
    }, 1200)
  }, 200)
}
const buy = (item, ObjectToManipulate, classAdd, classRemove, children, childrenClassName) => {
  if((money >= (item.cost - (item.cost * tax))) && (item.bought == false)) {
    money = Math.round( money - (item.cost - (item.cost * tax)));
    item.bought = true;
    moneyUpdate();
    if(classAdd !== null){
      setTimeout(() => {
        ObjectToManipulate.classList.add(classAdd);
      }, 900);
      setTimeout(() => {
        ObjectToManipulate.removeChild(ObjectToManipulate.childNodes[1]);
      }, 1400);
    } else {
      setTimeout(() => {
        children.classList.remove(childrenClassName);
      }, 1400)
    }
    setTimeout(() => {
      ObjectToManipulate.classList.remove(classRemove);
    }, 700);
  }
}
const upgradeWorkerDataUpdate = (worker) => {
  worker.effectivity = updateData.workerMachine[worker.level].effectivity;
  worker.level = updateData.workerMachine[worker.level].level;
  worker.upgradeCost = updateData.workerMachine[worker.level].upgradeCost;
}
const moneyUpdate = () => {
  moneyObject.innerHTML = money;
}
const upgradeWorkerChangeImg = (level, object) => {
  switch(level) {
      case 1:
        object.style.setProperty('background-image', "url('./images/icons/baby-icon.png')");
        break;
      case 2:
        object.style.setProperty('background-image', "url('./images/icons/boy-icon.png')");
        break;
      case 3:
        object.style.setProperty('background-image', "url('./images/icons/confederate-soldier-icon.png')");
        break;
      case 4:
        object.style.setProperty('background-image', "url('./images/icons/construction-worker-icon.png')");
        break;   
      case 5:
        object.style.setProperty('background-image', "url('./images/icons/king-icon.png')");
        break;
  }
}
const upgrader = (object, updateDataObject, classUpgradeCost, clasActualLevel, parentObject) => {
  if((object.actualLevel < object.maxLevel) && (money >= (object.upgradeCost - (object.upgradeCost * tax)))) {
    money = Math.round(money - (object.upgradeCost - (object.upgradeCost * tax)));
    object = updateDataObject[object.actualLevel];
    classUpgradeCost.innerHTML = object.upgradeCost - (object.upgradeCost * tax);
    clasActualLevel.innerHTML = object.actualLevel;
     // I created objectUpdateData in every parent function to be able later save data from this function in userData
    objectUpdateData = object;
    moneyUpdate();
  }
  else {
    insideRemover(object, parentObject);
  }
}
const insideRemover = (object, parent) => {
  if(object.actualLevel == object.maxLevel) parent.innerHTML = '<span style= "float: right">MAX</span>';
}
const upgradeSquareSkill = (object, updateDataObject, upgradeCostClass, bonusClass) => {
  money = Math.round(money - (object.upgradeCost - (object.upgradeCost * tax)))
  moneyUpdate();
  object = updateDataObject[object.actualLevel];
  upgradeCostClass.innerHTML = Math.round(object.upgradeCost - (object.upgradeCost * tax));
  bonusClass.innerHTML = object.bonus;
  clickerUpdateFunctionWithotAddingMoney();
  moneyEverySecFunctionWithoutAddingMoney();
  objectUpdateData = object;
}
const buySkill = (skill, upgradeSkill) => {
  if(money >= upgradeSkill.upgradeCost - (upgradeSkill.upgradeCost * tax)){
    skill.visible = true;
    visibleValue = skill.visible;
  }
}
const turnOnSkill = (skill, objectClass) => {
  if((skill.visible == true) && (skill.ready == true)){
    skill.ready = false;
    skill.active = true;
    objectClass.classList.add('white');
    if(skill == userData[0].multipleGiftSkill) {
      giftMoney = Math.round(userData[0].moneyBoost.bonus * userData[0].gift.bonus);
      if(userData[0].multipleMoneySkill.active) {
        giftMoney *= userData[0].multipleMoneySkillUpgrade.bonus;
      }
      money += Math.round(giftMoney);
      moneyUpdate();
    }
    setTimeout( () => {
      skill.ready = true; 
      skill.active = false; 
      objectClass.classList.remove('white');
      clickerUpdateFunctionWithotAddingMoney();
      moneyEverySecFunctionWithoutAddingMoney();
    }, skill.cooldown - (skill.cooldown * userData[0].cooldown.bonus));
    clickerUpdateFunctionWithotAddingMoney();
    moneyEverySecFunctionWithoutAddingMoney();
  }
  else return 0;
}
const autoBuy = (object, classToHide) => {
  if(money >= (object.cost - (object.cost * tax))) {
    money -= (object.cost - (object.cost * tax));
    object.bought = true;
    objectUpdateData = object.bought;
    hideAutoCost(object, classToHide);
    moneyUpdate();
  }
}
const hideSkillLevel = (skillUpgrade ,classToHide) => {
  if(skillUpgrade.actualLevel == skillUpgrade.maxLevel) {
    classToHide.classList.add('visibility-hidden');
  }
}
const showSkill = (skill, classToUnhide) => {
  if(skill.visible == true){
    classToUnhide.classList.remove('visibility-hidden');
  }
}
const hideAutoCost = (object, classToHide) => {
  if(object.bought == true ) classToHide.classList.add('visibility-hidden');
}
const countBonus = (object) => {
  object.forEach(obj => {
    if(obj.bought == true) {
      effectivity += obj.effectivity;
    }
  })
  effectivity /= 100
}
//shit to rework
const extraRemovingFactoryOpacity = (factoryTab) => {
  factoryTab.forEach(factory => {
    if(factory.bought == true) {
      document.querySelectorAll('.auto-machine')[factory.id -1].removeChild(document.querySelectorAll('.auto-machine')[factory.id -1].childNodes[1])
    }
  })
}
//starting game
const startGame = () =>{
  loadUser();
  clickerUpdate();
  autoMoneyUpdate();
  saveUserData();
  upgrades();
}
window.onload = startGame
