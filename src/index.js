import './style.scss';
import 'material-symbols/outlined.css';
import './modules/theme';
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

const projects = [
    new ProjectMaker("Home", null),
];

const currentProjectPage = 1;

// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new TodoMaker(title, description, dueDate, priority, notes, done, project);
    const index = projects[project].list.length;
    projects[project].list.push(newTodo);
    todoListDiv.appendChild(DomFunctions.createTodo(newTodo, index));
}

// Add Project
function addProject (name, priority) {
    const newProject = new ProjectMaker(name, priority);
    const index = projects.length;
    projects.push(newProject);
    const newProjectBtn = DomFunctions.createProject(newProject, index);
    newProjectBtn.addEventListener('click', DomFunctions.updateTodoList(projects, index));
    projectsDiv.appendChild(newProjectBtn);
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

// Remove Project
function removeProject (index) {
    TodoFunctions.deleteItem(projects, index);
    DomFunctions.updateTodoList(projects, 0);
}

//First Project
addProject("My Project 1", 1);

// Test Adding todo
addTodoItem("Code", "<img src=''>", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Eat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Sleep", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 1);
addTodoItem("Repeat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 1);


// Initial display of to-do items for the first project
DomFunctions.updateTodoList(projects, 0);

// Test Removing todo
removeProject(1);

// Event Listeners
openTodoFormBtn.addEventListener('click', () => {
    todoFormContainer.classList.add('show');
    todoFormContainer.addEventListener('click', () => {
        todoFormContainer.classList.remove('show');
    });
});
todoForm.addEventListener('click', (e) => {e.stopPropagation()});

addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const dueDate = todoDate.value + "T" + todoTime.value;
    console.log(todoProject.value);
    addTodoItem(todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, false, +todoProject.value);
})