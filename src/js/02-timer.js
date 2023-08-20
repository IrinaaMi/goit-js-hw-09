import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const valueElements = document.querySelectorAll('.value');
const labelElements = document.querySelectorAll('.label');
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            const timeDifference = selectedDate - currentDate;
            addLeadingZero(timeDifference);

            startBtn.disabled = false;
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
        }
    },
};
timer.style.display = 'flex';
timer.style.justifyContent = 'center';
timer.style.alignItems = 'center';
timer.style.fontFamily = 'Arial, sans-serif';
timer.style.fontSize = '20px';

valueElements.forEach(field => {
    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.alignItems = 'center';
    field.style.margin = '0 10px';
});

valueElements.forEach(value => {
    value.style.fontWeight = 'bold';
    value.style.fontSize = '24px';
});

labelElements.forEach(label => {
    label.style.fontSize = '12px';
});
const flatpickrInstance = flatpickr(datetimePicker, options);

function addLeadingZero(ms) {
    const time = convertMs(ms);
    valueElements[0].textContent = String(time.days).padStart(2, '0');
    valueElements[1].textContent = String(time.hours).padStart(2, '0');
    valueElements[2].textContent = String(time.minutes).padStart(2, '0');
    valueElements[3].textContent = String(time.seconds).padStart(2, '0');
}

startBtn.addEventListener('click', function() {
    const selectedDate = flatpickrInstance.selectedDates[0];
    const currentDate = new Date();

    if (selectedDate > currentDate) {
        const timeDifference = selectedDate - currentDate;
        addLeadingZero(timeDifference);

        const countdownInterval = setInterval(function() {
            const updatedCurrentDate = new Date();
            const timeRemaining = selectedDate - updatedCurrentDate;

            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                addLeadingZero(0);
                timer.textContent = 'Countdown completed!';
            } else {
                addLeadingZero(timeRemaining);
            }
        }, 1000);
    }
});