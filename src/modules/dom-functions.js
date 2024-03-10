import sanitize from './sanitizer.js';
import projectFunctions from './project-functions.js';

const projectsDiv = document.querySelector('.my-projects-container');
const todoProject = document.querySelector('#project');
const todoListTitle = document.querySelector('.todo-list-title');

const todoTitle = document.querySelector('.det-todo-title');
const todoDescription = document.querySelector('.det-todo-description');
const todoDuedate = document.querySelector('.det-todo-duedate span');
const todoPriority = document.querySelector('.det-todo-priority span');
const todoNotes = document.querySelector('.det-todo-notes');
const priorities = ["Not Important", "Normal", "Important"]

// Todo DOM
function createTodo (todo, index) {
    const item = document.createElement('div');
    item.classList.add('todo-card-container');
    item.setAttribute('data-index', index);
    item.setAttribute('data-project', todo.project);
    item.setAttribute('data-done', todo.done);
    item.setAttribute('data-p', todo.priority);
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
        <span class="priority" title="Priority-${priorities[todo.priority - 1]}"></span>
    `;
    item.innerHTML = HTMLSnippet;
    return item;
};

function updateTodoList(array, index, title) {
    const todoListsDiv = document.querySelector('.todo-lists');
    todoListsDiv.innerHTML = '';
    todoListTitle.textContent = title;
    const fragment = document.createDocumentFragment();
    let todosToDisplay;
    if (index === 'allLists') {
        todosToDisplay = projectFunctions.getAllLists(array);
    } else if (index === 'todayList') {
        todosToDisplay = projectFunctions.getTodayList(array);
    } else if (index === 'upcomingList') {
        todosToDisplay = projectFunctions.getUpcomingList(array);
        console.log("hey");
    } else {
        todosToDisplay = [...array[index].list.map((todo, index) => (
            {todo, index}
        ))];
    }

    todosToDisplay.forEach(({todo, index}) => {
        fragment.appendChild(createTodo(todo, index));
    })
    todoListsDiv.appendChild(fragment);
}

// Project DOM
function createProject(project, index) {
    const button = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.classList.add('link-btn');
    editBtn.setAttribute('type', 'button');
    editBtn.setAttribute('title', 'Edit Project');
    const editSymbol = document.createElement('span');
    editSymbol.classList.add('material-symbols-outlined');
    editSymbol.textContent = 'edit';
    editBtn.appendChild(editSymbol);
    const title = document.createElement('span');
    title.textContent = project.title;
    const priority = document.createElement('span');
    priority.classList.add('priority');
    priority.setAttribute('title', `Priority-${priorities[project.priority - 1]}`);

    button.classList.add('link-btn', 'project-btn');
    button.setAttribute('type', 'button');
    button.setAttribute('data-index', index);
    button.setAttribute('title', project.title);
    button.setAttribute('data-p', project.priority)
    
    button.appendChild(title);
    button.appendChild(editBtn);
    button.appendChild(priority);

    const option = document.createElement('option');
    option.setAttribute('value', index);
    option.textContent = project.title;
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
    todoTitle.textContent = todo.title;
    todoDescription.textContent = todo.description;
    todoDuedate.textContent = todo.dueDate;
    todoPriority.textContent = todo.priority;
    todoNotes.textContent = todo.notes;
}

export default {createTodo, createProject, updateTodoList, updateProjectList, displayTodoDetails};