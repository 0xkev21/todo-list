function getAllLists (projects) {
    const allLists = projects.reduce((acc, curr) => {
        return [...acc, ...curr.list]
    }, [])
    return allLists;
}

function getTodayLists (projects) {
    
}

export default {getAllLists};