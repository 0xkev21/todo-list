const button = document.querySelector('button[type="submit"]');
const date = document.querySelector('input[type="date"]');
const time = document.querySelector('input[type="time"]');

const dateArray = [];

button.addEventListener('click', function(e) {
    e.preventDefault();
    const dateString = date.value + "T" + time.value;
    console.log(dateString);
    const dateTime = createDate(dateString);
    dateArray.push(dateTime);
})

function createDate (dateString) {
    return new Date(dateString);
}

function sortDate(array) {
    return array.sort((a,b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
    });
}

const testArray = [
    "Mar 12 2012 10:00:00 AM",
    "Mar 8 2012 08:00:00 AM"
]

console.log(testArray);
console.log(sortDate(testArray));

const date1 = new Date('2024-03-11');
const date2 = new Date('2024-04-06T20:24:32');
const today = new Date();
console.log(date1.getTime() < today.getTime()); // Dated dued
console.log([date1.getFullYear(), pad2digits(date1.getMonth()+1), pad2digits(date1.getDate())].join('-'));

console.log(date1.getDate() === today.getDate()); // day
console.log(date2.getDate() === today.getDate());

console.log(date1.getDate());

// Pad 0s on day & month
function pad2digits(num) {
    return String(num).padStart(2, '0');
}

function getFormattedDate (date) {
    return [date.getFullYear(), pad2digits(today.getMonth() + 1), pad2digits(today.getDate())].join('-');
}

function filterToday(date) {
    let formattedDate = date.split('T')[0];
    const today = getFormattedDate(new Date());
    return formattedDate === today;
}

export default {filterToday};