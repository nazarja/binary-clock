const digits = [
    '0000',
    '1000',
    '0100',
    '1100',
    '0010',
    '1010',
    '0110',
    '1110',
    '0001',
    '1001',
]

function padNumber(number) {
    return number.toString().length === 1 ? `0${number}` : number;   
}

function getTime() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        time: `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`,
    }
}

setInterval(() => {
    const time = getTime();
    document.querySelector('#digital-time').textContent  = time.time;
}, 1000)