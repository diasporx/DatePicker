import {Weeks} from "./utils/weeks";

export class DatePicker {
    private readonly datePicker: HTMLElement;
    public currentDate: Date;
    public currentMonth: string;
    public currentYear: number;

    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.getMonthName(this.currentDate.getMonth());
        this.currentYear = this.currentDate.getFullYear();
        this.datePicker = this.createDatePicker();
    }

    private getMonthName(monthIndex: number): string {
        const months:string[] = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthIndex];
    }

    private addClassesToElement(element: HTMLElement, classes: string): void {
        if (!element || !classes) {
            return;
        }
        const classList:string[] = classes.split(' ');
        element.classList.add(...classList);
    }

    private createDatePicker(): HTMLElement {
        const datepicker:HTMLDivElement = document.createElement('div');
        datepicker.classList.add('datepicker');
        const content:HTMLDivElement = document.createElement('div');
        content.classList.add('content');

        content.appendChild(this.createHeader());
        content.appendChild(this.createCalendarForCurrentMonth());

        datepicker.appendChild(content);
        return datepicker;
    }

    // Header
    private createHeader(): HTMLElement {
        const header:HTMLDivElement = document.createElement('div');
        header.classList.add('picker-header');
        const backButton:HTMLButtonElement = this.createButton('back');
        const nextButton:HTMLButtonElement = this.createButton('next');
        header.appendChild(backButton);
        header.appendChild(this.createPickerChooseDate());
        header.appendChild(nextButton);
        return header;
    }
    private createPickerChooseDate(): HTMLElement {
        const pickerChooseDate:HTMLDivElement = document.createElement('div');
        this.addClassesToElement(pickerChooseDate, 'picker-choose-date');
        pickerChooseDate.appendChild(this.createPickerElement('month'));
        pickerChooseDate.appendChild(this.createPickerElement('year'));
        return pickerChooseDate;
    }
    private createPickerElement(context: string): HTMLElement {
        const element:HTMLDivElement = document.createElement('div');
        this.addClassesToElement(element, `picker-btn pickerJS-${context} js-picker-element`);
        const h3Heading:HTMLHeadingElement = document.createElement('h3');
        context === 'month' ? h3Heading.textContent = this.currentMonth : h3Heading.textContent = String(this.currentYear);
        element.appendChild(h3Heading);
        return element;
    }
    private createButton(direction: string = ''): HTMLButtonElement {
        const button:HTMLButtonElement = document.createElement('button');
        this.addClassesToElement(button, `picker-btn btn__circle js-btn-${direction}`);
        const img:HTMLImageElement = document.createElement('img');
        if (direction === 'back') {
            img.src = '../src/img/back-arrow.png';
            img.alt = 'back-arrow';
            button.appendChild(img);
        } else if (direction === 'next') {
            img.src = '../src/img/next-arrow.png';
            img.alt = 'next-arrow';
            button.appendChild(img);
        }
        return button;
    }
    // Header

    //Calendar
    private createCalendarForCurrentMonth(): HTMLElement {
        const currentDate:Date = new Date();
        const currentYear:number = currentDate.getFullYear();
        const currentMonth:number = currentDate.getMonth();
        const daysInMonth:number = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayIndex:number = new Date(currentYear, currentMonth, 1).getDay();

        const pickerMain: HTMLElement = document.createElement('div');
        pickerMain.classList.add('picker-main');

        const calendar: HTMLElement = document.createElement('div');
        calendar.classList.add('calendar');

        for(let i:number = 0; Weeks.length > i; i++) {
            calendar.appendChild(this.createWeekHeaderElement(Weeks[i].min_value));
        }

        const calendarDays:HTMLElement[] = this.createCalendarDaysElement(firstDayIndex, daysInMonth);
        calendarDays.forEach((day: any):void => {
            calendar.appendChild(day);
        });

        pickerMain.appendChild(calendar);
        return pickerMain;
    }

    private createCalendarDaysElement(startDay: number, totalDays: number): HTMLElement[] {
        const calendarDays: HTMLElement[] = [];

        // Generating days of the previous month
        const currentDate:Date = new Date();
        const currentYear:number = currentDate.getFullYear();
        const currentMonth:number = currentDate.getMonth();
        const previousMonthDays: number = new Date(currentYear, Number(currentMonth), 0).getDate();
        console.log(previousMonthDays);

        for (let i: number = startDay - 1; i > 0; i--) {
            const dayElement: HTMLDivElement = document.createElement('div');
            dayElement.classList.add('day', 'prev-month');
            dayElement.textContent = `${previousMonthDays - i + 1}`;
            calendarDays.push(dayElement);
        }

        // Generating days of the current month
        for (let i:number = 1; i <= totalDays; i++) {
            const dayElement: HTMLDivElement = document.createElement('div');
            dayElement.classList.add('day', 'current-month');
            dayElement.textContent = `${i}`;
            calendarDays.push(dayElement);
        }

        // Generating days of the next month (if needed)
        const totalSpaces:number = 42 - calendarDays.length; // Assuming a 6-row calendar
        for (let i:number = 1; i <= totalSpaces; i++) {
            const dayElement: HTMLDivElement = document.createElement('div');
            dayElement.classList.add('day', 'next-month');
            dayElement.textContent = `${i}`;
            calendarDays.push(dayElement);
        }

        return calendarDays.slice(0, 35);
    }

    private createWeekHeaderElement(weekName:string):HTMLElement {
        const elementWeek:HTMLDivElement = document.createElement('div');
        this.addClassesToElement(elementWeek, `day-of-week its-${weekName}`);
        elementWeek.id=`${weekName}-datepicker`;
        elementWeek.innerHTML=weekName;
        return elementWeek;
    }

    public render(parentElement: HTMLElement): void {
        parentElement.appendChild(this.datePicker);
    }
}
