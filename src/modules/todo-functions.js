import TodoMaker from './todo-maker';

function changeTitle(todo, newTitle) {
    todo.title = newTitle;
}
function changeDescription(todo, newDescription) {
    todo.description = newDescription;
}
function changeDueDate (todo, newDate) {
    todo.dueDate = newDate;
}
function changePriority (todo, newPriority) {
    todo.priority = newPriority;
}
function changeNotes (todo, newNotes) {
    todo.notes = newNotes;
}
function changeState (todo) {
    todo.done = todo.done ? false : true;
}
function deleteItem (array, index) {
    return array.splice(index, 1);
}

function editTodo(projects, todo, newTitle, newDes, newDueDate, newPriority, newNotes, newProject) {
    if(todo.projectIndex !== newProject) {
        const currentTodo = projects[todo.projectIndex].list[todo.index];
        projects[todo.projectIndex].list.splice(todo.index, 1);
        projects[newProject].list.push(new TodoMaker(newTitle, newDes, newDueDate, newPriority, newNotes, currentTodo.done, newProject));
    } else {
        const editingTodo = projects[todo.projectIndex].list[todo.index];
        changeTitle(editingTodo, newTitle);
        changeDescription(editingTodo, newDes);
        changeDueDate(editingTodo, newDueDate);
        changePriority(editingTodo, newPriority);
        changeNotes(editingTodo, newNotes);
    }
}

export default {changeTitle, changePriority, editTodo, changeState, deleteItem};