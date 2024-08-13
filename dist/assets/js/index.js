"use strict";
;
;
var binaryDigits = [
    '0000', '1000',
    '0100', '1100',
    '0010', '1010',
    '0110', '1110',
    '0001', '1001',
];
function query(q) {
    return document.querySelector(q);
}
function queryAll(q, parent) {
    return parent
        ? parent.querySelectorAll(q)
        : document.querySelectorAll(q);
}
;
function getAmPmLocalStorage() {
    var isAmPm = localStorage.getItem('isAmPm');
    if (isAmPm === null)
        return false;
    else
        return JSON.parse(isAmPm);
}
;
function setAmPmListener() {
    var toggler = query('#am-pm-toggler');
    if (toggler !== null) {
        toggler.checked = getAmPmLocalStorage();
        toggler.addEventListener('change', function () {
            var isChecked = toggler.checked;
            localStorage.setItem('isAmPm', isChecked.toString());
        });
    }
}
;
function setAmPmLocalStorage() {
    if (localStorage.getItem('isAmPm') === null)
        localStorage.setItem('isAmPm', 'false');
}
;
function padNumber(num) {
    return num.toString().length === 1 ? "0".concat(num) : "".concat(num);
}
function splitNumber(number) {
    return number.toString().split('');
}
;
function getTime() {
    var now = new Date();
    var isAmPm = getAmPmLocalStorage();
    var amOrPm = now.getHours() < 12 ? 'am' : 'pm';
    var hours = isAmPm ? padNumber(now.getHours() % 12) : padNumber(now.getHours());
    var minutes = padNumber(now.getMinutes());
    var seconds = padNumber(now.getSeconds());
    var colons = '<span class="colons">:</span>';
    return {
        hours: splitNumber(hours),
        minutes: splitNumber(minutes),
        seconds: splitNumber(seconds),
        digitalTime: "".concat(hours).concat(colons).concat(minutes).concat(colons).concat(seconds, " ").concat(isAmPm ? amOrPm : ''),
    };
}
;
function setTime(_a) {
    var hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
    var data = [hours, minutes, seconds];
    data.forEach(function (unit, index) {
        var section = queryAll('.section')[index];
        unit.forEach(function (digit, index) {
            var sectionIndex = parseInt(digit);
            var node = binaryDigits[sectionIndex];
            var column = queryAll('.column', section)[index];
            var cells = queryAll('.cell', column);
            for (var i = 0; i < cells.length; i++) {
                if (node[i] === '1')
                    cells[i].classList.add('active');
                else
                    cells[i].classList.remove('active');
            }
        });
    });
}
;
function setDigitalTime(_a) {
    var digitalTime = _a.digitalTime;
    var dateTimeElement = query('#digital-time');
    var date = new Date().toString().split(' ');
    if (dateTimeElement !== null)
        dateTimeElement.innerHTML = "".concat(date[0], ", ").concat(date[2], " ").concat(date[1], " | ").concat(digitalTime);
}
;
(function () {
    setAmPmLocalStorage();
    setAmPmListener();
    setInterval(function () {
        var data = getTime();
        setTime(data);
        setDigitalTime(data);
    }, 1000);
})();
