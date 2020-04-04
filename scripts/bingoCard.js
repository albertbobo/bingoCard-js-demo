window.onload = initAll;
var usedNums = new Array(76);

function initAll() {
    if (document.getElementById) {
        newCard();
        document.getElementById("reload").onclick = anotherCard;
    } else {
        alert("Sorry, your browser doesn't support this script")
    }
}

function newCard() {
    for (var i = 0; i < 24; i++) {
        setSquare(i);
    }
}

function setSquare(thisSquare) {
    var currSquare = "square" + thisSquare;
    var colPlace = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4];
    var colBasic = colPlace[thisSquare] * 15;    // 获得整数0/15/30/45/60
    var newNum;

    // usedNums[newNum]的初始值为false，每次生成随机数newNum后则将usedNums[newNum]设置成true
    // 因此若usedNums[newNum]为true，则进入循环，生成一个新的newNum
    // 直到生成未重复的newNum，即usedNums[newNum]为false，则退出此次循环
    // setSquare()函数将被如此调用24次，依次生成24个不重复的随机数填入单元格中
    do {
        newNum = colBasic + getNewNum() + 1;     // 获得1~75随机整数
    } while (usedNums[newNum]);

    usedNums[newNum] = true;
    document.getElementById(currSquare).innerHTML = newNum;
    document.getElementById(currSquare).className = "";
    document.getElementById(currSquare).onmousedown = toggleColor;
}

function getNewNum() {
    return Math.floor(Math.random() * 15);       // 获得0~14随机整数
}

function anotherCard() {
    for (var i = 0; i < usedNums.length; i++) {
        usedNums[i] = false;
    }
    newCard();
    return false;
}

function toggleColor(evt) {
    var thisSquare;   // 事件触发时鼠标所在的对象
    if (evt) {        // 若evt值被传递给toggleColor()函数，则说明用户浏览器不是IE，使用target属性
        thisSquare = evt.target;
    } else {          // 否则浏览器为IE，则使用window对象的event属性的srcElement属性
        thisSquare = window.event.srcElement;
    }
    if (thisSquare.className === "") {
        thisSquare.className = "pickedBG";
    } else {
        thisSquare.className = "";
    }
    checkWin();
}

function checkWin() {
    var winningOption = -1;    // 用户可能遇到的获胜选项
    var setSquares = 0;        // 已经被点击的格子
    var winners = [31, 992, 15360, 507904, 541729, 557328, 1083458, 2162820, 4329736, 8519745, 8659472, 16252928];   // 12种获胜的情况（把格子填入顺序0,1,2,3,…,23当作位0,位1,位2,位3,…,位23，数组所存的值是获胜的格子组合的位的2次幂运算之和）

    for (var i = 0; i < 24; i++) {
        var currSquare = "square" + i;
        if (document.getElementById(currSquare).className !== "") {
            document.getElementById(currSquare).className = "pickedBG";
            setSquares = setSquares | Math.pow(2, i);      // 进行按位或运算，获取所选择的所有格子的2次幂之和
            // console.log("setSquares: ", setSquares);
        }
    }

    for (var i = 0; i < winners.length; i++) {
        if ((winners[i] & setSquares) === winners[i]) {    // 进行按位与运算，与12种获胜情况比较
            winningOption = i;
            // console.log("winningOption: ", winningOption);
        }
    }

    if (winningOption > -1) {
        for (var i = 0; i < 24; i++) {
            if (winners[winningOption] & Math.pow(2, i)) {
                currSquare = "square" + i;
                document.getElementById(currSquare).className = "winningBG";
            }
        }
    }
}
