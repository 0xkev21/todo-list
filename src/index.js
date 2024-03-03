import './style/style.scss';
import 'material-symbols/outlined.css';
import './modules/theme&sidebar';
import TodoMaker from './modules/todo-maker';
import ProjectMaker from './modules/project-maker';
import TodoFunctions from './modules/todo-functions';
import DomFunctions from './modules/dom-functions';

// DOM Elements
const todoListDiv = document.querySelector('.todo-lists');
const projectsDiv = document.querySelector('.my-projects-container');
// Inputs
const todoFormContainer = document.querySelector('.form-container');
const todoForm = document.querySelector('.new-todo-form');
const todoTitle = document.querySelector('#title');
const todoDescription = document.querySelector('#description');
const todoDate = document.querySelector('#date');
const todoTime = document.querySelector('#time');
const todoPriority = document.querySelector('#priority');
const todoNotes = document.querySelector('#notes');
const todoProject = document.querySelector('#project');
// Add Buttons
const openTodoFormBtn = document.querySelector('.open-todo-form-btn');
const addTodoBtn = document.querySelector('#add-todo-btn');
// Project Buttons
const homeBtn = document.querySelector('button[title="Home"]');
const myProjectsBtn = document.querySelector('button[title="My Projects"]');

const projects = [
    new ProjectMaker("Home", null),
];

// Current Page
const currentProjectPage = 0;

// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new TodoMaker(title, description, dueDate, priority, notes, done, project);
    const index = projects[project].list.length;
    projects[project].list.push(newTodo);
    DomFunctions.updateTodoList(projects, project);
}

// Remove Todo Item
function removeTodoItem (projectIndex, index) {
    TodoFunctions.deleteItem(projects[projectIndex].list, index);
    if(currentProjectPage !== 0) {
        DomFunctions.updateTodoList(projects, index);
    } else {
        DomFunctions.updateTodoList(projects, 0);
    }
}

// Add Project
function addProject (name, priority) {
    const newProject = new ProjectMaker(name, priority);
    projects.push(newProject);
    DomFunctions.updateProjectList(projects);
}

// Remove Project
function removeProject (index) {
    TodoFunctions.deleteItem(projects, index);
    DomFunctions.updateTodoList(projects, 0);
}


// TESTING
addTodoItem("Code", "<img src=''>", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Eat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 0);
//First Project
addProject("My Project 1", 1);
// Second Project
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        addProject("My Project 2", 2);
        resolve(2);
    }, 1000);
}
);
// Test Adding todo
addTodoItem("Sleep", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 1);
promise.then((result) => {
    addTodoItem("Repeat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, result);
});


// Initial display of to-do items for the first project
DomFunctions.updateTodoList(projects, 0);

// Event Listeners Form Open Up
openTodoFormBtn.addEventListener('click', () => {
    todoFormContainer.classList.add('show');
    todoFormContainer.addEventListener('click', () => {
        todoFormContainer.classList.remove('show');
    });
});
todoForm.addEventListener('click', (e) => {e.stopPropagation()});

// Add todo item on Form submit
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const dueDate = todoDate.value + "T" + todoTime.value;
    addTodoItem(todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, false, +todoProject.value);
})

// Navigate Projects
homeBtn.addEventListener('click', () => {
    DomFunctions.updateTodoList(projects, 0);
});
myProjectsBtn.addEventListener('click', () => {
    projectsDiv.classList.toggle('show');
});