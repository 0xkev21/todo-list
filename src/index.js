import './style/style.scss';
import 'material-symbols/outlined.css';
import './modules/theme&sidebar';
import TodoMaker from './modules/todo-maker';
import ProjectMaker from './modules/project-maker';
import TodoFunctions from './modules/todo-functions';
import DomFunctions from './modules/dom-functions';
import todoFunctions from './modules/todo-functions';
import projectFunctions from './modules/project-functions';

// DOM Elements
const todoListDiv = document.querySelector('.todo-lists');
const projectsDiv = document.querySelector('.my-projects-container');
const todoDetailsDiv = document.querySelector('.details-card-container');
const todoDetails = document.querySelector('.details-card');
// Inputs
const todoFormContainer = document.querySelector('.form-container');
const todoForm = document.querySelector('.new-todo-form');
const projectFormContainer = document.querySelector('.project-form-container');
const projectForm = document.querySelector('.project-form');
// Todo Inputs
const todoTitle = document.querySelector('#title');
const todoDescription = document.querySelector('#description');
const todoDate = document.querySelector('#date');
const todoTime = document.querySelector('#time');
const todoPriority = document.querySelector('#priority');
const todoNotes = document.querySelector('#notes');
const todoProject = document.querySelector('#project');
// Project Inputs
const projectTitle = document.querySelector('#project-title');
const projectPriority = document.querySelector('#project-priority');

// Add Buttons
const openTodoFormBtn = document.querySelector('.open-todo-form-btn');
const addTodoBtn = document.querySelector('#add-todo-btn');
const openProjectFormBtns = document.querySelectorAll('.open-project-form-btn');
const addProjectBtn = document.querySelector('#add-project-btn');

// Project Buttons
const homeBtn = document.querySelector('button[title="Home"]');
const allListsBtn = document.querySelector('button[title="All Lists"]');
const todayListBtn = document.querySelector('button[title="Today"]');
const myProjectsBtn = document.querySelector('button[title="My Projects"]');

const projects = [
    new ProjectMaker("Home", null),
];
let currentPage = null;

// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new TodoMaker(title, description, dueDate, priority, notes, done, project);
    // const index = projects[project].list.length;
    projects[project].list.push(newTodo);
    DomFunctions.updateTodoList(projects, project, projects[project].name);
    todoFormContainer.classList.remove('show');
    refreshEventListeners();
}

// Changing todo item
function updateDoneStatus(projectIndex, todo) {
    TodoFunctions.changeState(projects[projectIndex].list[todo]);
    updatePage(projectIndex);
    refreshEventListeners();
}

// Remove Todo Item
function removeTodoItem (projectIndex, index) {
    TodoFunctions.deleteItem(projects[projectIndex].list, index);
    updatePage(projectIndex);
    todoDetailsDiv.classList.remove('show');
    refreshEventListeners();
}

function updatePage(projectIndex) {
    switch(currentPage){
        case 'allLists':
            DomFunctions.updateTodoList(projects, 'allLists', 'All Lists');
            break;
        case 'todayList':
            DomFunctions.updateTodoList(projects, 'todayList', 'Today List');
            break;
        default:
            DomFunctions.updateTodoList(projects, projectIndex, projects[projectIndex].name);
    }
}

// Add Project
function addProject (name, priority) {
    const newProject = new ProjectMaker(name, priority);
    projects.push(newProject);
    DomFunctions.updateProjectList(projects);
    // refreshEventListeners();
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            currentPage = null;
            DomFunctions.updateTodoList(projects, index, projects[index].name);
            refreshEventListeners();
        })
    })
    projectFormContainer.classList.remove('show');
    projectsDiv.classList.add('show');
    DomFunctions.updateTodoList(projects, projects.length - 1, projects[projects.length -1].name);
}

// Remove Project
function removeProject (index) {
    TodoFunctions.deleteItem(projects, index);
    DomFunctions.updateTodoList(projects, 0, projects[0].name);
}

// Event Listeners Todo Form Open Up
openTodoFormBtn.addEventListener('click', () => {
    todoFormContainer.classList.add('show');
    todoFormContainer.addEventListener('click', () => {
        todoFormContainer.classList.remove('show');
    });
});
todoForm.addEventListener('click', (e) => {e.stopPropagation()});

// Event Listener Project Form Open Up
openProjectFormBtns.forEach(btn => {
        btn.addEventListener('click', () => {
        projectFormContainer.classList.add('show');
        projectFormContainer.addEventListener('click', () => {
            projectFormContainer.classList.remove('show');
        });
    });
})
projectForm.addEventListener('click', (e) => {e.stopPropagation()});

// Add todo item on Form submit
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const dueDate = todoDate.value + "T" + todoTime.value;
    addTodoItem(todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, false, +todoProject.value);
});

// Add project on Form submit
addProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(projectTitle.value && projectPriority.value) {
        addProject(projectTitle.value, projectPriority.value);
    }
})

// Navigate Projects
homeBtn.addEventListener('click', () => {
    DomFunctions.updateTodoList(projects, 0, projects[0].name);
    refreshEventListeners();
    currentPage = null;
});
myProjectsBtn.addEventListener('click', () => {
    projectsDiv.classList.toggle('show');
});
allListsBtn.addEventListener('click', () => {
    DomFunctions.updateTodoList(projects, "allLists", "All Lists");
    currentPage = "allLists";
    refreshEventListeners();
})
todayListBtn.addEventListener('click', () => {
    DomFunctions.updateTodoList(projects, "todayList", "Today List");
    currentPage = "todayList";
    refreshEventListeners();
})

// Details Container
function showTodoDetails(projectIndex, index) {
    const todo = projects[projectIndex].list[index];
    DomFunctions.displayTodoDetails(todo);
    const todoEditBtn = document.querySelector('.todo-edit-btn');
    const todoDeleteBtn = document.querySelector('.todo-del-btn');
    todoDeleteBtn.onclick = function () {
        removeTodoItem(todo.project, index);
    };

    todoDetailsDiv.classList.add('show');
    todoDetailsDiv.addEventListener('click', () => {
        todoDetailsDiv.classList.remove('show');
    });
};
todoDetails.addEventListener('click', (e) => {e.stopPropagation()});

// Refresh Event Listeners
function refreshEventListeners() {
    const todoDoneBtns = document.querySelectorAll('.todo-done');
    const todoDetailsBtns = document.querySelectorAll('.todo-details');

    todoDoneBtns.forEach(doneBtn => {
        doneBtn.addEventListener('click', () => {
            const index = + doneBtn.parentNode.parentNode.getAttribute('data-index');
            const projectIndex = + doneBtn.parentNode.parentElement.getAttribute('data-project');
            updateDoneStatus(projectIndex, index);
        });
    });
    todoDetailsBtns.forEach(detailsBtn => {
        detailsBtn.addEventListener('click', () => {
            const index = + detailsBtn.parentNode.parentNode.getAttribute('data-index');
            const projectIndex = + detailsBtn.parentNode.parentElement.getAttribute('data-project');
            showTodoDetails(projectIndex, index);
        })
    })
}

// TESTING

addProject("My Project 1", 1);
addProject("My Project 2", 2);

addTodoItem("Code", "<img src=''>", "2024-03-03", 1, "blah blah blah", false, 0);
addTodoItem("Eat", "coding is beautiful", "2024-03-04", 1, "blah blah blah", false, 0);
addTodoItem("Sleep", "coding is beautiful", "2024-03-05", 1, "blah blah blah", false, 1);
addTodoItem("Repeat", "coding is beautiful", "2024-03-06", 1, "blah blah blah", false, 2);

// Start at Home Page 
DomFunctions.updateTodoList(projects, 0, projects[0].name);
refreshEventListeners();