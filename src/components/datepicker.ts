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
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthIndex];
    }

    private addClassesToElement(element: HTMLElement, classes: string): void {
        if (!element || !classes) {
            return;
        }
        const classList = classes.split(' ');
        element.classList.add(...classList);
    }

    private createDatePicker(): HTMLElement {
        const datepicker = document.createElement('div');
        datepicker.classList.add('datepicker');
        const content = document.createElement('div');
        content.classList.add('content');
        content.appendChild(this.createHeader());
        datepicker.appendChild(content);
        return datepicker;
    }

    private createHeader(): HTMLElement {
        const header = document.createElement('div');
        header.classList.add('picker-header');
        const backButton = this.createButton('back');
        const nextButton = this.createButton('next');
        header.appendChild(backButton);
        header.appendChild(this.createPickerChooseDate());
        header.appendChild(nextButton);
        return header;
    }

    private createPickerChooseDate(): HTMLElement {
        const pickerChooseDate = document.createElement('div');
        this.addClassesToElement(pickerChooseDate, 'picker-choose-date');
        pickerChooseDate.appendChild(this.createPickerElement('month'));
        pickerChooseDate.appendChild(this.createPickerElement('year'));
        return pickerChooseDate;
    }

    private createPickerElement(context: string): HTMLElement {
        const element = document.createElement('div');
        this.addClassesToElement(element, `picker-btn pickerJS-${context} js-picker-element`);
        const h3Heading = document.createElement('h3');
        context === 'month' ? h3Heading.textContent = this.currentMonth : h3Heading.textContent = String(this.currentYear);
        element.appendChild(h3Heading);
        return element;
    }

    private createButton(direction: string = ''): HTMLButtonElement {
        const button = document.createElement('button');
        this.addClassesToElement(button, `picker-btn btn__circle js-btn-${direction}`);
        const img = document.createElement('img');
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

    public render(parentElement: HTMLElement): void {
        parentElement.appendChild(this.datePicker);
    }

    public goToNext = (type: string): void => {
        // Логика обновления данных при нажатии кнопки вперед
        // ...
    }

    public goToPrevious = (type: string): void => {
        // Логика обновления данных при нажатии кнопки назад
        // ...
    }
}
