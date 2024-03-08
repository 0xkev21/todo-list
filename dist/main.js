/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/material-symbols/outlined.css":
/*!****************************************************!*\
  !*** ./node_modules/material-symbols/outlined.css ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/style.scss":
/*!******************************!*\
  !*** ./src/style/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/date.js":
/*!*****************************!*\
  !*** ./src/modules/date.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const button = document.querySelector('button[type="submit"]');
const date = document.querySelector('input[type="date"]');
const time = document.querySelector('input[type="time"]');

const dateArray = [];

button.addEventListener('click', function(e) {
    e.preventDefault();
    const dateString = date.value + "T" + time.value;
    console.log(dateString);
    const dateTime = createDate(dateString);
    dateArray.push(dateTime);
})

function createDate (dateString) {
    return new Date(dateString);
}

function sortDate(array) {
    return array.sort((a,b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
    });
}

const testArray = [
    "Mar 12 2012 10:00:00 AM",
    "Mar 8 2012 08:00:00 AM"
]

console.log(testArray);
console.log(sortDate(testArray));

const date1 = new Date('2024-03-11');
const date2 = new Date('2024-04-06T20:24:32');
const today = new Date();
console.log(date1.getTime() < today.getTime()); // Dated dued
console.log([date1.getFullYear(), pad2digits(date1.getMonth()+1), pad2digits(date1.getDate())].join('-'));

console.log(date1.getDate() === today.getDate()); // day
console.log(date2.getDate() === today.getDate());

console.log(date1.getDate());

// Pad 0s on day & month
function pad2digits(num) {
    return String(num).padStart(2, '0');
}

function getFormattedDate (date) {
    return [date.getFullYear(), pad2digits(today.getMonth() + 1), pad2digits(today.getDate())].join('-');
}

function filterToday(date) {
    const formattedDate = date.split('T')[0];
    const today = getFormattedDate(new Date());
    return formattedDate === today;
}

function filterUpcoming(date) {
    const totalTimeFromDate = new Date(date).getTime();
    console.log(totalTimeFromDate);
    const totalTimeFromToday = new Date().getTime();
    console.log(totalTimeFromToday);
    return totalTimeFromDate > totalTimeFromToday;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({filterToday, filterUpcoming});

/***/ }),

/***/ "./src/modules/dom-functions.js":
/*!**************************************!*\
  !*** ./src/modules/dom-functions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sanitizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitizer.js */ "./src/modules/sanitizer.js");
/* harmony import */ var _project_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-functions.js */ "./src/modules/project-functions.js");



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
            ${(0,_sanitizer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(todo.title)}
            </h4>
            <p class="todo-description">
                ${(0,_sanitizer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(todo.description)}
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
        todosToDisplay = _project_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].getAllLists(array);
    } else if (index === 'todayList') {
        todosToDisplay = _project_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].getTodayList(array);
    } else if (index === 'upcomingList') {
        todosToDisplay = _project_functions_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUpcomingList(array);
        console.log("hey");
    } else {
        todosToDisplay = [...array[index].list.map((todo, index) => (
            {todo, index}
        ))];
    }
    console.log(todosToDisplay);

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({createTodo, createProject, updateTodoList, updateProjectList, displayTodoDetails});

/***/ }),

/***/ "./src/modules/project-functions.js":
/*!******************************************!*\
  !*** ./src/modules/project-functions.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./src/modules/date.js");
/* harmony import */ var _todo_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo-functions */ "./src/modules/todo-functions.js");


const {changeTitle, changePriority} = _todo_functions__WEBPACK_IMPORTED_MODULE_1__["default"];

function getAllLists (projects) {
    let arr = [];
    projects.forEach(project => {
        arr = [...arr, ...project.list.map((todo, index) => (
            {todo, index}
        ))];
    })
    return arr;
}

function getTodayList (projects) {
    const allLists = getAllLists(projects);
    const todayList = allLists.filter(({todo, index}) => {
        return _date_js__WEBPACK_IMPORTED_MODULE_0__["default"].filterToday(todo.dueDate);
    })
    return todayList;
}

function getUpcomingList (projects) {
    const allLists = getAllLists(projects);
    const upcomingList = allLists.filter(({todo, index}) => {
        return _date_js__WEBPACK_IMPORTED_MODULE_0__["default"].filterUpcoming(todo.dueDate);
    })
    return upcomingList;
}

function editProject(project, newTitle, newPriority) {
    changeTitle(project, newTitle);
    changePriority(project, newPriority);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({getAllLists, getTodayList, getUpcomingList, editProject});

/***/ }),

/***/ "./src/modules/project-maker.js":
/*!**************************************!*\
  !*** ./src/modules/project-maker.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectMaker)
/* harmony export */ });
class ProjectMaker {
    constructor(title, priority) {
        Object.assign(this, {title, priority});
        this.list = [];
    }
}

/***/ }),

/***/ "./src/modules/sanitizer.js":
/*!**********************************!*\
  !*** ./src/modules/sanitizer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sanitize)
/* harmony export */ });
// sanitizer to use innerHTML without security concern
function sanitize(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

/***/ }),

/***/ "./src/modules/theme&sidebar.js":
/*!**************************************!*\
  !*** ./src/modules/theme&sidebar.js ***!
  \**************************************/
/***/ (() => {

const themeSwitchButton = document.querySelector('input[name=theme-switch]');
const sidebarBtn = document.querySelector('.side-bar-toggle');

// Match user Theme
if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitchButton.checked = true;
    themeSwitchButton.setAttribute('title', "Light Mode");
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeSwitchButton.checked = false;
    themeSwitchButton.setAttribute('title', "Dark Mode");
}

// Toggle Theme on Click
themeSwitchButton.addEventListener('change',(e) => {
    if(e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        e.target.setAttribute('title', "Switch to Light");
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        e.target.setAttribute('title', "Switch to Dark");
    }
});

// Toggle Sidebar
document.body.classList.add('show-side-bar');
sidebarBtn.addEventListener('click', () => {
    console.log("test");
    document.body.classList.toggle('show-side-bar');
})

/***/ }),

/***/ "./src/modules/todo-functions.js":
/*!***************************************!*\
  !*** ./src/modules/todo-functions.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todo_maker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo-maker */ "./src/modules/todo-maker.js");


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
        projects[todo.projectIndex].list.splice(todo.index, 1);
        projects[newProject].list.push(new _todo_maker__WEBPACK_IMPORTED_MODULE_0__["default"](newTitle, newDes, newDueDate, newPriority, newNotes, todo.done, newProject));
    } else {
        const editingTodo = projects[todo.projectIndex].list[todo.index];
        changeTitle(editingTodo, newTitle);
        changeDescription(editingTodo, newDes);
        changeDueDate(editingTodo, newDueDate);
        changePriority(editingTodo, newPriority);
        changeNotes(editingTodo, newNotes);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({changeTitle, changePriority, editTodo, changeState, deleteItem});

/***/ }),

/***/ "./src/modules/todo-maker.js":
/*!***********************************!*\
  !*** ./src/modules/todo-maker.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodoMaker)
/* harmony export */ });
class TodoMaker {
    constructor(title, description, dueDate, priority, notes, done, project) {
        Object.assign(this, {title, description, dueDate, priority, notes, done, project});
    };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var material_symbols_outlined_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! material-symbols/outlined.css */ "./node_modules/material-symbols/outlined.css");
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/style.scss */ "./src/style/style.scss");
/* harmony import */ var _modules_theme_sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/theme&sidebar */ "./src/modules/theme&sidebar.js");
/* harmony import */ var _modules_theme_sidebar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_theme_sidebar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_todo_maker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/todo-maker */ "./src/modules/todo-maker.js");
/* harmony import */ var _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/project-maker */ "./src/modules/project-maker.js");
/* harmony import */ var _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/todo-functions */ "./src/modules/todo-functions.js");
/* harmony import */ var _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/dom-functions */ "./src/modules/dom-functions.js");
/* harmony import */ var _modules_project_functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/project-functions */ "./src/modules/project-functions.js");
// Dependencies










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
const projects = [
    new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"]("Home", null),
];
let currentPage = null;
let editingTodo = false;
let editingProject = false;


// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new _modules_todo_maker__WEBPACK_IMPORTED_MODULE_3__["default"](title, description, dueDate, priority, notes, done, project);
    projects[project].list.push(newTodo);
}


// Changing todo done status
function updateDoneStatus(projectIndex, todo) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].changeState(projects[projectIndex].list[todo]);
    updatePage(projectIndex);
}


// Remove Todo Item
function removeTodoItem (projectIndex, index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects[projectIndex].list, index);
    updatePage(projectIndex);
    todoDetailsDiv.classList.remove('show');
}

// Add Project
function addProject (name, priority) {
    const newProject = new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"](name, priority);
    projects.push(newProject);
    updateProjects();
    projectsDiv.classList.add('show');
    updatePage(projects.length -1);
}

// Remove Project
function removeProject (index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects, index);
    updateProjects();
    if(currentPage) updatePage(0);
}

// Update Page based on currentPage
function updatePage(projectIndex) {
    switch(currentPage){
        case 'allLists':
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 'allLists', 'All Lists');
            break;
        case 'todayList':
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 'todayList', 'Today List');
            break;
        case 'upcomingList':
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 'upcomingList', 'Upcoming List');
            break;
        default:
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, projectIndex, projects[projectIndex].title);
    }
    refreshEventListeners();
}

function updateProjects() {
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateProjectList(projects);
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach(btn => {
        const index = btn.getAttribute('data-index');
        btn.addEventListener('click', () => {
            currentPage = null;
            updatePage(index);
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
}

function closeForm(form) {
    editingTodo = false;
    editingProject = false;
    form.reset();
    form.parentNode.classList.remove('show');
}

// Add/Edit todo item on Form submit
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const dueDate = todoDate.value + 'T' + todoTime.value;
    if(editingTodo) {
        _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].editTodo(projects, editingTodo, todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, +todoProject.value);
    } else {
        addTodoItem(todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, false, +todoProject.value);
    }
    updatePage(todoProject.value);
    closeForm(todoForm);
});

// Add/Edit project on Form submit
addProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(editingProject) {
        _modules_project_functions__WEBPACK_IMPORTED_MODULE_7__["default"].editProject(projects[editingProject], projectTitle.value, projectPriority.value);
    } else if(projectTitle.value && projectPriority.value) {
        addProject(projectTitle.value, projectPriority.value);
    }
    updateProjects();
    closeForm(projectForm);
})

// Remove Project
removeProjectBtn.addEventListener('click', function() {
    const index = + this.parentNode.getAttribute('data-index');
    removeProject(index);
})

// Navigate Projects
homeBtn.addEventListener('click', () => {
    currentPage = null;
    updatePage(0);
});
myProjectsBtn.addEventListener('click', () => {
    projectsDiv.classList.toggle('show');
});
allListsBtn.addEventListener('click', () => {
    currentPage = 'allLists';
    updatePage();
})
todayListBtn.addEventListener('click', () => {
    currentPage = 'todayList';
    updatePage();
})
upcomingListBtn.addEventListener('click', () => {
    currentPage = 'upcomingList';
    updatePage();
})

// Details Container
function showTodoDetails(projectIndex, index) {
    const todo = projects[projectIndex].list[index];
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].displayTodoDetails(todo);
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

// TESTING

addProject("My Project 1", 1);
addProject("My Project 2", 2);

addTodoItem("Code", "Write code for the new feature", "2024-03-07T12:00:00", 1, "blah blah blah", false, 0);
addTodoItem("Study", "Prepare for the upcoming exam", "2024-03-08T14:30:00", 2, "Study for exams", false, 0);
addTodoItem("Exercise", "Go for a jog in the park", "2024-03-09T18:00:00", 3, "Go for a run", false, 1);
addTodoItem("Read", "Finish the latest novel", "2024-03-10T10:00:00", 1, "Read a book", false, 1);
addTodoItem("Meeting", "Discuss project updates", "2024-03-11T15:45:00", 2, "Attend team meeting", false, 2);
addTodoItem("Project", "Work on UI improvements", "2024-03-12T09:30:00", 3, "Work on project", false, 2);

// Start at Home Page 
updatePage(0);
refreshEventListeners();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWE7QUFDckIsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtFQUFnQjtBQUN4QixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhEQUFZO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxvQkFBb0I7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvbWF0ZXJpYWwtc3ltYm9scy9vdXRsaW5lZC5jc3M/NjBmNCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0eWxlL3N0eWxlLnNjc3M/NDU2ZCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZGF0ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QtbWFrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Nhbml0aXplci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdGhlbWUmc2lkZWJhci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8tbWFrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpO1xyXG5jb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImRhdGVcIl0nKTtcclxuY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJ0aW1lXCJdJyk7XHJcblxyXG5jb25zdCBkYXRlQXJyYXkgPSBbXTtcclxuXHJcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBkYXRlLnZhbHVlICsgXCJUXCIgKyB0aW1lLnZhbHVlO1xyXG4gICAgY29uc29sZS5sb2coZGF0ZVN0cmluZyk7XHJcbiAgICBjb25zdCBkYXRlVGltZSA9IGNyZWF0ZURhdGUoZGF0ZVN0cmluZyk7XHJcbiAgICBkYXRlQXJyYXkucHVzaChkYXRlVGltZSk7XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEYXRlIChkYXRlU3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZVN0cmluZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNvcnREYXRlKGFycmF5KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuc29ydCgoYSxiKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhKTtcclxuICAgICAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIpO1xyXG4gICAgICAgIHJldHVybiBkYXRlQSAtIGRhdGVCO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHRlc3RBcnJheSA9IFtcclxuICAgIFwiTWFyIDEyIDIwMTIgMTA6MDA6MDAgQU1cIixcclxuICAgIFwiTWFyIDggMjAxMiAwODowMDowMCBBTVwiXHJcbl1cclxuXHJcbmNvbnNvbGUubG9nKHRlc3RBcnJheSk7XHJcbmNvbnNvbGUubG9nKHNvcnREYXRlKHRlc3RBcnJheSkpO1xyXG5cclxuY29uc3QgZGF0ZTEgPSBuZXcgRGF0ZSgnMjAyNC0wMy0xMScpO1xyXG5jb25zdCBkYXRlMiA9IG5ldyBEYXRlKCcyMDI0LTA0LTA2VDIwOjI0OjMyJyk7XHJcbmNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuY29uc29sZS5sb2coZGF0ZTEuZ2V0VGltZSgpIDwgdG9kYXkuZ2V0VGltZSgpKTsgLy8gRGF0ZWQgZHVlZFxyXG5jb25zb2xlLmxvZyhbZGF0ZTEuZ2V0RnVsbFllYXIoKSwgcGFkMmRpZ2l0cyhkYXRlMS5nZXRNb250aCgpKzEpLCBwYWQyZGlnaXRzKGRhdGUxLmdldERhdGUoKSldLmpvaW4oJy0nKSk7XHJcblxyXG5jb25zb2xlLmxvZyhkYXRlMS5nZXREYXRlKCkgPT09IHRvZGF5LmdldERhdGUoKSk7IC8vIGRheVxyXG5jb25zb2xlLmxvZyhkYXRlMi5nZXREYXRlKCkgPT09IHRvZGF5LmdldERhdGUoKSk7XHJcblxyXG5jb25zb2xlLmxvZyhkYXRlMS5nZXREYXRlKCkpO1xyXG5cclxuLy8gUGFkIDBzIG9uIGRheSAmIG1vbnRoXHJcbmZ1bmN0aW9uIHBhZDJkaWdpdHMobnVtKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nKG51bSkucGFkU3RhcnQoMiwgJzAnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkRGF0ZSAoZGF0ZSkge1xyXG4gICAgcmV0dXJuIFtkYXRlLmdldEZ1bGxZZWFyKCksIHBhZDJkaWdpdHModG9kYXkuZ2V0TW9udGgoKSArIDEpLCBwYWQyZGlnaXRzKHRvZGF5LmdldERhdGUoKSldLmpvaW4oJy0nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsdGVyVG9kYXkoZGF0ZSkge1xyXG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGRhdGUuc3BsaXQoJ1QnKVswXTtcclxuICAgIGNvbnN0IHRvZGF5ID0gZ2V0Rm9ybWF0dGVkRGF0ZShuZXcgRGF0ZSgpKTtcclxuICAgIHJldHVybiBmb3JtYXR0ZWREYXRlID09PSB0b2RheTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsdGVyVXBjb21pbmcoZGF0ZSkge1xyXG4gICAgY29uc3QgdG90YWxUaW1lRnJvbURhdGUgPSBuZXcgRGF0ZShkYXRlKS5nZXRUaW1lKCk7XHJcbiAgICBjb25zb2xlLmxvZyh0b3RhbFRpbWVGcm9tRGF0ZSk7XHJcbiAgICBjb25zdCB0b3RhbFRpbWVGcm9tVG9kYXkgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIGNvbnNvbGUubG9nKHRvdGFsVGltZUZyb21Ub2RheSk7XHJcbiAgICByZXR1cm4gdG90YWxUaW1lRnJvbURhdGUgPiB0b3RhbFRpbWVGcm9tVG9kYXk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtmaWx0ZXJUb2RheSwgZmlsdGVyVXBjb21pbmd9OyIsImltcG9ydCBzYW5pdGl6ZSBmcm9tICcuL3Nhbml0aXplci5qcyc7XHJcbmltcG9ydCBwcm9qZWN0RnVuY3Rpb25zIGZyb20gJy4vcHJvamVjdC1mdW5jdGlvbnMuanMnO1xyXG5cclxuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktcHJvamVjdHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IHRvZG9Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcclxuY29uc3QgdG9kb0xpc3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QtdGl0bGUnKTtcclxuXHJcbmNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXQtdG9kby10aXRsZScpO1xyXG5jb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tZGVzY3JpcHRpb24nKTtcclxuY29uc3QgdG9kb0R1ZWRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tZHVlZGF0ZSBzcGFuJyk7XHJcbmNvbnN0IHRvZG9Qcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXQtdG9kby1wcmlvcml0eSBzcGFuJyk7XHJcbmNvbnN0IHRvZG9Ob3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXQtdG9kby1ub3RlcycpO1xyXG5jb25zdCBwcmlvcml0aWVzID0gW1wiTm90IEltcG9ydGFudFwiLCBcIk5vcm1hbFwiLCBcIkltcG9ydGFudFwiXVxyXG5cclxuLy8gVG9kbyBET01cclxuZnVuY3Rpb24gY3JlYXRlVG9kbyAodG9kbywgaW5kZXgpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgndG9kby1jYXJkLWNvbnRhaW5lcicpO1xyXG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleCk7XHJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0JywgdG9kby5wcm9qZWN0KTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWRvbmUnLCB0b2RvLmRvbmUpO1xyXG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcCcsIHRvZG8ucHJpb3JpdHkpO1xyXG4gICAgY29uc3QgSFRNTFNuaXBwZXQgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlLWRlc2NyaXB0aW9uLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8aDQgY2xhc3M9XCJ0b2RvLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICR7c2FuaXRpemUodG9kby50aXRsZSl9XHJcbiAgICAgICAgICAgIDwvaDQ+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwidG9kby1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgJHtzYW5pdGl6ZSh0b2RvLmRlc2NyaXB0aW9uKX1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWJ0bnMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b2RvLWRvbmUgYnRuLWNpcmNsZVwiIHRpdGxlPSR7dG9kby5kb25lPyBcIkRvbmVcIjogXCJUb2RvXCJ9PjxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPiR7dG9kby5kb25lPyBcImNoZWNrX2NpcmNsZVwiOiBcInJhZGlvX2J1dHRvbl91bmNoZWNrZWRcIn08L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b2RvLWRldGFpbHMgYnRuLWNpcmNsZVwiIHRpdGxlPVwiTW9yZSBEZXRhaWxzXCI+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+c3VtbWFyaXplPC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJpb3JpdHlcIiB0aXRsZT1cIlByaW9yaXR5LSR7cHJpb3JpdGllc1t0b2RvLnByaW9yaXR5IC0gMV19XCI+PC9zcGFuPlxyXG4gICAgYDtcclxuICAgIGl0ZW0uaW5uZXJIVE1MID0gSFRNTFNuaXBwZXQ7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRvZG9MaXN0KGFycmF5LCBpbmRleCwgdGl0bGUpIHtcclxuICAgIGNvbnN0IHRvZG9MaXN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3RzJyk7XHJcbiAgICB0b2RvTGlzdHNEaXYuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB0b2RvTGlzdFRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XHJcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIGxldCB0b2Rvc1RvRGlzcGxheTtcclxuICAgIGlmIChpbmRleCA9PT0gJ2FsbExpc3RzJykge1xyXG4gICAgICAgIHRvZG9zVG9EaXNwbGF5ID0gcHJvamVjdEZ1bmN0aW9ucy5nZXRBbGxMaXN0cyhhcnJheSk7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAndG9kYXlMaXN0Jykge1xyXG4gICAgICAgIHRvZG9zVG9EaXNwbGF5ID0gcHJvamVjdEZ1bmN0aW9ucy5nZXRUb2RheUxpc3QoYXJyYXkpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gJ3VwY29taW5nTGlzdCcpIHtcclxuICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IHByb2plY3RGdW5jdGlvbnMuZ2V0VXBjb21pbmdMaXN0KGFycmF5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImhleVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9kb3NUb0Rpc3BsYXkgPSBbLi4uYXJyYXlbaW5kZXhdLmxpc3QubWFwKCh0b2RvLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICB7dG9kbywgaW5kZXh9XHJcbiAgICAgICAgKSldO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codG9kb3NUb0Rpc3BsYXkpO1xyXG5cclxuICAgIHRvZG9zVG9EaXNwbGF5LmZvckVhY2goKHt0b2RvLCBpbmRleH0pID0+IHtcclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjcmVhdGVUb2RvKHRvZG8sIGluZGV4KSk7XHJcbiAgICB9KVxyXG4gICAgdG9kb0xpc3RzRGl2LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxufVxyXG5cclxuLy8gUHJvamVjdCBET01cclxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChwcm9qZWN0LCBpbmRleCkge1xyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoJ2xpbmstYnRuJyk7XHJcbiAgICBlZGl0QnRuLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIGVkaXRCdG4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdFZGl0IFByb2plY3QnKTtcclxuICAgIGNvbnN0IGVkaXRTeW1ib2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBlZGl0U3ltYm9sLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgIGVkaXRTeW1ib2wudGV4dENvbnRlbnQgPSAnZWRpdCc7XHJcbiAgICBlZGl0QnRuLmFwcGVuZENoaWxkKGVkaXRTeW1ib2wpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5Jyk7XHJcbiAgICBwcmlvcml0eS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgYFByaW9yaXR5LSR7cHJpb3JpdGllc1twcm9qZWN0LnByaW9yaXR5IC0gMV19YCk7XHJcblxyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2xpbmstYnRuJywgJ3Byb2plY3QtYnRuJyk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgcHJvamVjdC50aXRsZSk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLXAnLCBwcm9qZWN0LnByaW9yaXR5KVxyXG4gICAgXHJcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKGVkaXRCdG4pO1xyXG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKHByaW9yaXR5KTtcclxuXHJcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgaW5kZXgpO1xyXG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgIHJldHVybiB7YnV0dG9uOiBidXR0b24sIG9wdGlvbjogb3B0aW9ufTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoYXJyYXkpIHtcclxuICAgIHByb2plY3RzRGl2LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdG9kb1Byb2plY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCIwXCIgc2VsZWN0ZWQ+SG9tZTwvb3B0aW9uPic7XHJcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY3JlYXRlUHJvamVjdChhcnJheVtpXSwgaSk7XHJcbiAgICAgICAgcHJvamVjdHNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdE9iai5idXR0b24pO1xyXG4gICAgICAgIHRvZG9Qcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RPYmoub3B0aW9uKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gVG9kbyBEZXRhaWxzIFBhZ2VcclxuZnVuY3Rpb24gZGlzcGxheVRvZG9EZXRhaWxzKHRvZG8pIHtcclxuICAgIHRvZG9UaXRsZS50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XHJcbiAgICB0b2RvRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmRlc2NyaXB0aW9uO1xyXG4gICAgdG9kb0R1ZWRhdGUudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGU7XHJcbiAgICB0b2RvUHJpb3JpdHkudGV4dENvbnRlbnQgPSB0b2RvLnByaW9yaXR5O1xyXG4gICAgdG9kb05vdGVzLnRleHRDb250ZW50ID0gdG9kby5ub3RlcztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NyZWF0ZVRvZG8sIGNyZWF0ZVByb2plY3QsIHVwZGF0ZVRvZG9MaXN0LCB1cGRhdGVQcm9qZWN0TGlzdCwgZGlzcGxheVRvZG9EZXRhaWxzfTsiLCJpbXBvcnQgZGF0ZUZ1bmN0aW9ucyBmcm9tICcuL2RhdGUuanMnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgb2JqfSBmcm9tICcuL3RvZG8tZnVuY3Rpb25zJztcclxuY29uc3Qge2NoYW5nZVRpdGxlLCBjaGFuZ2VQcmlvcml0eX0gPSBvYmo7XHJcblxyXG5mdW5jdGlvbiBnZXRBbGxMaXN0cyAocHJvamVjdHMpIHtcclxuICAgIGxldCBhcnIgPSBbXTtcclxuICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgYXJyID0gWy4uLmFyciwgLi4ucHJvamVjdC5saXN0Lm1hcCgodG9kbywgaW5kZXgpID0+IChcclxuICAgICAgICAgICAge3RvZG8sIGluZGV4fVxyXG4gICAgICAgICkpXTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb2RheUxpc3QgKHByb2plY3RzKSB7XHJcbiAgICBjb25zdCBhbGxMaXN0cyA9IGdldEFsbExpc3RzKHByb2plY3RzKTtcclxuICAgIGNvbnN0IHRvZGF5TGlzdCA9IGFsbExpc3RzLmZpbHRlcigoe3RvZG8sIGluZGV4fSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBkYXRlRnVuY3Rpb25zLmZpbHRlclRvZGF5KHRvZG8uZHVlRGF0ZSk7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHRvZGF5TGlzdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VXBjb21pbmdMaXN0IChwcm9qZWN0cykge1xyXG4gICAgY29uc3QgYWxsTGlzdHMgPSBnZXRBbGxMaXN0cyhwcm9qZWN0cyk7XHJcbiAgICBjb25zdCB1cGNvbWluZ0xpc3QgPSBhbGxMaXN0cy5maWx0ZXIoKHt0b2RvLCBpbmRleH0pID0+IHtcclxuICAgICAgICByZXR1cm4gZGF0ZUZ1bmN0aW9ucy5maWx0ZXJVcGNvbWluZyh0b2RvLmR1ZURhdGUpO1xyXG4gICAgfSlcclxuICAgIHJldHVybiB1cGNvbWluZ0xpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVkaXRQcm9qZWN0KHByb2plY3QsIG5ld1RpdGxlLCBuZXdQcmlvcml0eSkge1xyXG4gICAgY2hhbmdlVGl0bGUocHJvamVjdCwgbmV3VGl0bGUpO1xyXG4gICAgY2hhbmdlUHJpb3JpdHkocHJvamVjdCwgbmV3UHJpb3JpdHkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Z2V0QWxsTGlzdHMsIGdldFRvZGF5TGlzdCwgZ2V0VXBjb21pbmdMaXN0LCBlZGl0UHJvamVjdH07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdE1ha2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBwcmlvcml0eSkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge3RpdGxlLCBwcmlvcml0eX0pO1xyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xyXG4gICAgfVxyXG59IiwiLy8gc2FuaXRpemVyIHRvIHVzZSBpbm5lckhUTUwgd2l0aG91dCBzZWN1cml0eSBjb25jZXJuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhbml0aXplKGlucHV0KSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi50ZXh0Q29udGVudCA9IGlucHV0O1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn0iLCJjb25zdCB0aGVtZVN3aXRjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9dGhlbWUtc3dpdGNoXScpO1xyXG5jb25zdCBzaWRlYmFyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGUtYmFyLXRvZ2dsZScpO1xyXG5cclxuLy8gTWF0Y2ggdXNlciBUaGVtZVxyXG5pZih3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMpIHtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnZGFyaycpO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b24uY2hlY2tlZCA9IHRydWU7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJMaWdodCBNb2RlXCIpO1xyXG59IGVsc2Uge1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdsaWdodCcpO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b24uY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiRGFyayBNb2RlXCIpO1xyXG59XHJcblxyXG4vLyBUb2dnbGUgVGhlbWUgb24gQ2xpY2tcclxudGhlbWVTd2l0Y2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywoZSkgPT4ge1xyXG4gICAgaWYoZS50YXJnZXQuY2hlY2tlZCkge1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnZGFyaycpO1xyXG4gICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIlN3aXRjaCB0byBMaWdodFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdsaWdodCcpO1xyXG4gICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIlN3aXRjaCB0byBEYXJrXCIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIFRvZ2dsZSBTaWRlYmFyXHJcbmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlLWJhcicpO1xyXG5zaWRlYmFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LXNpZGUtYmFyJyk7XHJcbn0pIiwiaW1wb3J0IFRvZG9NYWtlciBmcm9tICcuL3RvZG8tbWFrZXInO1xyXG5cclxuZnVuY3Rpb24gY2hhbmdlVGl0bGUodG9kbywgbmV3VGl0bGUpIHtcclxuICAgIHRvZG8udGl0bGUgPSBuZXdUaXRsZTtcclxufVxyXG5mdW5jdGlvbiBjaGFuZ2VEZXNjcmlwdGlvbih0b2RvLCBuZXdEZXNjcmlwdGlvbikge1xyXG4gICAgdG9kby5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xyXG59XHJcbmZ1bmN0aW9uIGNoYW5nZUR1ZURhdGUgKHRvZG8sIG5ld0RhdGUpIHtcclxuICAgIHRvZG8uZHVlRGF0ZSA9IG5ld0RhdGU7XHJcbn1cclxuZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHkgKHRvZG8sIG5ld1ByaW9yaXR5KSB7XHJcbiAgICB0b2RvLnByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XHJcbn1cclxuZnVuY3Rpb24gY2hhbmdlTm90ZXMgKHRvZG8sIG5ld05vdGVzKSB7XHJcbiAgICB0b2RvLm5vdGVzID0gbmV3Tm90ZXM7XHJcbn1cclxuZnVuY3Rpb24gY2hhbmdlU3RhdGUgKHRvZG8pIHtcclxuICAgIHRvZG8uZG9uZSA9IHRvZG8uZG9uZSA/IGZhbHNlIDogdHJ1ZTtcclxufVxyXG5mdW5jdGlvbiBkZWxldGVJdGVtIChhcnJheSwgaW5kZXgpIHtcclxuICAgIHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBlZGl0VG9kbyhwcm9qZWN0cywgdG9kbywgbmV3VGl0bGUsIG5ld0RlcywgbmV3RHVlRGF0ZSwgbmV3UHJpb3JpdHksIG5ld05vdGVzLCBuZXdQcm9qZWN0KSB7XHJcbiAgICBpZih0b2RvLnByb2plY3RJbmRleCAhPT0gbmV3UHJvamVjdCkge1xyXG4gICAgICAgIHByb2plY3RzW3RvZG8ucHJvamVjdEluZGV4XS5saXN0LnNwbGljZSh0b2RvLmluZGV4LCAxKTtcclxuICAgICAgICBwcm9qZWN0c1tuZXdQcm9qZWN0XS5saXN0LnB1c2gobmV3IFRvZG9NYWtlcihuZXdUaXRsZSwgbmV3RGVzLCBuZXdEdWVEYXRlLCBuZXdQcmlvcml0eSwgbmV3Tm90ZXMsIHRvZG8uZG9uZSwgbmV3UHJvamVjdCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBlZGl0aW5nVG9kbyA9IHByb2plY3RzW3RvZG8ucHJvamVjdEluZGV4XS5saXN0W3RvZG8uaW5kZXhdO1xyXG4gICAgICAgIGNoYW5nZVRpdGxlKGVkaXRpbmdUb2RvLCBuZXdUaXRsZSk7XHJcbiAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24oZWRpdGluZ1RvZG8sIG5ld0Rlcyk7XHJcbiAgICAgICAgY2hhbmdlRHVlRGF0ZShlZGl0aW5nVG9kbywgbmV3RHVlRGF0ZSk7XHJcbiAgICAgICAgY2hhbmdlUHJpb3JpdHkoZWRpdGluZ1RvZG8sIG5ld1ByaW9yaXR5KTtcclxuICAgICAgICBjaGFuZ2VOb3RlcyhlZGl0aW5nVG9kbywgbmV3Tm90ZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Y2hhbmdlVGl0bGUsIGNoYW5nZVByaW9yaXR5LCBlZGl0VG9kbywgY2hhbmdlU3RhdGUsIGRlbGV0ZUl0ZW19OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9NYWtlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0fSk7XHJcbiAgICB9O1xyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBEZXBlbmRlbmNpZXNcclxuaW1wb3J0ICdtYXRlcmlhbC1zeW1ib2xzL291dGxpbmVkLmNzcyc7XHJcbmltcG9ydCAnLi9zdHlsZS9zdHlsZS5zY3NzJztcclxuaW1wb3J0ICcuL21vZHVsZXMvdGhlbWUmc2lkZWJhcic7XHJcbmltcG9ydCBUb2RvTWFrZXIgZnJvbSAnLi9tb2R1bGVzL3RvZG8tbWFrZXInO1xyXG5pbXBvcnQgUHJvamVjdE1ha2VyIGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LW1ha2VyJztcclxuaW1wb3J0IFRvZG9GdW5jdGlvbnMgZnJvbSAnLi9tb2R1bGVzL3RvZG8tZnVuY3Rpb25zJztcclxuaW1wb3J0IERvbUZ1bmN0aW9ucyBmcm9tICcuL21vZHVsZXMvZG9tLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBQcm9qZWN0RnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LWZ1bmN0aW9ucyc7XHJcblxyXG5cclxuLy8gRE9NIEVsZW1lbnRzXHJcbmNvbnN0IHRvZG9MaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktcHJvamVjdHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IHRvZG9EZXRhaWxzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbHMtY2FyZC1jb250YWluZXInKTtcclxuY29uc3QgdG9kb0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscy1jYXJkJyk7XHJcbi8vIElucHV0c1xyXG5jb25zdCB0b2RvRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdG9kby1mb3JtJyk7XHJcbmNvbnN0IHByb2plY3RGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybS1jb250YWluZXInKTtcclxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XHJcbi8vIFRvZG8gSW5wdXRzXHJcbmNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xyXG5jb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcclxuY29uc3QgdG9kb0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xyXG5jb25zdCB0b2RvVGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lJyk7XHJcbmNvbnN0IHRvZG9Qcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpO1xyXG5jb25zdCB0b2RvTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90ZXMnKTtcclxuY29uc3QgdG9kb1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xyXG4vLyBQcm9qZWN0IElucHV0c1xyXG5jb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpO1xyXG5jb25zdCBwcm9qZWN0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1wcmlvcml0eScpO1xyXG5cclxuLy8gRm9ybSBCdXR0b25zXHJcbmNvbnN0IG9wZW5Ub2RvRm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcGVuLXRvZG8tZm9ybS1idG4nKTtcclxuY29uc3QgYWRkVG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdG9kby1idG4nKTtcclxuY29uc3Qgb3BlblByb2plY3RGb3JtQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXByb2plY3QtZm9ybS1idG4nKTtcclxuY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1idG4nKTtcclxuY29uc3QgY2FuY2VsQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tY2FuY2VsJyk7XHJcbmNvbnN0IHJlbW92ZVByb2plY3RCdG4gPSBwcm9qZWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLWNpcmNsZScpO1xyXG5cclxuLy8gUHJvamVjdCBCdXR0b25zXHJcbmNvbnN0IGhvbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJIb21lXCJdJyk7XHJcbmNvbnN0IGFsbExpc3RzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiQWxsIExpc3RzXCJdJyk7XHJcbmNvbnN0IHRvZGF5TGlzdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIlRvZGF5XCJdJyk7XHJcbmNvbnN0IHVwY29taW5nTGlzdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIlVwY29taW5nXCJdJyk7XHJcbmNvbnN0IG15UHJvamVjdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJNeSBQcm9qZWN0c1wiXScpO1xyXG5cclxuLy8gSW5pdGlhbGl6ZSB2YXJpYWJsZXNcclxuY29uc3QgcHJvamVjdHMgPSBbXHJcbiAgICBuZXcgUHJvamVjdE1ha2VyKFwiSG9tZVwiLCBudWxsKSxcclxuXTtcclxubGV0IGN1cnJlbnRQYWdlID0gbnVsbDtcclxubGV0IGVkaXRpbmdUb2RvID0gZmFsc2U7XHJcbmxldCBlZGl0aW5nUHJvamVjdCA9IGZhbHNlO1xyXG5cclxuXHJcbi8vIEFkZCBUb2RvIEl0ZW1cclxuZnVuY3Rpb24gYWRkVG9kb0l0ZW0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0KSB7XHJcbiAgICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG9NYWtlcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCk7XHJcbiAgICBwcm9qZWN0c1twcm9qZWN0XS5saXN0LnB1c2gobmV3VG9kbyk7XHJcbn1cclxuXHJcblxyXG4vLyBDaGFuZ2luZyB0b2RvIGRvbmUgc3RhdHVzXHJcbmZ1bmN0aW9uIHVwZGF0ZURvbmVTdGF0dXMocHJvamVjdEluZGV4LCB0b2RvKSB7XHJcbiAgICBUb2RvRnVuY3Rpb25zLmNoYW5nZVN0YXRlKHByb2plY3RzW3Byb2plY3RJbmRleF0ubGlzdFt0b2RvXSk7XHJcbiAgICB1cGRhdGVQYWdlKHByb2plY3RJbmRleCk7XHJcbn1cclxuXHJcblxyXG4vLyBSZW1vdmUgVG9kbyBJdGVtXHJcbmZ1bmN0aW9uIHJlbW92ZVRvZG9JdGVtIChwcm9qZWN0SW5kZXgsIGluZGV4KSB7XHJcbiAgICBUb2RvRnVuY3Rpb25zLmRlbGV0ZUl0ZW0ocHJvamVjdHNbcHJvamVjdEluZGV4XS5saXN0LCBpbmRleCk7XHJcbiAgICB1cGRhdGVQYWdlKHByb2plY3RJbmRleCk7XHJcbiAgICB0b2RvRGV0YWlsc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbn1cclxuXHJcbi8vIEFkZCBQcm9qZWN0XHJcbmZ1bmN0aW9uIGFkZFByb2plY3QgKG5hbWUsIHByaW9yaXR5KSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3RNYWtlcihuYW1lLCBwcmlvcml0eSk7XHJcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgdXBkYXRlUHJvamVjdHMoKTtcclxuICAgIHByb2plY3RzRGl2LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIHVwZGF0ZVBhZ2UocHJvamVjdHMubGVuZ3RoIC0xKTtcclxufVxyXG5cclxuLy8gUmVtb3ZlIFByb2plY3RcclxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdCAoaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0cywgaW5kZXgpO1xyXG4gICAgdXBkYXRlUHJvamVjdHMoKTtcclxuICAgIGlmKGN1cnJlbnRQYWdlKSB1cGRhdGVQYWdlKDApO1xyXG59XHJcblxyXG4vLyBVcGRhdGUgUGFnZSBiYXNlZCBvbiBjdXJyZW50UGFnZVxyXG5mdW5jdGlvbiB1cGRhdGVQYWdlKHByb2plY3RJbmRleCkge1xyXG4gICAgc3dpdGNoKGN1cnJlbnRQYWdlKXtcclxuICAgICAgICBjYXNlICdhbGxMaXN0cyc6XHJcbiAgICAgICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgJ2FsbExpc3RzJywgJ0FsbCBMaXN0cycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b2RheUxpc3QnOlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsICd0b2RheUxpc3QnLCAnVG9kYXkgTGlzdCcpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd1cGNvbWluZ0xpc3QnOlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsICd1cGNvbWluZ0xpc3QnLCAnVXBjb21pbmcgTGlzdCcpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3RJbmRleCwgcHJvamVjdHNbcHJvamVjdEluZGV4XS50aXRsZSk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdHMoKSB7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlUHJvamVjdExpc3QocHJvamVjdHMpO1xyXG4gICAgY29uc3QgcHJvamVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcclxuICAgIHByb2plY3RCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgdXBkYXRlUGFnZShpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdEVkaXRCdG4gPSBidG4ucXVlcnlTZWxlY3RvcignLmxpbmstYnRuJyk7XHJcbiAgICAgICAgcHJvamVjdEVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlZGl0aW5nUHJvamVjdCA9IGluZGV4O1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBzaG93UHJvamVjdEVkaXRGb3JtKGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICBwcm9qZWN0Rm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbn1cclxuXHJcbi8vIFRvZ2dsZSBUb2RvIEZvcm0gT3BlbiBVcFxyXG5vcGVuVG9kb0Zvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBhZGRUb2RvQnRuLnRleHRDb250ZW50ID0gJ0FkZCBUb2RvJztcclxuICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxufSk7XHJcbnRvZG9Gb3JtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY2xvc2VGb3JtKHRvZG9Gb3JtKTtcclxufSk7XHJcbnRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG5cclxuLy8gVG9nZ2xlIFByb2plY3QgRm9ybSBPcGVuIFVwXHJcbm9wZW5Qcm9qZWN0Rm9ybUJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgYWRkUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XHJcbiAgICAgICAgICAgIHByb2plY3RGb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG59KVxyXG5wcm9qZWN0Rm9ybUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNsb3NlRm9ybShwcm9qZWN0Rm9ybSk7XHJcbn0pO1xyXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKX0pO1xyXG5cclxuLy8gY2FuY2VsIGJ1dHRvbnNcclxuY2FuY2VsQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VGb3JtKGJ0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgfSlcclxufSlcclxuXHJcbi8vIEVkaXQgVG9kbyBGb3JtXHJcbmZ1bmN0aW9uIHNob3dFZGl0Rm9ybShwcm9qZWN0SW5kZXgsIGluZGV4KSB7XHJcbiAgICBlZGl0aW5nVG9kbyA9IHtwcm9qZWN0SW5kZXgsIGluZGV4fTtcclxuICAgIGNvbnN0IHRvZG8gPSBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbaW5kZXhdO1xyXG4gICAgdG9kb1RpdGxlLnZhbHVlID0gdG9kby50aXRsZTtcclxuICAgIHRvZG9EZXNjcmlwdGlvbi52YWx1ZSA9IHRvZG8uZGVzY3JpcHRpb247XHJcbiAgICB0b2RvRGF0ZS52YWx1ZSA9IHRvZG8uZHVlRGF0ZS5zcGxpdCgnVCcpWzBdO1xyXG4gICAgdG9kb1RpbWUudmFsdWUgPSB0b2RvLmR1ZURhdGUuc3BsaXQoJ1QnKVsxXTtcclxuICAgIHRvZG9Qcmlvcml0eS52YWx1ZSA9IHRvZG8ucHJpb3JpdHk7XHJcbiAgICB0b2RvTm90ZXMudmFsdWUgPSB0b2RvLm5vdGVzO1xyXG4gICAgdG9kb1Byb2plY3QudmFsdWUgPSB0b2RvLnByb2plY3Q7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB0b2RvRGV0YWlsc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICBhZGRUb2RvQnRuLnRleHRDb250ZW50ID0gJ1NhdmUgQ2hhbmdlcyc7XHJcbn1cclxuXHJcbi8vIEVkaXQgUHJvamVjdEZvcm1cclxuZnVuY3Rpb24gc2hvd1Byb2plY3RFZGl0Rm9ybShwcm9qZWN0SW5kZXgpIHtcclxuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0c1twcm9qZWN0SW5kZXhdO1xyXG4gICAgcHJvamVjdFRpdGxlLnZhbHVlID0gcHJvamVjdC50aXRsZTtcclxuICAgIHByb2plY3RQcmlvcml0eS52YWx1ZSA9IHByb2plY3QucHJpb3JpdHk7XHJcbiAgICBwcm9qZWN0Rm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICBwcm9qZWN0Rm9ybS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBwcm9qZWN0SW5kZXgpO1xyXG4gICAgYWRkUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdTYXZlIENoYW5nZXMnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZUZvcm0oZm9ybSkge1xyXG4gICAgZWRpdGluZ1RvZG8gPSBmYWxzZTtcclxuICAgIGVkaXRpbmdQcm9qZWN0ID0gZmFsc2U7XHJcbiAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICBmb3JtLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG59XHJcblxyXG4vLyBBZGQvRWRpdCB0b2RvIGl0ZW0gb24gRm9ybSBzdWJtaXRcclxuYWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gdG9kb0RhdGUudmFsdWUgKyAnVCcgKyB0b2RvVGltZS52YWx1ZTtcclxuICAgIGlmKGVkaXRpbmdUb2RvKSB7XHJcbiAgICAgICAgVG9kb0Z1bmN0aW9ucy5lZGl0VG9kbyhwcm9qZWN0cywgZWRpdGluZ1RvZG8sIHRvZG9UaXRsZS52YWx1ZSwgdG9kb0Rlc2NyaXB0aW9uLnZhbHVlLCBkdWVEYXRlLCB0b2RvUHJpb3JpdHkudmFsdWUsIHRvZG9Ob3Rlcy52YWx1ZSwgK3RvZG9Qcm9qZWN0LnZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWRkVG9kb0l0ZW0odG9kb1RpdGxlLnZhbHVlLCB0b2RvRGVzY3JpcHRpb24udmFsdWUsIGR1ZURhdGUsIHRvZG9Qcmlvcml0eS52YWx1ZSwgdG9kb05vdGVzLnZhbHVlLCBmYWxzZSwgK3RvZG9Qcm9qZWN0LnZhbHVlKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBhZ2UodG9kb1Byb2plY3QudmFsdWUpO1xyXG4gICAgY2xvc2VGb3JtKHRvZG9Gb3JtKTtcclxufSk7XHJcblxyXG4vLyBBZGQvRWRpdCBwcm9qZWN0IG9uIEZvcm0gc3VibWl0XHJcbmFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYoZWRpdGluZ1Byb2plY3QpIHtcclxuICAgICAgICBQcm9qZWN0RnVuY3Rpb25zLmVkaXRQcm9qZWN0KHByb2plY3RzW2VkaXRpbmdQcm9qZWN0XSwgcHJvamVjdFRpdGxlLnZhbHVlLCBwcm9qZWN0UHJpb3JpdHkudmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmKHByb2plY3RUaXRsZS52YWx1ZSAmJiBwcm9qZWN0UHJpb3JpdHkudmFsdWUpIHtcclxuICAgICAgICBhZGRQcm9qZWN0KHByb2plY3RUaXRsZS52YWx1ZSwgcHJvamVjdFByaW9yaXR5LnZhbHVlKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVByb2plY3RzKCk7XHJcbiAgICBjbG9zZUZvcm0ocHJvamVjdEZvcm0pO1xyXG59KVxyXG5cclxuLy8gUmVtb3ZlIFByb2plY3RcclxucmVtb3ZlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgaW5kZXggPSArIHRoaXMucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgIHJlbW92ZVByb2plY3QoaW5kZXgpO1xyXG59KVxyXG5cclxuLy8gTmF2aWdhdGUgUHJvamVjdHNcclxuaG9tZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGN1cnJlbnRQYWdlID0gbnVsbDtcclxuICAgIHVwZGF0ZVBhZ2UoMCk7XHJcbn0pO1xyXG5teVByb2plY3RzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgcHJvamVjdHNEaXYuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG59KTtcclxuYWxsTGlzdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjdXJyZW50UGFnZSA9ICdhbGxMaXN0cyc7XHJcbiAgICB1cGRhdGVQYWdlKCk7XHJcbn0pXHJcbnRvZGF5TGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGN1cnJlbnRQYWdlID0gJ3RvZGF5TGlzdCc7XHJcbiAgICB1cGRhdGVQYWdlKCk7XHJcbn0pXHJcbnVwY29taW5nTGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGN1cnJlbnRQYWdlID0gJ3VwY29taW5nTGlzdCc7XHJcbiAgICB1cGRhdGVQYWdlKCk7XHJcbn0pXHJcblxyXG4vLyBEZXRhaWxzIENvbnRhaW5lclxyXG5mdW5jdGlvbiBzaG93VG9kb0RldGFpbHMocHJvamVjdEluZGV4LCBpbmRleCkge1xyXG4gICAgY29uc3QgdG9kbyA9IHByb2plY3RzW3Byb2plY3RJbmRleF0ubGlzdFtpbmRleF07XHJcbiAgICBEb21GdW5jdGlvbnMuZGlzcGxheVRvZG9EZXRhaWxzKHRvZG8pO1xyXG4gICAgY29uc3QgdG9kb0VkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1lZGl0LWJ0bicpO1xyXG4gICAgY29uc3QgdG9kb0RlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWRlbC1idG4nKTtcclxuICAgIHRvZG9EZWxldGVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICByZW1vdmVUb2RvSXRlbSh0b2RvLnByb2plY3QsIGluZGV4KTtcclxuICAgIH07XHJcbiAgICB0b2RvRWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBzaG93RWRpdEZvcm0ocHJvamVjdEluZGV4LCBpbmRleCk7XHJcbiAgICB9KVxyXG4gICAgdG9kb0RldGFpbHNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgdG9kb0RldGFpbHNEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdG9kb0RldGFpbHNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgfSk7XHJcbn07XHJcbnRvZG9EZXRhaWxzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG4vLyBSZWZyZXNoIEV2ZW50IExpc3RlbmVyc1xyXG5mdW5jdGlvbiByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCB0b2RvRG9uZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1kb25lJyk7XHJcbiAgICBjb25zdCB0b2RvRGV0YWlsc0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1kZXRhaWxzJyk7XHJcblxyXG4gICAgdG9kb0RvbmVCdG5zLmZvckVhY2goZG9uZUJ0biA9PiB7XHJcbiAgICAgICAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSArIGRvbmVCdG4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSArIGRvbmVCdG4ucGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgICAgIHVwZGF0ZURvbmVTdGF0dXMocHJvamVjdEluZGV4LCBpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRvZG9EZXRhaWxzQnRucy5mb3JFYWNoKGRldGFpbHNCdG4gPT4ge1xyXG4gICAgICAgIGRldGFpbHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKyBkZXRhaWxzQnRuLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gKyBkZXRhaWxzQnRuLnBhcmVudE5vZGUucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcpO1xyXG4gICAgICAgICAgICBzaG93VG9kb0RldGFpbHMocHJvamVjdEluZGV4LCBpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8vIFRFU1RJTkdcclxuXHJcbmFkZFByb2plY3QoXCJNeSBQcm9qZWN0IDFcIiwgMSk7XHJcbmFkZFByb2plY3QoXCJNeSBQcm9qZWN0IDJcIiwgMik7XHJcblxyXG5hZGRUb2RvSXRlbShcIkNvZGVcIiwgXCJXcml0ZSBjb2RlIGZvciB0aGUgbmV3IGZlYXR1cmVcIiwgXCIyMDI0LTAzLTA3VDEyOjAwOjAwXCIsIDEsIFwiYmxhaCBibGFoIGJsYWhcIiwgZmFsc2UsIDApO1xyXG5hZGRUb2RvSXRlbShcIlN0dWR5XCIsIFwiUHJlcGFyZSBmb3IgdGhlIHVwY29taW5nIGV4YW1cIiwgXCIyMDI0LTAzLTA4VDE0OjMwOjAwXCIsIDIsIFwiU3R1ZHkgZm9yIGV4YW1zXCIsIGZhbHNlLCAwKTtcclxuYWRkVG9kb0l0ZW0oXCJFeGVyY2lzZVwiLCBcIkdvIGZvciBhIGpvZyBpbiB0aGUgcGFya1wiLCBcIjIwMjQtMDMtMDlUMTg6MDA6MDBcIiwgMywgXCJHbyBmb3IgYSBydW5cIiwgZmFsc2UsIDEpO1xyXG5hZGRUb2RvSXRlbShcIlJlYWRcIiwgXCJGaW5pc2ggdGhlIGxhdGVzdCBub3ZlbFwiLCBcIjIwMjQtMDMtMTBUMTA6MDA6MDBcIiwgMSwgXCJSZWFkIGEgYm9va1wiLCBmYWxzZSwgMSk7XHJcbmFkZFRvZG9JdGVtKFwiTWVldGluZ1wiLCBcIkRpc2N1c3MgcHJvamVjdCB1cGRhdGVzXCIsIFwiMjAyNC0wMy0xMVQxNTo0NTowMFwiLCAyLCBcIkF0dGVuZCB0ZWFtIG1lZXRpbmdcIiwgZmFsc2UsIDIpO1xyXG5hZGRUb2RvSXRlbShcIlByb2plY3RcIiwgXCJXb3JrIG9uIFVJIGltcHJvdmVtZW50c1wiLCBcIjIwMjQtMDMtMTJUMDk6MzA6MDBcIiwgMywgXCJXb3JrIG9uIHByb2plY3RcIiwgZmFsc2UsIDIpO1xyXG5cclxuLy8gU3RhcnQgYXQgSG9tZSBQYWdlIFxyXG51cGRhdGVQYWdlKDApO1xyXG5yZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=