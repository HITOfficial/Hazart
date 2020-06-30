const gameOn = () => {
    const clickerBox = document.querySelector('.clicker-box');
    const clickValueLevels = [1,2,3,5,7,10,13,16,20];
    const multiplerValueLevels = [1,2,3,5,7,10,13,16,20];
    const factoriesValueLevels = [100,125,150,175,200,250,300,400,500];
    const workersValueLevels = [100,125,150,175,200,250,300,400,500];
    let money = parseFloat(document.querySelector('.money').innerText);
    let moneyResult = document.querySelector('.money');
    let clickBonus = parseFloat(document.querySelector('.value-click-bonus').innerText);
    let multiperBonus = parseFloat(document.querySelector('.value-multipler-bonus').innerText);
    let factoriesBonus = parseFloat(document.querySelector('.factories-bonus').innerText)/100;
    let workersBonus = parseFloat(document.querySelector('.workers-bonus').innerText)/100;


    clickerBox.addEventListener('click',()=> {
        console.log('clicked');
        money +=  clickBonus;
        console.log(money);
        moneyResult.innerText = money;
    });
}
gameOn();