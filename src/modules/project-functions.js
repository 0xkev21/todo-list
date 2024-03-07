import dateFunctions from './date.js';

function getAllLists (projects) {
    let arr = [];
    projects.forEach(project => {
        arr = [...arr, ...project.list.map((todo, index) => (
            {todo, index}
        ))];
    })
    return arr;
}

function getTodayList (projects) {
    const allLists = getAllLists(projects);
    const todayList = allLists.filter(({todo, index}) => {
        return dateFunctions.filterToday(todo.dueDate);
    })
    return todayList;
}

function getUpcomingList (projects) {
    const allLists = getAllLists(projects);
    const upcomingList = allLists.filter(({todo, index}) => {
        return dateFunctions.filterUpcoming(todo.dueDate);
    })
    return upcomingList;
}

export default {getAllLists, getTodayList, getUpcomingList};