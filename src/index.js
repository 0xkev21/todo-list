import './style.scss';
import 'material-symbols/outlined.css';
import './modules/theme';
import TodoMaker from './modules/todo-maker';
import ProjectMaker from './modules/project-maker';
import TodoFunctions from './modules/todo-functions';
import DomFunctions from './modules/dom-functions';

const todoListsContainer = document.querySelector('.todo-lists');
const myProjectsContainer = document.querySelector('.my-projects-container');

const projects = [
    new ProjectMaker("Home", null),
];

const currentProjectPage = 1;

const todoListDiv = document.querySelector('.todo-lists');
const projectsDiv = document.querySelector('.my-projects-container');

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
    projectsDiv.appendChild(DomFunctions.createProject(newProject, index));
}

// Remove Todo Item
function removeTodoItem (projectIndex, index) {
    TodoFunctions.deleteItem(projects[projectIndex].list, index);
    if(currentProjectPage !== 0) {
        displayTodoLists(projectIndex);
    } else {
        displayTodoLists(0);
    }
}

// Remove Project
function removeProject (index) {
    TodoFunctions.deleteItem(projects, index);
    displayTodoLists(0);
}


// Update todo list dom
function displayTodoLists(index) {
    DomFunctions.updateTodoList(projects[index].list);
}

//First Project
addProject("My Project 1", 1);

addTodoItem("Code", "<img src=''>", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Eat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Sleep", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 1);
addTodoItem("Repeat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 1);


// Initial display of to-do items for the first project
displayTodoLists(1);

removeProject(1);