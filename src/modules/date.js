function createDate (dateString) {
    return new Date(dateString);
}

function sortDate(array) {
    return array.sort((a,b) => {
        const dateA = createDate(a);
        const dateB = createDate(b);
        return dateA - dateB;
    });
}

// Use dueDate.getTime() < today.getTime() for checking due

// Pad 0s on day & month
function pad2digits(num) {
    return String(num).padStart(2, '0');
}

function getFormattedDate (date) {
    return [date.getFullYear(), pad2digits(date.getMonth() + 1), pad2digits(date.getDate())].join('-');
}

function filterToday(date) {
    const formattedDate = date.split('T')[0];
    const today = getFormattedDate(new Date());
    return formattedDate === today;
}

function filterUpcoming(date) {
    let totalTimeFromDate;
    if(!date.split('T')[1]) {
        totalTimeFromDate = new Date(date + "00:00:00");
    } else {
        totalTimeFromDate = new Date(date).getTime();
    }
    const totalTimeFromToday = new Date().getTime();
    return totalTimeFromDate > totalTimeFromToday;
}

export default {getFormattedDate, filterToday, filterUpcoming};