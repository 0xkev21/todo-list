import sanitize from './sanitizer.js';

const projectsDiv = document.querySelector('.my-projects-container');
const todoProject = document.querySelector('#project');
const todoListTitle = document.querySelector('.todo-list-title');

// Todo DOM
function createTodo (todo, index) {
    const item = document.createElement('div');
    item.classList.add('todo-card-container');
    item.setAttribute('data-index', index);
    item.setAttribute('data-done', todo.done);
    const HTMLSnippet = `
        <div class="title-description-container">
            <h4 class="todo-title">
            ${sanitize(todo.title)}
            </h4>
            <p class="todo-description">
                ${sanitize(todo.description)}
            </p>
        </div>
        <div class="todo-btns-container">
            <button class="todo-done btn-circle" title=${todo.done? "Done": "Todo"}><span class="material-symbols-outlined">${todo.done? "check_circle": "radio_button_unchecked"}</span></button>
            <button class="todo-details btn-circle" title="More Details"><span class="material-symbols-outlined">summarize</span></button>
        </div>
    `;
    item.innerHTML = HTMLSnippet;
    return item;
};

function updateTodoList(array, index) {
    todoListTitle.textContent = array[index].name;
    const todoListsDiv = document.querySelector('.todo-lists');
    todoListsDiv.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < array[index].list.length; i++) {
        fragment.appendChild(createTodo(array[index].list[i], i));
    }
    todoListsDiv.appendChild(fragment);
}

// Project DOM
function createProject(project, index) {
    const button = document.createElement('button');
    button.classList.add('link-btn', 'project-btn');
    button.setAttribute('type', 'button');
    button.setAttribute('data-index', index);
    button.setAttribute('title', project.name);
    button.textContent = project.name;
    const option = document.createElement('option');
    option.setAttribute('value', index);
    option.textContent = project.name;
    return {button: button, option: option};
}

function updateProjectList(array) {
    projectsDiv.innerHTML = '';
    todoProject.innerHTML = '<option value="0" selected>Home</option>';
    for(let i = 1; i < array.length; i++) {
        const projectObj = createProject(array[i], i);
        projectsDiv.appendChild(projectObj.button);
        todoProject.appendChild(projectObj.option);
    }
}

// Todo Details Page
function displayTodoDetails(todo) {
    const todoTitle = document.querySelector('det-todo-title');
    const todoDescription = document.querySelector('det-todo-description');
    const todoDuedate = document.querySelector('det-todo-duedate span');
    const todoPriority = document.querySelector('det-todo-priority span');
    const todoNotes = document.querySelector('det-todo-notes');
    const todoEditBtn = document.querySelector('.todo-edit-btn');

    todoTitle.textContent = todo.title;
    todoDescription.textContent = todo.description;
    todoDuedate.textContent = todo.dueDate;
    todoPriority.textContent = todo.priority;
    todoNotes.textContent = todo.notes;
}

export default {createTodo, createProject, updateTodoList, updateProjectList, displayTodoDetails};