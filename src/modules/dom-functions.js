import sanitize from './sanitizer.js';


function createTodo (todo, index) {
    const item = document.createElement('div');
    item.classList.add('todo-card-container');
    item.setAttribute('data-index', index);
    
    const HTMLSnippet = `
        <h4 class="todo-title">
        ${sanitize(todo.title)}
        </h4>
        <p class="todo-description">
            ${sanitize(todo.description)}
        </p>
        <div class="done">
            <span class="material-symbols-outlined">${todo.done ? "checked_circle" : "radio_button_unchecked"}</span>
        </div>
    `;
    item.innerHTML = HTMLSnippet;
    return item;
};

function updateTodoList(array, index) {
    const todoListsDiv = document.querySelector('.todo-lists');
    todoListsDiv.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < array[index].list.length; i++) {
        fragment.appendChild(createTodo(array[index].list[i], i));
    }
    todoListsDiv.appendChild(fragment);
}

function createProject(project, index) {
    // const newProject = document.createElement('div');
    // const HTMLSnippet = `
    //     <button class="link-btn project-btn" type="button" data-index="${index}" onclick="displayTodoLists(${index})">${sanitize(project.name)}</button>
    // `;
    const button = document.createElement('button');
    button.classList.add('link-btn', 'project-btn');
    button.setAttribute('type', 'button');
    button.setAttribute('data-index', index);
    button.textContent = project.name;
    return button;
}

export default {createTodo, createProject, updateTodoList};