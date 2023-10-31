import "./styles/main.scss";
import {DatePicker} from './components/datepicker';
import {isLeapYear, Months} from "./components/utils/months";

let myDatePicker:DatePicker;
const initializeDatepicker = ():void => {
    const parentElement:HTMLElement = document.body; // Или другой родительский элемент
    myDatePicker = new DatePicker();
    myDatePicker.render(parentElement);
}
document.addEventListener('DOMContentLoaded', ():void => {
    initializeDatepicker();

    const pickerElements:NodeListOf<any> = document.querySelectorAll('.js-picker-element');
    const btnNext:Element|null = document.querySelector('.js-btn-next');
    const btnBack:Element|null = document.querySelector('.js-btn-back');

    let selectedPickerElement: string | null; // Выбранный елемент (месяц или год)
    let selectedMonth: string = myDatePicker.currentMonth;

    /**
     * Логика кнопки вперед
     */
    const updateMonth = (increment:number):void => {
        const monthsArray:string[] = Object.keys(Months);
        const currentMonthIndex:number = monthsArray.indexOf(selectedMonth);

        if (currentMonthIndex !== -1) {
            let nextMonthIndex:number = (currentMonthIndex + increment) % monthsArray.length;
            if (nextMonthIndex < 0) {
                nextMonthIndex = monthsArray.length - 1;
            }

            const nextMonth:string = monthsArray[nextMonthIndex];
            selectedMonth = nextMonth;

            const element:Element|null = document.querySelector('.pickerJS-month');
            if (element) {
                const h3Element:HTMLHeadingElement|null = element.querySelector('h3');
                if (h3Element) {
                    h3Element.textContent = nextMonth;
                }
            }

            if ((selectedMonth === 'January' && increment === 1) || (selectedMonth === 'December' && increment === -1)) {
                updateYear(increment);
            }
        }
    };

    const updateYear = (increment: number): void => {
        const h3Element: HTMLHeadingElement | null = document.querySelector('.pickerJS-year h3') as HTMLHeadingElement | null;
        if (h3Element) {
            let thisYear: number | null = Number(h3Element.textContent);
            thisYear += increment;
            isLeapYear(thisYear) ? Months['February'] = 29 : Months['February'] = 28;
            h3Element.textContent = String(thisYear);
        }
    };

    if (btnNext) {
        btnNext.addEventListener('click', ():void => {
            selectedPickerElement === 'year' ? updateYear(1) : null;
            selectedPickerElement === 'month' ? updateMonth(1) : null;
        });
    }

    if (btnBack) {
        btnBack.addEventListener('click', ():void => {
            selectedPickerElement === 'year' ? updateYear(-1) : null;
            selectedPickerElement === 'month' ? updateMonth(-1) : null;
        });
    }


    pickerElements.forEach((element:Element):void => {
        element.addEventListener('click', ():void => {
            const isSelected:boolean = element.classList.contains('js-picker-element-selected');
            if (!isSelected) {
                pickerElements.forEach((el:Element):void => {
                    el.classList.remove('js-picker-element-selected');
                });
                element.classList.add('js-picker-element-selected');

                const allClassesElement:string[] = Array.from(element.classList);
                const combinedClasses: string = allClassesElement.join(' ');

                selectedPickerElement = extractClassName(combinedClasses);
            }
        });
    });

    const extractClassName = (input: string): string | null => {
        const regex:RegExp = /pickerJS-(\w+)/;
        const match:RegExpMatchArray|null = input.match(regex);
        if (match) {return match[1];}
        return null;
    }
});


