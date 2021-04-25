let BinaryOperations = {
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
    "%": (firstOperand, secondOperand) => firstOperand % secondOperand,
    "^": (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),
};

let UnaryOperations = {
    "sin": (firstOperand) => Math.sin(toRad(firstOperand)).toFixed(4),
    "cos": (firstOperand) => Math.cos(toRad(firstOperand)).toFixed(4),
    "tg": (firstOperand) => Math.tan(toRad(firstOperand)).toFixed(4),
    "ctg": (firstOperand) => 1 / Math.tan(toRad(firstOperand)).toFixed(4),
    "x!": (firstOperand) => Math.factorial(firstOperand),
};

let calc = document.getElementById("calc");
let display = document.getElementById("main_display");
let displaySwitches = document.getElementById("display_switches")
let history = document.getElementById("history");
let historyItems = document.getElementsByClassName("HistoryItem");
let historyArr = [];
let result = '';
let buffer = {
    operation: '',
    operationType: null,
    firstOperand: '',
    secondOperand: '',
    firstFloat: false,
    secondFloat: false,
    trigonometry: false,
};
let trigBool = false; // true - rad / false - deg

function updateDisplay() {
    if (buffer.trigonometry){
        displaySwitches.style.display = "flex";
    } else if ( displaySwitches.style.display !== "none"){
        displaySwitches.style.display = "none";
    }
    if (buffer.operationType === "Unary"){
        display.innerHTML = `${buffer.operation}(${buffer.firstOperand})`;
        if (buffer.operation === "x!") { display.innerHTML = `${buffer.firstOperand}!`; }
    } else
        display.innerHTML = buffer.firstOperand+buffer.operation+buffer.secondOperand;

    for( let i in historyArr){
        historyItems[i].style.display = "flex";
        historyItems[i].innerHTML = historyArr[i];
    }
}

function clearBuffer() {
    buffer = {
        operation: '',
        operationType: null,
        firstOperand: result,
        secondOperand: '',
        firstFloat: (buffer.firstOperand.toString().indexOf('.') !== -1),
        secondFloat: false,
        trigonometry: false,
    };
}

Math.factorial = function (n) {
    return n ? n * Math.factorial(n - 1) : 1;
}

function toRad(dr){
    return trigBool ? dr : dr*Math.PI/180 ;
}

function addToHistory( item ){
    if (historyArr.length === 3) historyArr.shift();
    historyArr.push(item);
}

calc.addEventListener("click", (event) => {
    const { target } = event;

    if (result === "ERROR!") { result = ''; buffer.firstOperand = ''; }
    if (target.classList.contains("Number")) {
        if (buffer.operation === '' || buffer.operationType === "Unary") {
            if (target.innerHTML === '.'){
                if (buffer.firstFloat){return false;}
                buffer.firstFloat = true;
            }
            buffer.firstOperand += target.innerHTML;
        } else {
            if (target.innerHTML === '.'){
                if (buffer.secondFloat){return false;}
                buffer.secondFloat = true;
            }
            buffer.secondOperand += target.innerHTML;
        }
    }
    if (buffer.firstOperand !== '') {
        if (target.classList.contains("Unary")) {
            buffer.operationType = "Unary";
            buffer.operation = target.innerHTML;
            if (buffer.operation !== 'x!')
                buffer.trigonometry = true;
        }
        if (target.classList.contains("Binary")) {
            buffer.trigonometry = false;
            buffer.operationType = "Binary";
            buffer.operation = target.innerHTML;
        }
    }
    if (target.classList.contains("Result")){
        if (buffer.firstOperand === '') { return false; }
        result = parseFloat(buffer.firstOperand);
        if (buffer.secondOperand !== '' && buffer.operationType === "Binary") {
            result = BinaryOperations[buffer.operation](parseFloat(buffer.firstOperand), parseFloat(buffer.secondOperand));
        } else if (buffer.operationType === "Unary") {
            result = UnaryOperations[buffer.operation](parseFloat(buffer.firstOperand));
        }
        if (buffer.firstOperand === '0.1' && buffer.secondOperand === '0.2') { result = result.toFixed(2)} // Проверка на 0.1+0.2 (0.1*0.2)
        if (result === Infinity || isNaN(result)) {
            result = "ERROR!"
        } // Проверка на неопределенности
        else if (result !== '') {
            if (result == 0) { result = 0; } // Проверка на нули( -0.00 )
            if (buffer.secondOperand === '' && buffer.operationType === "Binary") {
                return false;
            }
            addToHistory(`${display.innerHTML} = ${result}`);
        }
        clearBuffer();
    }
    if (target.parentElement.classList.contains("Switches")){
        trigBool = !trigBool;
        document.getElementById("deg").classList.toggle("Selected");
        document.getElementById("rad").classList.toggle("Selected");
    }
    if (target.innerHTML === "CE"){
        result = '';
        clearBuffer();
    }
    if (target.innerHTML === "History"){
        if (history.style.display === "none" && historyArr.length > 0) {
            history.style.display = "flex";
        }else {
            history.style.display = "none";
        }
    }
    updateDisplay();
});