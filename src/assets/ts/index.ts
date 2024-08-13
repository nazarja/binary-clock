
interface TimeData {
    hours: string[];
    minutes: string[];
    seconds: string[];
    digitalTime: string;
};

interface TimeUnits {
    hours: string[];
    minutes: string[];
    seconds: string[];
};

const binaryDigits: string[] = [
    '0000', '1000',
    '0100', '1100',
    '0010', '1010',
    '0110', '1110',
    '0001', '1001',
];

function query(q: string): HTMLElement | null {
    return document.querySelector(q);
}

function queryAll(q: string, parent?: HTMLElement): NodeListOf<HTMLElement> {
    return parent
        ? parent.querySelectorAll(q)
        : document.querySelectorAll(q);
};

function getAmPmLocalStorage(): boolean {
    const isAmPm: string | null = localStorage.getItem('isAmPm');
    if (isAmPm === null) return false
    else return JSON.parse(isAmPm);
};

function setAmPmListener(): void {
    const toggler: HTMLInputElement | null = query('#am-pm-toggler') as HTMLInputElement;

    if (toggler !== null) {
        toggler.checked = getAmPmLocalStorage();
        toggler.addEventListener('change', () => {
            const isChecked: boolean = toggler.checked;
            localStorage.setItem('isAmPm', isChecked.toString());
        });
    }
};

function setAmPmLocalStorage(): void {
    if (localStorage.getItem('isAmPm') === null)
        localStorage.setItem('isAmPm', 'false');
};

function padNumber(num: number): string {
    return num.toString().length === 1 ? `0${num}` : `${num}`;
}

function splitNumber(number: string): string[] {
    return number.toString().split('');
};

function getTime(): TimeData {
    const now: Date = new Date();

    const isAmPm: boolean = getAmPmLocalStorage();
    const amOrPm: string = now.getHours() < 12 ? 'am' : 'pm';

    const hours: string = isAmPm ? padNumber(now.getHours() % 12) : padNumber(now.getHours());
    const minutes: string = padNumber(now.getMinutes());
    const seconds: string = padNumber(now.getSeconds());
    const colons: string = '<span class="colons">:</span>';

    return {
        hours: splitNumber(hours),
        minutes: splitNumber(minutes),
        seconds: splitNumber(seconds),
        digitalTime: `${hours}${colons}${minutes}${colons}${seconds} ${isAmPm ? amOrPm : ''}`,
    }
};

function setTime({ hours, minutes, seconds }: TimeUnits): void {
    const data: string[][] = [hours, minutes, seconds];

    data.forEach((unit: string[], index: number) => {
        const section: HTMLElement = queryAll('.section')[index];

        unit.forEach((digit, index) => {
            const sectionIndex: number = parseInt(digit);
            const node: string = binaryDigits[sectionIndex];
            const column: HTMLElement = queryAll('.column', section)[index];
            const cells: NodeListOf<HTMLElement> = queryAll('.cell', column);

            for (let i = 0; i < cells.length; i++) {
                if (node[i] === '1')
                    cells[i].classList.add('active');
                else
                    cells[i].classList.remove('active');
            }
        });
    });
};

function setDigitalTime({ digitalTime }: { digitalTime: string }): void {
    const dateTimeElement: HTMLElement | null = query('#digital-time');
    const date: string[] = new Date().toString().split(' ');

    if (dateTimeElement !== null)
        dateTimeElement.innerHTML = `${date[0]}, ${date[2]} ${date[1]} | ${digitalTime}`;
};

((): void => {
    setAmPmLocalStorage();
    setAmPmListener();
    setInterval(() => {
        const data: TimeData = getTime();
        setTime(data);
        setDigitalTime(data);
    }, 1000)
})();