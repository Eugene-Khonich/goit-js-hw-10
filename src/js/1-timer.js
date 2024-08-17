import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const datePicker = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minValue = document.querySelector('[data-minutes]');
const secValue = document.querySelector('[data-seconds]');

let userSelectedDate = [];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateCheck(selectedDates);
  },
};

flatpickr(datePicker, options);

const dateCheck = selectedDates => {
  if (Date.now() < selectedDates[0].getTime()) {
    userSelectedDate = selectedDates[0];
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', '');
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
  }
};

const startBtn = () => {
  const userSelectedDateInMs = userSelectedDate.getTime();
  btn.setAttribute('disabled', '');
  datePicker.setAttribute('disabled', '');

  const interval = setInterval(() => {
    if (userSelectedDateInMs >= Date.now()) {
      const convertMs = ms => {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const days = addLeadingZero(Math.floor(ms / day));
        const hours = addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = addLeadingZero(
          Math.floor(((ms % day) % hour) / minute)
        );
        const seconds = addLeadingZero(
          Math.floor((((ms % day) % hour) % minute) / second)
        );
        daysValue.textContent = days;
        hoursValue.textContent = hours;
        minValue.textContent = minutes;
        secValue.textContent = seconds;
        return { days, hours, minutes, seconds };
      };
      convertMs(userSelectedDateInMs - Date.now());
    } else {
      clearInterval(interval);
      datePicker.removeAttribute('disabled');
    }
  }, 1000);
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

btn.addEventListener('click', startBtn);
