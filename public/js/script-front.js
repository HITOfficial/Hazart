let valuePerClick, moneyPerAuto, moneyPerClick, moneyTime
let moneyObject = document.querySelector('.money');
let valuePerClickObject = document.querySelector('.money-per-click');
let moneyPerAutoObject = document.querySelector('.money-per-auto');
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


const loadUser = () => {
  // main => upgrades (four squares)
  document.querySelector('.value-multipler-bonus').innerHTML = userData[0].valueMultiplerBonus.bonus;
  document.querySelector('.upgrade-multipler-click-bonus-cost').innerHTML = Math.round(userData[0].valueMultiplerBonus.upgradeCost- (userData[0].valueMultiplerBonus.upgradeCost * tax));
  document.querySelector('.value-click-bonus').innerHTML = userData[0].valueClickBonus.bonus;
  document.querySelector('.upgrade-value-click-bonus-cost').innerHTML = Math.round(userData[0].valueClickBonus.upgradeCost - (userData[0].valueClickBonus.upgradeCost * tax));
  document.querySelector('.factories-bonus').innerHTML = userData[0].factories.bonus;
  document.querySelector('.upgrade-factories-bonus-cost').innerHTML = Math.round(userData[0].factories.upgradeCost - (userData[0].factories.upgradeCost * tax));
  document.querySelector('.workers-bonus').innerHTML = userData[0].workers.bonus;
  document.querySelector('.upgrade-workers-bonus-cost').innerHTML = Math.round(userData[0].workers.upgradeCost - (userData[0].workers.upgradeCost * tax));
  // main => machines and workers
  userData[0].autoMachine.forEach( machine => {
    document.querySelectorAll('.machine-cost')[machine.id -1].innerHTML = Math.round(machine.cost - (machine.cost * tax));
  });
  userData[0].workerMachine.forEach( worker => {
    document.querySelectorAll('.worker-cost')[worker.id -1].innerHTML = Math.round(worker.cost - (worker.cost * tax));
  });
  // tools => upgrades status
  document.querySelector('.bonus-money-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-money-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.bonus-money-cost').innerHTML = Math.round(userData[0].moneyBoost.upgradeCost - (userData[0].moneyBoost.upgradeCost * tax)) ;
  document.querySelector('.bonus-gift-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-gift-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.gift-cost').innerHTML = Math.round(userData[0].moneyBoost.upgradeCost - (userData[0].moneyBoost.upgradeCost * tax));
  document.querySelector('.bonus-tax-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-tax-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.tax-cost').innerHTML = Math.round(userData[0].moneyBoost.upgradeCost - (userData[0].moneyBoost.upgradeCost * tax));
  document.querySelector('.bonus-cooldown-actual-level').innerHTML = userData[0].moneyBoost.actualLevel;
  document.querySelector('.bonus-cooldown-max-level').innerHTML = userData[0].moneyBoost.maxLevel;
  document.querySelector('.cooldown-cost').innerHTML = Math.round(userData[0].moneyBoost.upgradeCost - (userData[0].moneyBoost.upgradeCost * tax));
  document.querySelector('.gift-cost').innerHTML = Math.round(userData[0].gift.upgradeCost - (userData[0].gift.upgradeCost * tax));
  document.querySelector('.tax-cost').innerHTML = Math.round(userData[0].tax.upgradeCost - (userData[0].tax.upgradeCost * tax));
  document.querySelector('.cooldown-cost').innerHTML = Math.round(userData[0].cooldown.upgradeCost - (userData[0].cooldown.upgradeCost * tax));
  // tools => upgrades skills
  document.querySelector('.reset-skills-actual-level').innerHTML = userData[0].resetSkillsUpgrade.actualLevel
  document.querySelector('.reset-skills-max-level').innerHTML = userData[0].resetSkillsUpgrade.maxLevel;
  document.querySelector('.reset-skills-upgrade-cost').innerHTML = Math.round(userData[0].resetSkillsUpgrade.upgradeCost - (userData[0].resetSkillsUpgrade.upgradeCost * tax));
  document.querySelector('.multiple-click-skill-actual-level').innerHTML = userData[0].multipleClickSkillUpgrade.actualLevel
  document.querySelector('.multiple-click-skill-max-level').innerHTML = userData[0].multipleClickSkillUpgrade.maxLevel;
  document.querySelector('.multiple-click-skill-upgrade-cost').innerHTML = Math.round(userData[0].multipleClickSkillUpgrade.upgradeCost - (userData[0].multipleClickSkillUpgrade.upgradeCost * tax));
  document.querySelector('.multiple-money-skill-actual-level').innerHTML = userData[0].multipleMoneySkillUpgrade.actualLevel
  document.querySelector('.multiple-money-skill-max-level').innerHTML = userData[0].multipleMoneySkillUpgrade.maxLevel;
  document.querySelector('.multiple-money-skill-upgrade-cost').innerHTML = Math.round(userData[0].multipleMoneySkillUpgrade.upgradeCost - (userData[0].multipleMoneySkillUpgrade.upgradeCost * tax));
  document.querySelector('.multiple-gift-skill-actual-level').innerHTML = userData[0].multipleGiftSkillUpgrade.actualLevel
  document.querySelector('.multiple-gift-skill-max-level').innerHTML = userData[0].multipleGiftSkillUpgrade.maxLevel;
  document.querySelector('.multiple-gift-skill-upgrade-cost').innerHTML = Math.round(userData[0].multipleGiftSkillUpgrade.upgradeCost - (userData[0].multipleGiftSkillUpgrade.upgradeCost * tax));
  // tools => clickers
  document.querySelector('.auto-clicker-cost').innerHTML = Math.round(userData[0].autoClicker.cost - (userData[0].autoClicker.cost * tax));
  document.querySelector('.auto-skills-cost').innerHTML = Math.round(userData[0].autoSkills.cost - (userData[0].autoSkills.cost * tax));
  // valuePerClick and moneyPerAuto with included bonuses
  valuePerClick = Math.round((userData[0].moneyPerClick * userData[0].valueClickBonus.bonus * userData[0].valueMultiplerBonus.bonus * userData[0].moneyBoost.bonus));
  MoneyPerClick = Math.round((userData[0].moneyPerAuto * userData[0].moneyBoost.bonus));
  // main => show bonuses
  moneyObject.innerHTML = userData[0].money;
  valuePerClickObject.innerHTML = valuePerClick;
  moneyPerAutoObject.innerHTML = userData[0].moneyPerAuto;
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
}
// Seperated updating money, becouse clickerUpdateFunctionWithotAddingMoney I'll need later to use also in upgrades
const clickerUpdateFunctionAddingMoney = () => {
  money = Math.round(money + moneyPerClick);
  moneyObject.innerHTML = money;
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
  moneyTime = (userData[0].moneyPerAuto * userData[0].moneyBoost.bonus) 
  if(userData[0].multipleMoneySkill.active) {
    moneyTime *= userData[0].multipleMoneySkillUpgrade.bonus;
  }
  moneyPerAutoObject.innerHTML = Math.round(moneyTime);
}
// Seperated updating money, becouse moneyEverySecFunctionWithoutAddingMoney I'll need later to use also in upgrades
const moneyEverySecFunctionAddingMoney = () => {
  money = Math.round(money + moneyTime);
  moneyObject.innerHTML = money; 
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
    userData[0].money = money
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
    if(money >= (userData[0].valueMultiplerBonus.upgradeCost - (userData[0].valueMultiplerBonus.upgradeCost * tax))) {
      money = Math.round(money - (userData[0].valueMultiplerBonus.upgradeCost - (userData[0].valueMultiplerBonus.upgradeCost * tax)))
      moneyObject.innerHTML = money
      userData[0].valueMultiplerBonus = updateData.valueMultiplerBonus[userData[0].valueMultiplerBonus.actualLevel ++];
      document.querySelector('.upgrade-multipler-click-bonus-cost').innerHTML = Math.round(userData[0].valueMultiplerBonus.upgradeCost - (userData[0].valueMultiplerBonus.upgradeCost * tax));
      document.querySelector('.value-multipler-bonus').innerHTML = userData[0].valueMultiplerBonus.bonus;
      clickerUpdateFunctionWithotAddingMoney();
      moneyEverySecFunctionWithoutAddingMoney();
    }
  })
}
const valueClickBonusUpgrade = () => {
  document.querySelector('.value-click').addEventListener('click', () => {
    if(money >= (userData[0].valueClickBonus.upgradeCost - (userData[0].valueClickBonus.upgradeCost * tax))) {
      money = Math.round(money - (userData[0].valueClickBonus.upgradeCost - (userData[0].valueClickBonus.upgradeCost * tax)));
      moneyObject.innerHTML = money;
      userData[0].valueClickBonus = updateData.valueClickBonus[userData[0].valueClickBonus.actualLevel ++];
      document.querySelector('.upgrade-value-click-bonus-cost').innerHTML = Math.round(userData[0].valueClickBonus.upgradeCost - (userData[0].valueClickBonus.upgradeCost * tax));
      document.querySelector('.value-click-bonus').innerHTML = userData[0].valueClickBonus.bonus;
      clickerUpdateFunctionWithotAddingMoney();
    }
  })
}
factoriesBonusUpgrade = () => {
  document.querySelector('.factories-upgrade').addEventListener('click', () => {
    if(money >= (userData[0].factories.upgradeCost - (userData[0].factories.upgradeCost *tax))) {
      money = Math.round(money - (userData[0].factories.upgradeCost - (userData[0].factories.upgradeCost * tax)));
      moneyObject.innerHTML = money;
      userData[0].factories = updateData.factories[userData[0].factories.actualLevel ++];
      document.querySelector('.factories-bonus').innerHTML = userData[0].factories.bonus;
      document.querySelector('.upgrade-factories-bonus-cost').innerHTML = Math.round(userData[0].factories.upgradeCost - (userData[0].factories.upgradeCost * tax));
      moneyEverySecFunctionWithoutAddingMoney();
    }
  })
}
workersBonusUpgrade = () => {
  document.querySelector('.workers-upgrade').addEventListener('click', () => {
    if(money >= (userData[0].workers.upgradeCost - (userData[0].workers.upgradeCost *tax))) {
      money = Math.round(money - (userData[0].workers.upgradeCost - (userData[0].workers.upgradeCost * tax)));
      moneyObject.innerHTML = money;
      userData[0].workers = updateData.workers[userData[0].workers.actualLevel ++];
      document.querySelector('.workers-bonus').innerHTML = userData[0].workers.bonus;
      document.querySelector('.upgrade-workers-bonus-cost').innerHTML = Math.round(userData[0].workers.upgradeCost - (userData[0].workers.upgradeCost * tax));
      moneyEverySecFunctionWithoutAddingMoney();
    }
  })
}
const buyFactory = () => {
  userData[0].autoMachine.forEach(factory => {
    document.querySelectorAll('.auto-machine')[factory.id -1].addEventListener('click', () => {
      if(factory.bought == true) return 0;
      else {
        buy(userData[0].autoMachine[factory.id -1], document.querySelectorAll('.auto-machine')[factory.id -1], 'factory-gif', 'buy-factory', document.querySelectorAll('.cost-auto-container-factory')[factory.id -1]);
        moneyEverySecFunctionWithoutAddingMoney();
        borderDuringUpdate(document.querySelectorAll('.auto-machine')[factory.id -1]);
      }
    })
  })
}
const buyWorker = () => {
  userData[0].workerMachine.forEach(worker => {
    document.querySelectorAll('.worker-machine')[worker.id -1].addEventListener('click', () => {
      if(worker.bought == true) return 0;
      else {
        buy(userData[0].workerMachine[worker.id -1], document.querySelectorAll('.worker-machine')[worker.id -1], null, 'buy-worker', document.querySelectorAll('.update-worker-container')[worker.id -1], 'cost-auto-container-worker');
        moneyEverySecFunctionWithoutAddingMoney();
        borderDuringUpdate(document.querySelectorAll('.worker-machine')[worker.id -1]);
      }
    })
  })
}

// packing all updating functions inside one
const upgrades= () => {
  valueMultiplerBonusUpgrade();
  valueClickBonusUpgrade();
  factoriesBonusUpgrade();
  workersBonusUpgrade();
  buyFactory();
  buyWorker();
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
    moneyObject.innerHTML = money;
    if(classAdd != null){
      setTimeout(() => {
        ObjectToManipulate.classList.add(classAdd);
      }, 900);
      setTimeout(() => {
        ObjectToManipulate.removeChild(ObjectToManipulate.childNodes[1]);
      }, 1400);
    } else {
      setTimeout(() => {
        console.log(children)
        children.classList.remove(childrenClassName);
      }, 1400)
    }
    setTimeout(() => {
      ObjectToManipulate.classList.remove(classRemove);
    }, 700);
  }
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
