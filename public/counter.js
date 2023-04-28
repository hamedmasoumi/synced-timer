const socket = io();
const counterDisplay = document.getElementById('counterDisplay');
let countdownInterval;


let counter = 0;
socket.on('counterValue', (value) => {
    counter = value;
    // counterDisplay.textContent = time;
    startCounter();
});

function setCounter(value) {
    let counterValue;
    
    if (typeof value === 'number') {
        counterValue = value;
    } else {
        const counterInput = document.getElementById('counter');
        counterValue = parseInt(counterInput.value, 10);
    }

    if (isNaN(counterValue) || counterValue < 0) {
        alert('Please enter a valid number.');
        return;
    }

    socket.emit('setCounter', counterValue);
}

function startCounter() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        const currentValue = counter;

        if (currentValue <= 0) {
            clearInterval(countdownInterval);
        } else {
            let newValue = currentValue - 1;
            
            if (newValue == 0) newValue = '🤫';
            else if (newValue < 10) newValue = `0${newValue}`;
            counterDisplay.textContent = newValue;
            socket.emit('decrementCounter');
        }
    }, 1000);
}
