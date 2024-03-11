// Dependencies
import 'material-symbols/outlined.css';
import './style/style.scss';
import './modules/theme&sidebar';
import TodoMaker from './modules/todo-maker';
import ProjectMaker from './modules/project-maker';
import TodoFunctions from './modules/todo-functions';
import DomFunctions from './modules/dom-functions';
import ProjectFunctions from './modules/project-functions';
import DateFunctions from './modules/date.js';


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

// Form Buttons
const openTodoFormBtn = document.querySelector('.open-todo-form-btn');
const addTodoBtn = document.querySelector('#add-todo-btn');
const openProjectFormBtns = document.querySelectorAll('.open-project-form-btn');
const addProjectBtn = document.querySelector('#add-project-btn');
const cancelBtns = document.querySelectorAll('.btn-cancel');
const removeProjectBtn = projectForm.querySelector('.btn-circle');

// Project Buttons
const homeBtn = document.querySelector('button[title="Home"]');
const allListsBtn = document.querySelector('button[title="All Lists"]');
const todayListBtn = document.querySelector('button[title="Today"]');
const upcomingListBtn = document.querySelector('button[title="Upcoming"]');
const myProjectsBtn = document.querySelector('button[title="My Projects"]');

// Initialize variables
let projects = [];
let currentPage = null;
let editingTodo = false;
let editingProject = false;


// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new TodoMaker(title, description, dueDate, priority, notes, done, project);
    projects[project].list.push(newTodo);
    updatePage(project);
}


// Changing todo done status
function updateDoneStatus(projectIndex, todo) {
    TodoFunctions.changeState(projects[projectIndex].list[todo]);
    updatePage(projectIndex);
}


// Remove Todo Item
function removeTodoItem (projectIndex, index) {
    TodoFunctions.deleteItem(projects[projectIndex].list, index);
    updatePage(projectIndex);
    todoDetailsDiv.classList.remove('show');
}

// Add Project
function addProject (name, priority) {
    const newProject = new ProjectMaker(name, priority);
    projects.push(newProject);
    updateProjects();
    projectsDiv.classList.add('show');
    updatePage(projects.length - 1);
}

// Remove Project
function removeProject (index) {
    TodoFunctions.deleteItem(projects, index);
    updateProjects();
    if(currentPage) updatePage(0);
    updateData();
}

// Update Page based on currentPage
function updatePage(projectIndex) {
    switch(currentPage){
        case 'allLists':
            DomFunctions.updateTodoList(projects, 'allLists', 'All Lists');
            break;
        case 'todayList':
            DomFunctions.updateTodoList(projects, 'todayList', 'Today List');
            break;
        case 'upcomingList':
            DomFunctions.updateTodoList(projects, 'upcomingList', 'Upcoming List');
            break;
        default:
            DomFunctions.updateTodoList(projects, projectIndex, projects[projectIndex].title);
    }
    refreshEventListeners();
    updateData();
}

function updateProjects() {
    DomFunctions.updateProjectList(projects);
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach(btn => {
        const index = btn.getAttribute('data-index');
        btn.addEventListener('click', () => {
            currentPage = null;
            updatePage(index);
            closeSidebar();
        });
        const projectEditBtn = btn.querySelector('.link-btn');
        projectEditBtn.addEventListener('click', (e) => {
            editingProject = index;
            e.stopPropagation();
            showProjectEditForm(index);
        })
    });
    
    projectFormContainer.classList.remove('show');
}

// Toggle Todo Form Open Up
openTodoFormBtn.addEventListener('click', () => {
    addTodoBtn.textContent = 'Add Todo';
    todoFormContainer.classList.add('show');
});
todoFormContainer.addEventListener('click', () => {
    closeForm(todoForm);
});
todoForm.addEventListener('click', (e) => {e.stopPropagation()});


// Toggle Project Form Open Up
openProjectFormBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        addProjectBtn.textContent = 'Add Project';
        projectFormContainer.classList.add('show');
    });
})
projectFormContainer.addEventListener('click', () => {
    closeForm(projectForm);
});
projectForm.addEventListener('click', (e) => {e.stopPropagation()});

// cancel buttons
cancelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeForm(btn.parentNode.parentNode);
    })
})

// Edit Todo Form
function showEditForm(projectIndex, index) {
    editingTodo = {projectIndex, index};
    const todo = projects[projectIndex].list[index];
    todoTitle.value = todo.title;
    todoDescription.value = todo.description;
    todoDate.value = todo.dueDate.split('T')[0];
    todoTime.value = todo.dueDate.split('T')[1];
    todoPriority.value = todo.priority;
    todoNotes.value = todo.notes;
    todoProject.value = todo.project;
    todoFormContainer.classList.add('show');
    todoDetailsDiv.classList.remove('show');
    addTodoBtn.textContent = 'Save Changes';
}

// Edit ProjectForm
function showProjectEditForm(projectIndex) {
    const project = projects[projectIndex];
    projectTitle.value = project.title;
    projectPriority.value = project.priority;
    projectFormContainer.classList.add('show');
    projectForm.setAttribute('data-index', projectIndex);
    addProjectBtn.textContent = 'Save Changes';
    removeProjectBtn.classList.add('show');
}

function closeForm(form) {
    editingTodo = false;
    editingProject = false;
    form.reset();
    form.parentNode.classList.remove('show');
    removeProjectBtn.classList.remove('show');
}

// Add/Edit todo item on Form submit
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(todoForm.checkValidity()) {
        const dueDate = todoDate.value + 'T' + todoTime.value;
        if(editingTodo) {
            TodoFunctions.editTodo(projects, editingTodo, todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, +todoProject.value);
        } else {
            addTodoItem(todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, false, +todoProject.value);
        }
        updatePage(todoProject.value);
        closeForm(todoForm);
        closeSidebar();
    } else {
        todoForm.reportValidity();
    }
});

// Add/Edit project on Form submit
addProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(projectForm.checkValidity()) {
        if(editingProject) {
            ProjectFunctions.editProject(projects[editingProject], projectTitle.value, projectPriority.value);
        } else if(projectTitle.value && projectPriority.value) {
            addProject(projectTitle.value, projectPriority.value);
        }
        updateProjects();
        closeForm(projectForm);
        closeSidebar();
        updateData();
    } else {
        projectForm.reportValidity();
    }
})

// Remove Project
removeProjectBtn.addEventListener('click', function() {
    const index = + this.parentNode.getAttribute('data-index');
    removeProject(index);
    updateData();
})

// Navigate Projects
homeBtn.addEventListener('click', () => {
    currentPage = null;
    updatePage(0);
    closeSidebar();
});
myProjectsBtn.addEventListener('click', () => {
    projectsDiv.classList.toggle('show');
});
allListsBtn.addEventListener('click', () => {
    currentPage = 'allLists';
    updatePage();
    closeSidebar();
})
todayListBtn.addEventListener('click', () => {
    currentPage = 'todayList';
    updatePage();
    closeSidebar();
})
upcomingListBtn.addEventListener('click', () => {
    currentPage = 'upcomingList';
    updatePage();
    closeSidebar();
})

// Details Container
function showTodoDetails(projectIndex, index) {
    const todo = projects[projectIndex].list[index];
    DomFunctions.displayTodoDetails(todo);
    const todoEditBtn = document.querySelector('.todo-edit-btn');
    const todoDeleteBtn = document.querySelector('.todo-del-btn');
    todoDeleteBtn.onclick = () => {
        removeTodoItem(todo.project, index);
    };
    todoEditBtn.addEventListener('click', () => {
        showEditForm(projectIndex, index);
    })
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

const smallScreen = window.matchMedia("(max-width: 760px)");
function closeSidebar() {
    if(smallScreen.matches) {
        document.body.classList.remove('show-side-bar');
    }
}

function getData() {
    const projectsString = localStorage.getItem('my-projects');
    const today = new Date();
    const nextWeek = new Date(today.setDate(today.getDate() + 7));
    const formattedDate = DateFunctions.getFormattedDate(nextWeek) + "T12:00:00";
    if(projectsString) {
        projects = JSON.parse(projectsString);
        projects.forEach(project => {
            Object.setPrototypeOf(project, ProjectMaker);
            project.list.forEach(todo => {
                Object.setPrototypeOf(todo, TodoMaker);
            })
        });
    } else {
        projects = [new ProjectMaker('Home', null)];
        addTodoItem(
            "How To Use ?",
            "Check this todo to learn how to use this web app",
            formattedDate,
            3,
            "Things You can do !\n- Add todo items with Add new task button\n- Add new projects with the new project button\n- Mark Todos done/undone\n- Edit/Delete added items and projects",
            false,
            0
        );
    }
    updatePage(0);
    updateProjects();
}

function updateData() {
    localStorage.setItem('my-projects', JSON.stringify(projects));
}

getData();

// TESTING

// addProject("My Project 1", 1);
// addProject("My Project 2", 2);

// addTodoItem("Code", "Write code for the new feature", "2024-03-07T12:00:00", 1, "blah blah blah", false, 0);
// addTodoItem("Study", "Prepare for the upcoming exam", "2024-03-08T14:30:00", 2, "Study for exams", false, 0);
// addTodoItem("Exercise", "Go for a jog in the park", "2024-03-09T18:00:00", 3, "Go for a run", false, 1);
// addTodoItem("Read", "Finish the latest novel", "2024-03-10T10:00:00", 1, "Read a book", false, 1);
// addTodoItem("Meeting", "Discuss project updates", "2024-03-11T15:45:00", 2, "Attend team meeting", false, 2);
// addTodoItem("Project", "Work on UI improvements", "2024-03-12T09:30:00", 3, "Work on project", false, 2);