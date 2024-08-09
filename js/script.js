let runningTotal = 0;
let buffer = "0";  // O buffer armazena o valor que está atualmente na tela
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {  // Se o valor não for um número
        handleSymbol(value);  // Trata como um símbolo (operador, C, =, etc.)
    } else {
        handleNumber(value);  // Trata como um número
    }
    screen.innerText = buffer;  // Atualiza a tela da calculadora
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));  // Realiza a operação com o número atual
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;  // Substitui o "0" inicial pelo número clicado
    } else {
        buffer += numberString;  // Adiciona o número ao buffer
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {  // Verifica se um botão foi clicado
            buttonClick(event.target.innerText);
        }
    });
}

init();
