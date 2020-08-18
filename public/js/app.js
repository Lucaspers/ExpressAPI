let fetchWeather = '/weather';

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');

const monthNames = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']
dateElement.textContent= new Date().getDate() + ', ' + monthNames[new Date().getMonth()].substring(0, 3);

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(search.value);
})