import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const pickedDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');



startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
        Notiflix.Notify.warning("Please choose a date in the future");
      }
      else {
        startBtn.disabled = false;
      }
    },
  };


flatpickr(pickedDate, options);



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


const counting = () => {

  // console.log(pickedDate.value);
const numberInMs = new Date(pickedDate.value) - new Date();
const convertTime = convertMs(numberInMs);
  // console.log(convertTime.days);
  
  const addLeadingZero = (value) => {return value.toString().padStart(2,'0')};

days.textContent = addLeadingZero(convertTime.days)
  // days.textContent = convertTime.days.toString().padStart(2,'0');
  hours.textContent = addLeadingZero(convertTime.hours)
  minutes.textContent = addLeadingZero(convertTime.minutes);
  seconds.textContent = addLeadingZero(convertTime.seconds);
  }



startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
setInterval(counting, 1000)})


