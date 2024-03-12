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
function createDate (dateString) {
    return new Date(dateString);
}

function sortDate(array) {
    return array.sort((a,b) => {
        const dateA = createDate(a);
        const dateB = createDate(b);
        return dateA - dateB;
    });
}

// Use dueDate.getTime() < today.getTime() for checking due

// Pad 0s on day & month
function pad2digits(num) {
    return String(num).padStart(2, '0');
}

function getFormattedDate (date) {
    return [date.getFullYear(), pad2digits(date.getMonth() + 1), pad2digits(date.getDate())].join('-');
}

function filterToday(date) {
    const formattedDate = date.split('T')[0];
    const today = getFormattedDate(new Date());
    return formattedDate === today;
}

function filterUpcoming(date) {
    let totalTimeFromDate;
    if(!date.split('T')[1]) {
        totalTimeFromDate = new Date(date + "00:00:00");
    } else {
        totalTimeFromDate = new Date(date).getTime();
    }
    const totalTimeFromToday = new Date().getTime();
    return totalTimeFromDate > totalTimeFromToday;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({getFormattedDate, filterToday, filterUpcoming});

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
const todoDueDate = document.querySelector('.det-todo-duedate .date');
const todoDueTime = document.querySelector('.det-todo-duedate .time');
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
    todoDueDate.textContent = todo.dueDate.split('T')[0];
    todoDueTime.textContent = todo.dueDate.split('T')[1];
    todoPriority.innerHTML = '';
    const priorityArr = ['Not Important', 'Normal', 'Important'];
    for(let i = 0; i < todo.priority; i++) {
        todoPriority.innerHTML += '<span class="material-symbols-outlined">star</span>';
    }
    todoPriority.setAttribute('title', priorityArr[todo.priority - 1]);
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

const themeSwitchButtonContainer = document.querySelector('.theme-switch-btn');
const themeSwitchButton = document.querySelector('input[name="theme-switch"]');
const sidebarBtn = document.querySelector('.side-bar-toggle');

// Match user Theme
if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitchButton.checked = true;
    themeSwitchButtonContainer.setAttribute('title', "Light Mode");
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeSwitchButton.checked = false;
    themeSwitchButtonContainer.setAttribute('title', "Dark Mode");
}

// Toggle Theme on Click
themeSwitchButtonContainer.addEventListener('click', (e) => {
    if(!themeSwitchButton.checked) {
        themeSwitchButton.checked = true;
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitchButtonContainer.setAttribute('title', "Switch to Light");
    } else {
        themeSwitchButton.checked = false;
        document.documentElement.setAttribute('data-theme', 'light');
        themeSwitchButtonContainer.setAttribute('title', "Switch to Dark");
    }
});

// Toggle Sidebar
document.body.classList.add('show-side-bar');
sidebarBtn.addEventListener('click', () => {
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
        const currentTodo = projects[todo.projectIndex].list[todo.index];
        projects[todo.projectIndex].list.splice(todo.index, 1);
        projects[newProject].list.push(new _todo_maker__WEBPACK_IMPORTED_MODULE_0__["default"](newTitle, newDes, newDueDate, newPriority, newNotes, currentTodo.done, newProject));
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
/* harmony import */ var _modules_date_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/date.js */ "./src/modules/date.js");
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
let projects = [];
let currentPage = null;
let editingTodo = false;
let editingProject = false;


// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new _modules_todo_maker__WEBPACK_IMPORTED_MODULE_3__["default"](title, description, dueDate, priority, notes, done, project);
    projects[project].list.push(newTodo);
    updatePage(project);
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
    updatePage(projects.length - 1);
}

// Remove Project
function removeProject (index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects, index);
    updateProjects();
    if(currentPage) updatePage(0);
    closeForm(projectForm);
    updateData();
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
    updateData();
}

function updateProjects() {
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateProjectList(projects);
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
    console.log(todo);
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
            _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].editTodo(projects, editingTodo, todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, +todoProject.value);
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
            _modules_project_functions__WEBPACK_IMPORTED_MODULE_7__["default"].editProject(projects[editingProject], projectTitle.value, projectPriority.value);
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
})

// Navigate Projects
homeBtn.addEventListener('click', () => {
    currentPage = null;
    updatePage(0);
    closeSidebar();
});
myProjectsBtn.addEventListener('click', () => {
    projectsDiv.classList.toggle('show');
    const icon = myProjectsBtn.querySelector('span');
    icon.textContent = icon.textContent === 'expand_more' ? 'expand_less' : 'expand_more';
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
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].displayTodoDetails(todo);
    const todoEditBtn = document.querySelector('.todo-edit-btn');
    const todoDeleteBtn = document.querySelector('.todo-del-btn');
    todoDeleteBtn.onclick = () => {
        removeTodoItem(todo.project, index);
    };
    todoEditBtn.onclick = function () {
        showEditForm(projectIndex, index);
    }
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
        doneBtn.onclick =  function () {
            const index = + doneBtn.parentNode.parentNode.getAttribute('data-index');
            const projectIndex = + doneBtn.parentNode.parentElement.getAttribute('data-project');
            updateDoneStatus(projectIndex, index);
        };
    });
    todoDetailsBtns.forEach(detailsBtn => {
        detailsBtn.onclick = function () {
            const index = + detailsBtn.parentNode.parentNode.getAttribute('data-index');
            const projectIndex = + detailsBtn.parentNode.parentElement.getAttribute('data-project');
            showTodoDetails(projectIndex, index);
        }
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
    const formattedDate = _modules_date_js__WEBPACK_IMPORTED_MODULE_8__["default"].getFormattedDate(nextWeek) + "T12:00:00";
    if(projectsString) {
        projects = JSON.parse(projectsString);
        projects.forEach((project) => {
            project.list.forEach((todo) => {
                Object.setPrototypeOf(todo, _modules_todo_maker__WEBPACK_IMPORTED_MODULE_3__["default"]);
            })
            Object.setPrototypeOf(project, _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"]);
        })
    } else {
        projects = [new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"]('Home', null)];
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qiw4REFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvbWF0ZXJpYWwtc3ltYm9scy9vdXRsaW5lZC5jc3M/NjBmNCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0eWxlL3N0eWxlLnNjc3M/NDU2ZCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZGF0ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QtbWFrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Nhbml0aXplci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdGhlbWUmc2lkZWJhci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8tbWFrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJmdW5jdGlvbiBjcmVhdGVEYXRlIChkYXRlU3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZVN0cmluZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNvcnREYXRlKGFycmF5KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuc29ydCgoYSxiKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0ZUEgPSBjcmVhdGVEYXRlKGEpO1xyXG4gICAgICAgIGNvbnN0IGRhdGVCID0gY3JlYXRlRGF0ZShiKTtcclxuICAgICAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBVc2UgZHVlRGF0ZS5nZXRUaW1lKCkgPCB0b2RheS5nZXRUaW1lKCkgZm9yIGNoZWNraW5nIGR1ZVxyXG5cclxuLy8gUGFkIDBzIG9uIGRheSAmIG1vbnRoXHJcbmZ1bmN0aW9uIHBhZDJkaWdpdHMobnVtKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nKG51bSkucGFkU3RhcnQoMiwgJzAnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkRGF0ZSAoZGF0ZSkge1xyXG4gICAgcmV0dXJuIFtkYXRlLmdldEZ1bGxZZWFyKCksIHBhZDJkaWdpdHMoZGF0ZS5nZXRNb250aCgpICsgMSksIHBhZDJkaWdpdHMoZGF0ZS5nZXREYXRlKCkpXS5qb2luKCctJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbHRlclRvZGF5KGRhdGUpIHtcclxuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBkYXRlLnNwbGl0KCdUJylbMF07XHJcbiAgICBjb25zdCB0b2RheSA9IGdldEZvcm1hdHRlZERhdGUobmV3IERhdGUoKSk7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVkRGF0ZSA9PT0gdG9kYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbHRlclVwY29taW5nKGRhdGUpIHtcclxuICAgIGxldCB0b3RhbFRpbWVGcm9tRGF0ZTtcclxuICAgIGlmKCFkYXRlLnNwbGl0KCdUJylbMV0pIHtcclxuICAgICAgICB0b3RhbFRpbWVGcm9tRGF0ZSA9IG5ldyBEYXRlKGRhdGUgKyBcIjAwOjAwOjAwXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0b3RhbFRpbWVGcm9tRGF0ZSA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRvdGFsVGltZUZyb21Ub2RheSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgcmV0dXJuIHRvdGFsVGltZUZyb21EYXRlID4gdG90YWxUaW1lRnJvbVRvZGF5O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Z2V0Rm9ybWF0dGVkRGF0ZSwgZmlsdGVyVG9kYXksIGZpbHRlclVwY29taW5nfTsiLCJpbXBvcnQgc2FuaXRpemUgZnJvbSAnLi9zYW5pdGl6ZXIuanMnO1xyXG5pbXBvcnQgcHJvamVjdEZ1bmN0aW9ucyBmcm9tICcuL3Byb2plY3QtZnVuY3Rpb25zLmpzJztcclxuXHJcbmNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15LXByb2plY3RzLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcbmNvbnN0IHRvZG9MaXN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0LXRpdGxlJyk7XHJcblxyXG5jb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tdGl0bGUnKTtcclxuY29uc3QgdG9kb0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLWRlc2NyaXB0aW9uJyk7XHJcbmNvbnN0IHRvZG9EdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLWR1ZWRhdGUgLmRhdGUnKTtcclxuY29uc3QgdG9kb0R1ZVRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tZHVlZGF0ZSAudGltZScpO1xyXG5jb25zdCB0b2RvUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tcHJpb3JpdHkgc3BhbicpO1xyXG5jb25zdCB0b2RvTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tbm90ZXMnKTtcclxuY29uc3QgcHJpb3JpdGllcyA9IFtcIk5vdCBJbXBvcnRhbnRcIiwgXCJOb3JtYWxcIiwgXCJJbXBvcnRhbnRcIl1cclxuXHJcbi8vIFRvZG8gRE9NXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvZG8gKHRvZG8sIGluZGV4KSB7XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY2FyZC1jb250YWluZXInKTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpO1xyXG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIHRvZG8ucHJvamVjdCk7XHJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1kb25lJywgdG9kby5kb25lKTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXAnLCB0b2RvLnByaW9yaXR5KTtcclxuICAgIGNvbnN0IEhUTUxTbmlwcGV0ID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZS1kZXNjcmlwdGlvbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGg0IGNsYXNzPVwidG9kby10aXRsZVwiPlxyXG4gICAgICAgICAgICAke3Nhbml0aXplKHRvZG8udGl0bGUpfVxyXG4gICAgICAgICAgICA8L2g0PlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cInRvZG8tZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICR7c2FuaXRpemUodG9kby5kZXNjcmlwdGlvbil9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1idG5zLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9kby1kb25lIGJ0bi1jaXJjbGVcIiB0aXRsZT0ke3RvZG8uZG9uZT8gXCJEb25lXCI6IFwiVG9kb1wifT48c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj4ke3RvZG8uZG9uZT8gXCJjaGVja19jaXJjbGVcIjogXCJyYWRpb19idXR0b25fdW5jaGVja2VkXCJ9PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9kby1kZXRhaWxzIGJ0bi1jaXJjbGVcIiB0aXRsZT1cIk1vcmUgRGV0YWlsc1wiPjxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPnN1bW1hcml6ZTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInByaW9yaXR5XCIgdGl0bGU9XCJQcmlvcml0eS0ke3ByaW9yaXRpZXNbdG9kby5wcmlvcml0eSAtIDFdfVwiPjwvc3Bhbj5cclxuICAgIGA7XHJcbiAgICBpdGVtLmlubmVySFRNTCA9IEhUTUxTbmlwcGV0O1xyXG4gICAgcmV0dXJuIGl0ZW07XHJcbn07XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUb2RvTGlzdChhcnJheSwgaW5kZXgsIHRpdGxlKSB7XHJcbiAgICBjb25zdCB0b2RvTGlzdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0cycpO1xyXG4gICAgdG9kb0xpc3RzRGl2LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdG9kb0xpc3RUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBsZXQgdG9kb3NUb0Rpc3BsYXk7XHJcbiAgICBpZiAoaW5kZXggPT09ICdhbGxMaXN0cycpIHtcclxuICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IHByb2plY3RGdW5jdGlvbnMuZ2V0QWxsTGlzdHMoYXJyYXkpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gJ3RvZGF5TGlzdCcpIHtcclxuICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IHByb2plY3RGdW5jdGlvbnMuZ2V0VG9kYXlMaXN0KGFycmF5KTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT09ICd1cGNvbWluZ0xpc3QnKSB7XHJcbiAgICAgICAgdG9kb3NUb0Rpc3BsYXkgPSBwcm9qZWN0RnVuY3Rpb25zLmdldFVwY29taW5nTGlzdChhcnJheSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvZG9zVG9EaXNwbGF5ID0gWy4uLmFycmF5W2luZGV4XS5saXN0Lm1hcCgodG9kbywgaW5kZXgpID0+IChcclxuICAgICAgICAgICAge3RvZG8sIGluZGV4fVxyXG4gICAgICAgICkpXTtcclxuICAgIH1cclxuXHJcbiAgICB0b2Rvc1RvRGlzcGxheS5mb3JFYWNoKCh7dG9kbywgaW5kZXh9KSA9PiB7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlVG9kbyh0b2RvLCBpbmRleCkpO1xyXG4gICAgfSlcclxuICAgIHRvZG9MaXN0c0Rpdi5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbn1cclxuXHJcbi8vIFByb2plY3QgRE9NXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QocHJvamVjdCwgaW5kZXgpIHtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdsaW5rLWJ0bicpO1xyXG4gICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBlZGl0QnRuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnRWRpdCBQcm9qZWN0Jyk7XHJcbiAgICBjb25zdCBlZGl0U3ltYm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgZWRpdFN5bWJvbC5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICBlZGl0U3ltYm9sLnRleHRDb250ZW50ID0gJ2VkaXQnO1xyXG4gICAgZWRpdEJ0bi5hcHBlbmRDaGlsZChlZGl0U3ltYm9sKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpO1xyXG4gICAgcHJpb3JpdHkuc2V0QXR0cmlidXRlKCd0aXRsZScsIGBQcmlvcml0eS0ke3ByaW9yaXRpZXNbcHJvamVjdC5wcmlvcml0eSAtIDFdfWApO1xyXG5cclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdsaW5rLWJ0bicsICdwcm9qZWN0LWJ0bicpO1xyXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleCk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIHByb2plY3QudGl0bGUpO1xyXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1wJywgcHJvamVjdC5wcmlvcml0eSlcclxuICAgIFxyXG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0QnRuKTtcclxuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChwcmlvcml0eSk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGluZGV4KTtcclxuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgICByZXR1cm4ge2J1dHRvbjogYnV0dG9uLCBvcHRpb246IG9wdGlvbn07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RMaXN0KGFycmF5KSB7XHJcbiAgICBwcm9qZWN0c0Rpdi5pbm5lckhUTUwgPSAnJztcclxuICAgIHRvZG9Qcm9qZWN0LmlubmVySFRNTCA9ICc8b3B0aW9uIHZhbHVlPVwiMFwiIHNlbGVjdGVkPkhvbWU8L29wdGlvbj4nO1xyXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IGNyZWF0ZVByb2plY3QoYXJyYXlbaV0sIGkpO1xyXG4gICAgICAgIHByb2plY3RzRGl2LmFwcGVuZENoaWxkKHByb2plY3RPYmouYnV0dG9uKTtcclxuICAgICAgICB0b2RvUHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0T2JqLm9wdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFRvZG8gRGV0YWlscyBQYWdlXHJcbmZ1bmN0aW9uIGRpc3BsYXlUb2RvRGV0YWlscyh0b2RvKSB7XHJcbiAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xyXG4gICAgdG9kb0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5kZXNjcmlwdGlvbjtcclxuICAgIHRvZG9EdWVEYXRlLnRleHRDb250ZW50ID0gdG9kby5kdWVEYXRlLnNwbGl0KCdUJylbMF07XHJcbiAgICB0b2RvRHVlVGltZS50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZS5zcGxpdCgnVCcpWzFdO1xyXG4gICAgdG9kb1ByaW9yaXR5LmlubmVySFRNTCA9ICcnO1xyXG4gICAgY29uc3QgcHJpb3JpdHlBcnIgPSBbJ05vdCBJbXBvcnRhbnQnLCAnTm9ybWFsJywgJ0ltcG9ydGFudCddO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRvZG8ucHJpb3JpdHk7IGkrKykge1xyXG4gICAgICAgIHRvZG9Qcmlvcml0eS5pbm5lckhUTUwgKz0gJzxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPnN0YXI8L3NwYW4+JztcclxuICAgIH1cclxuICAgIHRvZG9Qcmlvcml0eS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgcHJpb3JpdHlBcnJbdG9kby5wcmlvcml0eSAtIDFdKTtcclxuICAgIHRvZG9Ob3Rlcy50ZXh0Q29udGVudCA9IHRvZG8ubm90ZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtjcmVhdGVUb2RvLCBjcmVhdGVQcm9qZWN0LCB1cGRhdGVUb2RvTGlzdCwgdXBkYXRlUHJvamVjdExpc3QsIGRpc3BsYXlUb2RvRGV0YWlsc307IiwiaW1wb3J0IGRhdGVGdW5jdGlvbnMgZnJvbSAnLi9kYXRlLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIG9ian0gZnJvbSAnLi90b2RvLWZ1bmN0aW9ucyc7XHJcbmNvbnN0IHtjaGFuZ2VUaXRsZSwgY2hhbmdlUHJpb3JpdHl9ID0gb2JqO1xyXG5cclxuZnVuY3Rpb24gZ2V0QWxsTGlzdHMgKHByb2plY3RzKSB7XHJcbiAgICBsZXQgYXJyID0gW107XHJcbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgIGFyciA9IFsuLi5hcnIsIC4uLnByb2plY3QubGlzdC5tYXAoKHRvZG8sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgIHt0b2RvLCBpbmRleH1cclxuICAgICAgICApKV07XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGFycjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9kYXlMaXN0IChwcm9qZWN0cykge1xyXG4gICAgY29uc3QgYWxsTGlzdHMgPSBnZXRBbGxMaXN0cyhwcm9qZWN0cyk7XHJcbiAgICBjb25zdCB0b2RheUxpc3QgPSBhbGxMaXN0cy5maWx0ZXIoKHt0b2RvLCBpbmRleH0pID0+IHtcclxuICAgICAgICByZXR1cm4gZGF0ZUZ1bmN0aW9ucy5maWx0ZXJUb2RheSh0b2RvLmR1ZURhdGUpO1xyXG4gICAgfSlcclxuICAgIHJldHVybiB0b2RheUxpc3Q7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFVwY29taW5nTGlzdCAocHJvamVjdHMpIHtcclxuICAgIGNvbnN0IGFsbExpc3RzID0gZ2V0QWxsTGlzdHMocHJvamVjdHMpO1xyXG4gICAgY29uc3QgdXBjb21pbmdMaXN0ID0gYWxsTGlzdHMuZmlsdGVyKCh7dG9kbywgaW5kZXh9KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGVGdW5jdGlvbnMuZmlsdGVyVXBjb21pbmcodG9kby5kdWVEYXRlKTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gdXBjb21pbmdMaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBlZGl0UHJvamVjdChwcm9qZWN0LCBuZXdUaXRsZSwgbmV3UHJpb3JpdHkpIHtcclxuICAgIGNoYW5nZVRpdGxlKHByb2plY3QsIG5ld1RpdGxlKTtcclxuICAgIGNoYW5nZVByaW9yaXR5KHByb2plY3QsIG5ld1ByaW9yaXR5KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2dldEFsbExpc3RzLCBnZXRUb2RheUxpc3QsIGdldFVwY29taW5nTGlzdCwgZWRpdFByb2plY3R9OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RNYWtlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgcHJpb3JpdHkpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHt0aXRsZSwgcHJpb3JpdHl9KTtcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIH1cclxufSIsIi8vIHNhbml0aXplciB0byB1c2UgaW5uZXJIVE1MIHdpdGhvdXQgc2VjdXJpdHkgY29uY2VyblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYW5pdGl6ZShpbnB1dCkge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYudGV4dENvbnRlbnQgPSBpbnB1dDtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59IiwiY29uc3QgdGhlbWVTd2l0Y2hCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlbWUtc3dpdGNoLWJ0bicpO1xyXG5jb25zdCB0aGVtZVN3aXRjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ0aGVtZS1zd2l0Y2hcIl0nKTtcclxuY29uc3Qgc2lkZWJhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLWJhci10b2dnbGUnKTtcclxuXHJcbi8vIE1hdGNoIHVzZXIgVGhlbWVcclxuaWYod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2RhcmsnKTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b25Db250YWluZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiTGlnaHQgTW9kZVwiKTtcclxufSBlbHNlIHtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnbGlnaHQnKTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkRhcmsgTW9kZVwiKTtcclxufVxyXG5cclxuLy8gVG9nZ2xlIFRoZW1lIG9uIENsaWNrXHJcbnRoZW1lU3dpdGNoQnV0dG9uQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGlmKCF0aGVtZVN3aXRjaEJ1dHRvbi5jaGVja2VkKSB7XHJcbiAgICAgICAgdGhlbWVTd2l0Y2hCdXR0b24uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdkYXJrJyk7XHJcbiAgICAgICAgdGhlbWVTd2l0Y2hCdXR0b25Db250YWluZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiU3dpdGNoIHRvIExpZ2h0XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGVtZVN3aXRjaEJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdsaWdodCcpO1xyXG4gICAgICAgIHRoZW1lU3dpdGNoQnV0dG9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIlN3aXRjaCB0byBEYXJrXCIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIFRvZ2dsZSBTaWRlYmFyXHJcbmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlLWJhcicpO1xyXG5zaWRlYmFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LXNpZGUtYmFyJyk7XHJcbn0pIiwiaW1wb3J0IFRvZG9NYWtlciBmcm9tICcuL3RvZG8tbWFrZXInO1xyXG5cclxuZnVuY3Rpb24gY2hhbmdlVGl0bGUodG9kbywgbmV3VGl0bGUpIHtcclxuICAgIHRvZG8udGl0bGUgPSBuZXdUaXRsZTtcclxufVxyXG5mdW5jdGlvbiBjaGFuZ2VEZXNjcmlwdGlvbih0b2RvLCBuZXdEZXNjcmlwdGlvbikge1xyXG4gICAgdG9kby5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xyXG59XHJcbmZ1bmN0aW9uIGNoYW5nZUR1ZURhdGUgKHRvZG8sIG5ld0RhdGUpIHtcclxuICAgIHRvZG8uZHVlRGF0ZSA9IG5ld0RhdGU7XHJcbn1cclxuZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHkgKHRvZG8sIG5ld1ByaW9yaXR5KSB7XHJcbiAgICB0b2RvLnByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XHJcbn1cclxuZnVuY3Rpb24gY2hhbmdlTm90ZXMgKHRvZG8sIG5ld05vdGVzKSB7XHJcbiAgICB0b2RvLm5vdGVzID0gbmV3Tm90ZXM7XHJcbn1cclxuZnVuY3Rpb24gY2hhbmdlU3RhdGUgKHRvZG8pIHtcclxuICAgIHRvZG8uZG9uZSA9IHRvZG8uZG9uZSA/IGZhbHNlIDogdHJ1ZTtcclxufVxyXG5mdW5jdGlvbiBkZWxldGVJdGVtIChhcnJheSwgaW5kZXgpIHtcclxuICAgIHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBlZGl0VG9kbyhwcm9qZWN0cywgdG9kbywgbmV3VGl0bGUsIG5ld0RlcywgbmV3RHVlRGF0ZSwgbmV3UHJpb3JpdHksIG5ld05vdGVzLCBuZXdQcm9qZWN0KSB7XHJcbiAgICBpZih0b2RvLnByb2plY3RJbmRleCAhPT0gbmV3UHJvamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUb2RvID0gcHJvamVjdHNbdG9kby5wcm9qZWN0SW5kZXhdLmxpc3RbdG9kby5pbmRleF07XHJcbiAgICAgICAgcHJvamVjdHNbdG9kby5wcm9qZWN0SW5kZXhdLmxpc3Quc3BsaWNlKHRvZG8uaW5kZXgsIDEpO1xyXG4gICAgICAgIHByb2plY3RzW25ld1Byb2plY3RdLmxpc3QucHVzaChuZXcgVG9kb01ha2VyKG5ld1RpdGxlLCBuZXdEZXMsIG5ld0R1ZURhdGUsIG5ld1ByaW9yaXR5LCBuZXdOb3RlcywgY3VycmVudFRvZG8uZG9uZSwgbmV3UHJvamVjdCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBlZGl0aW5nVG9kbyA9IHByb2plY3RzW3RvZG8ucHJvamVjdEluZGV4XS5saXN0W3RvZG8uaW5kZXhdO1xyXG4gICAgICAgIGNoYW5nZVRpdGxlKGVkaXRpbmdUb2RvLCBuZXdUaXRsZSk7XHJcbiAgICAgICAgY2hhbmdlRGVzY3JpcHRpb24oZWRpdGluZ1RvZG8sIG5ld0Rlcyk7XHJcbiAgICAgICAgY2hhbmdlRHVlRGF0ZShlZGl0aW5nVG9kbywgbmV3RHVlRGF0ZSk7XHJcbiAgICAgICAgY2hhbmdlUHJpb3JpdHkoZWRpdGluZ1RvZG8sIG5ld1ByaW9yaXR5KTtcclxuICAgICAgICBjaGFuZ2VOb3RlcyhlZGl0aW5nVG9kbywgbmV3Tm90ZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Y2hhbmdlVGl0bGUsIGNoYW5nZVByaW9yaXR5LCBlZGl0VG9kbywgY2hhbmdlU3RhdGUsIGRlbGV0ZUl0ZW19OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9NYWtlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0fSk7XHJcbiAgICB9O1xyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBEZXBlbmRlbmNpZXNcclxuaW1wb3J0ICdtYXRlcmlhbC1zeW1ib2xzL291dGxpbmVkLmNzcyc7XHJcbmltcG9ydCAnLi9zdHlsZS9zdHlsZS5zY3NzJztcclxuaW1wb3J0ICcuL21vZHVsZXMvdGhlbWUmc2lkZWJhcic7XHJcbmltcG9ydCBUb2RvTWFrZXIgZnJvbSAnLi9tb2R1bGVzL3RvZG8tbWFrZXInO1xyXG5pbXBvcnQgUHJvamVjdE1ha2VyIGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LW1ha2VyJztcclxuaW1wb3J0IFRvZG9GdW5jdGlvbnMgZnJvbSAnLi9tb2R1bGVzL3RvZG8tZnVuY3Rpb25zJztcclxuaW1wb3J0IERvbUZ1bmN0aW9ucyBmcm9tICcuL21vZHVsZXMvZG9tLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBQcm9qZWN0RnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBEYXRlRnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy9kYXRlLmpzJztcclxuXHJcblxyXG4vLyBET00gRWxlbWVudHNcclxuY29uc3QgdG9kb0xpc3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0cycpO1xyXG5jb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1wcm9qZWN0cy1jb250YWluZXInKTtcclxuY29uc3QgdG9kb0RldGFpbHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscy1jYXJkLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzLWNhcmQnKTtcclxuLy8gSW5wdXRzXHJcbmNvbnN0IHRvZG9Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tY29udGFpbmVyJyk7XHJcbmNvbnN0IHRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10b2RvLWZvcm0nKTtcclxuY29uc3QgcHJvamVjdEZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLWNvbnRhaW5lcicpO1xyXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0nKTtcclxuLy8gVG9kbyBJbnB1dHNcclxuY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XHJcbmNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xyXG5jb25zdCB0b2RvRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJyk7XHJcbmNvbnN0IHRvZG9UaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWUnKTtcclxuY29uc3QgdG9kb1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5Jyk7XHJcbmNvbnN0IHRvZG9Ob3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3RlcycpO1xyXG5jb25zdCB0b2RvUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcbi8vIFByb2plY3QgSW5wdXRzXHJcbmNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJyk7XHJcbmNvbnN0IHByb2plY3RQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXByaW9yaXR5Jyk7XHJcblxyXG4vLyBGb3JtIEJ1dHRvbnNcclxuY29uc3Qgb3BlblRvZG9Gb3JtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wZW4tdG9kby1mb3JtLWJ0bicpO1xyXG5jb25zdCBhZGRUb2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10b2RvLWJ0bicpO1xyXG5jb25zdCBvcGVuUHJvamVjdEZvcm1CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcHJvamVjdC1mb3JtLWJ0bicpO1xyXG5jb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ0bicpO1xyXG5jb25zdCBjYW5jZWxCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1jYW5jZWwnKTtcclxuY29uc3QgcmVtb3ZlUHJvamVjdEJ0biA9IHByb2plY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2lyY2xlJyk7XHJcblxyXG4vLyBQcm9qZWN0IEJ1dHRvbnNcclxuY29uc3QgaG9tZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIkhvbWVcIl0nKTtcclxuY29uc3QgYWxsTGlzdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJBbGwgTGlzdHNcIl0nKTtcclxuY29uc3QgdG9kYXlMaXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiVG9kYXlcIl0nKTtcclxuY29uc3QgdXBjb21pbmdMaXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiVXBjb21pbmdcIl0nKTtcclxuY29uc3QgbXlQcm9qZWN0c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIk15IFByb2plY3RzXCJdJyk7XHJcblxyXG4vLyBJbml0aWFsaXplIHZhcmlhYmxlc1xyXG5sZXQgcHJvamVjdHMgPSBbXTtcclxubGV0IGN1cnJlbnRQYWdlID0gbnVsbDtcclxubGV0IGVkaXRpbmdUb2RvID0gZmFsc2U7XHJcbmxldCBlZGl0aW5nUHJvamVjdCA9IGZhbHNlO1xyXG5cclxuXHJcbi8vIEFkZCBUb2RvIEl0ZW1cclxuZnVuY3Rpb24gYWRkVG9kb0l0ZW0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0KSB7XHJcbiAgICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG9NYWtlcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCk7XHJcbiAgICBwcm9qZWN0c1twcm9qZWN0XS5saXN0LnB1c2gobmV3VG9kbyk7XHJcbiAgICB1cGRhdGVQYWdlKHByb2plY3QpO1xyXG59XHJcblxyXG5cclxuLy8gQ2hhbmdpbmcgdG9kbyBkb25lIHN0YXR1c1xyXG5mdW5jdGlvbiB1cGRhdGVEb25lU3RhdHVzKHByb2plY3RJbmRleCwgdG9kbykge1xyXG4gICAgVG9kb0Z1bmN0aW9ucy5jaGFuZ2VTdGF0ZShwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbdG9kb10pO1xyXG4gICAgdXBkYXRlUGFnZShwcm9qZWN0SW5kZXgpO1xyXG59XHJcblxyXG5cclxuLy8gUmVtb3ZlIFRvZG8gSXRlbVxyXG5mdW5jdGlvbiByZW1vdmVUb2RvSXRlbSAocHJvamVjdEluZGV4LCBpbmRleCkge1xyXG4gICAgVG9kb0Z1bmN0aW9ucy5kZWxldGVJdGVtKHByb2plY3RzW3Byb2plY3RJbmRleF0ubGlzdCwgaW5kZXgpO1xyXG4gICAgdXBkYXRlUGFnZShwcm9qZWN0SW5kZXgpO1xyXG4gICAgdG9kb0RldGFpbHNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG59XHJcblxyXG4vLyBBZGQgUHJvamVjdFxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0IChuYW1lLCBwcmlvcml0eSkge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0TWFrZXIobmFtZSwgcHJpb3JpdHkpO1xyXG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIHVwZGF0ZVByb2plY3RzKCk7XHJcbiAgICBwcm9qZWN0c0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB1cGRhdGVQYWdlKHByb2plY3RzLmxlbmd0aCAtIDEpO1xyXG59XHJcblxyXG4vLyBSZW1vdmUgUHJvamVjdFxyXG5mdW5jdGlvbiByZW1vdmVQcm9qZWN0IChpbmRleCkge1xyXG4gICAgVG9kb0Z1bmN0aW9ucy5kZWxldGVJdGVtKHByb2plY3RzLCBpbmRleCk7XHJcbiAgICB1cGRhdGVQcm9qZWN0cygpO1xyXG4gICAgaWYoY3VycmVudFBhZ2UpIHVwZGF0ZVBhZ2UoMCk7XHJcbiAgICBjbG9zZUZvcm0ocHJvamVjdEZvcm0pO1xyXG4gICAgdXBkYXRlRGF0YSgpO1xyXG59XHJcblxyXG4vLyBVcGRhdGUgUGFnZSBiYXNlZCBvbiBjdXJyZW50UGFnZVxyXG5mdW5jdGlvbiB1cGRhdGVQYWdlKHByb2plY3RJbmRleCkge1xyXG4gICAgc3dpdGNoKGN1cnJlbnRQYWdlKXtcclxuICAgICAgICBjYXNlICdhbGxMaXN0cyc6XHJcbiAgICAgICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgJ2FsbExpc3RzJywgJ0FsbCBMaXN0cycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b2RheUxpc3QnOlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsICd0b2RheUxpc3QnLCAnVG9kYXkgTGlzdCcpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd1cGNvbWluZ0xpc3QnOlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsICd1cGNvbWluZ0xpc3QnLCAnVXBjb21pbmcgTGlzdCcpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3RJbmRleCwgcHJvamVjdHNbcHJvamVjdEluZGV4XS50aXRsZSk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIHVwZGF0ZURhdGEoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdHMoKSB7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlUHJvamVjdExpc3QocHJvamVjdHMpO1xyXG4gICAgY29uc3QgcHJvamVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcclxuICAgIHByb2plY3RCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgdXBkYXRlUGFnZShpbmRleCk7XHJcbiAgICAgICAgICAgIGNsb3NlU2lkZWJhcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RFZGl0QnRuID0gYnRuLnF1ZXJ5U2VsZWN0b3IoJy5saW5rLWJ0bicpO1xyXG4gICAgICAgIHByb2plY3RFZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZWRpdGluZ1Byb2plY3QgPSBpbmRleDtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgc2hvd1Byb2plY3RFZGl0Rm9ybShpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBwcm9qZWN0Rm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbn1cclxuXHJcbi8vIFRvZ2dsZSBUb2RvIEZvcm0gT3BlbiBVcFxyXG5vcGVuVG9kb0Zvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBhZGRUb2RvQnRuLnRleHRDb250ZW50ID0gJ0FkZCBUb2RvJztcclxuICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxufSk7XHJcbnRvZG9Gb3JtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY2xvc2VGb3JtKHRvZG9Gb3JtKTtcclxufSk7XHJcbnRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG5cclxuLy8gVG9nZ2xlIFByb2plY3QgRm9ybSBPcGVuIFVwXHJcbm9wZW5Qcm9qZWN0Rm9ybUJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGFkZFByb2plY3RCdG4udGV4dENvbnRlbnQgPSAnQWRkIFByb2plY3QnO1xyXG4gICAgICAgIHByb2plY3RGb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG59KVxyXG5wcm9qZWN0Rm9ybUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNsb3NlRm9ybShwcm9qZWN0Rm9ybSk7XHJcbn0pO1xyXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKX0pO1xyXG5cclxuLy8gY2FuY2VsIGJ1dHRvbnNcclxuY2FuY2VsQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VGb3JtKGJ0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgfSlcclxufSlcclxuXHJcbi8vIEVkaXQgVG9kbyBGb3JtXHJcbmZ1bmN0aW9uIHNob3dFZGl0Rm9ybShwcm9qZWN0SW5kZXgsIGluZGV4KSB7XHJcbiAgICBlZGl0aW5nVG9kbyA9IHtwcm9qZWN0SW5kZXgsIGluZGV4fTtcclxuICAgIGNvbnN0IHRvZG8gPSBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbaW5kZXhdO1xyXG4gICAgY29uc29sZS5sb2codG9kbyk7XHJcbiAgICB0b2RvVGl0bGUudmFsdWUgPSB0b2RvLnRpdGxlO1xyXG4gICAgdG9kb0Rlc2NyaXB0aW9uLnZhbHVlID0gdG9kby5kZXNjcmlwdGlvbjtcclxuICAgIHRvZG9EYXRlLnZhbHVlID0gdG9kby5kdWVEYXRlLnNwbGl0KCdUJylbMF07XHJcbiAgICB0b2RvVGltZS52YWx1ZSA9IHRvZG8uZHVlRGF0ZS5zcGxpdCgnVCcpWzFdO1xyXG4gICAgdG9kb1ByaW9yaXR5LnZhbHVlID0gdG9kby5wcmlvcml0eTtcclxuICAgIHRvZG9Ob3Rlcy52YWx1ZSA9IHRvZG8ubm90ZXM7XHJcbiAgICB0b2RvUHJvamVjdC52YWx1ZSA9IHRvZG8ucHJvamVjdDtcclxuICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIHRvZG9EZXRhaWxzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIGFkZFRvZG9CdG4udGV4dENvbnRlbnQgPSAnU2F2ZSBDaGFuZ2VzJztcclxufVxyXG5cclxuLy8gRWRpdCBQcm9qZWN0Rm9ybVxyXG5mdW5jdGlvbiBzaG93UHJvamVjdEVkaXRGb3JtKHByb2plY3RJbmRleCkge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzW3Byb2plY3RJbmRleF07XHJcbiAgICBwcm9qZWN0VGl0bGUudmFsdWUgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgcHJvamVjdFByaW9yaXR5LnZhbHVlID0gcHJvamVjdC5wcmlvcml0eTtcclxuICAgIHByb2plY3RGb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIHByb2plY3RGb3JtLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIHByb2plY3RJbmRleCk7XHJcbiAgICBhZGRQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gJ1NhdmUgQ2hhbmdlcyc7XHJcbiAgICByZW1vdmVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VGb3JtKGZvcm0pIHtcclxuICAgIGVkaXRpbmdUb2RvID0gZmFsc2U7XHJcbiAgICBlZGl0aW5nUHJvamVjdCA9IGZhbHNlO1xyXG4gICAgZm9ybS5yZXNldCgpO1xyXG4gICAgZm9ybS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIHJlbW92ZVByb2plY3RCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG59XHJcblxyXG4vLyBBZGQvRWRpdCB0b2RvIGl0ZW0gb24gRm9ybSBzdWJtaXRcclxuYWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZih0b2RvRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICBjb25zdCBkdWVEYXRlID0gdG9kb0RhdGUudmFsdWUgKyAnVCcgKyB0b2RvVGltZS52YWx1ZTtcclxuICAgICAgICBpZihlZGl0aW5nVG9kbykge1xyXG4gICAgICAgICAgICBUb2RvRnVuY3Rpb25zLmVkaXRUb2RvKHByb2plY3RzLCBlZGl0aW5nVG9kbywgdG9kb1RpdGxlLnZhbHVlLCB0b2RvRGVzY3JpcHRpb24udmFsdWUsIGR1ZURhdGUsIHRvZG9Qcmlvcml0eS52YWx1ZSwgdG9kb05vdGVzLnZhbHVlLCArdG9kb1Byb2plY3QudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFkZFRvZG9JdGVtKHRvZG9UaXRsZS52YWx1ZSwgdG9kb0Rlc2NyaXB0aW9uLnZhbHVlLCBkdWVEYXRlLCB0b2RvUHJpb3JpdHkudmFsdWUsIHRvZG9Ob3Rlcy52YWx1ZSwgZmFsc2UsICt0b2RvUHJvamVjdC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVwZGF0ZVBhZ2UodG9kb1Byb2plY3QudmFsdWUpO1xyXG4gICAgICAgIGNsb3NlRm9ybSh0b2RvRm9ybSk7XHJcbiAgICAgICAgY2xvc2VTaWRlYmFyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvZG9Gb3JtLnJlcG9ydFZhbGlkaXR5KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gQWRkL0VkaXQgcHJvamVjdCBvbiBGb3JtIHN1Ym1pdFxyXG5hZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmKHByb2plY3RGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xyXG4gICAgICAgIGlmKGVkaXRpbmdQcm9qZWN0KSB7XHJcbiAgICAgICAgICAgIFByb2plY3RGdW5jdGlvbnMuZWRpdFByb2plY3QocHJvamVjdHNbZWRpdGluZ1Byb2plY3RdLCBwcm9qZWN0VGl0bGUudmFsdWUsIHByb2plY3RQcmlvcml0eS52YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmKHByb2plY3RUaXRsZS52YWx1ZSAmJiBwcm9qZWN0UHJpb3JpdHkudmFsdWUpIHtcclxuICAgICAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUsIHByb2plY3RQcmlvcml0eS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVwZGF0ZVByb2plY3RzKCk7XHJcbiAgICAgICAgY2xvc2VGb3JtKHByb2plY3RGb3JtKTtcclxuICAgICAgICBjbG9zZVNpZGViYXIoKTtcclxuICAgICAgICB1cGRhdGVEYXRhKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2plY3RGb3JtLnJlcG9ydFZhbGlkaXR5KCk7XHJcbiAgICB9XHJcbn0pXHJcblxyXG4vLyBSZW1vdmUgUHJvamVjdFxyXG5yZW1vdmVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBpbmRleCA9ICsgdGhpcy5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgcmVtb3ZlUHJvamVjdChpbmRleCk7XHJcbn0pXHJcblxyXG4vLyBOYXZpZ2F0ZSBQcm9qZWN0c1xyXG5ob21lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY3VycmVudFBhZ2UgPSBudWxsO1xyXG4gICAgdXBkYXRlUGFnZSgwKTtcclxuICAgIGNsb3NlU2lkZWJhcigpO1xyXG59KTtcclxubXlQcm9qZWN0c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHByb2plY3RzRGl2LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgIGNvbnN0IGljb24gPSBteVByb2plY3RzQnRuLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcclxuICAgIGljb24udGV4dENvbnRlbnQgPSBpY29uLnRleHRDb250ZW50ID09PSAnZXhwYW5kX21vcmUnID8gJ2V4cGFuZF9sZXNzJyA6ICdleHBhbmRfbW9yZSc7XHJcbn0pO1xyXG5hbGxMaXN0c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGN1cnJlbnRQYWdlID0gJ2FsbExpc3RzJztcclxuICAgIHVwZGF0ZVBhZ2UoKTtcclxuICAgIGNsb3NlU2lkZWJhcigpO1xyXG59KVxyXG50b2RheUxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjdXJyZW50UGFnZSA9ICd0b2RheUxpc3QnO1xyXG4gICAgdXBkYXRlUGFnZSgpO1xyXG4gICAgY2xvc2VTaWRlYmFyKCk7XHJcbn0pXHJcbnVwY29taW5nTGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGN1cnJlbnRQYWdlID0gJ3VwY29taW5nTGlzdCc7XHJcbiAgICB1cGRhdGVQYWdlKCk7XHJcbiAgICBjbG9zZVNpZGViYXIoKTtcclxufSlcclxuXHJcbi8vIERldGFpbHMgQ29udGFpbmVyXHJcbmZ1bmN0aW9uIHNob3dUb2RvRGV0YWlscyhwcm9qZWN0SW5kZXgsIGluZGV4KSB7XHJcbiAgICBjb25zdCB0b2RvID0gcHJvamVjdHNbcHJvamVjdEluZGV4XS5saXN0W2luZGV4XTtcclxuICAgIERvbUZ1bmN0aW9ucy5kaXNwbGF5VG9kb0RldGFpbHModG9kbyk7XHJcbiAgICBjb25zdCB0b2RvRWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWVkaXQtYnRuJyk7XHJcbiAgICBjb25zdCB0b2RvRGVsZXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tZGVsLWJ0bicpO1xyXG4gICAgdG9kb0RlbGV0ZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHJlbW92ZVRvZG9JdGVtKHRvZG8ucHJvamVjdCwgaW5kZXgpO1xyXG4gICAgfTtcclxuICAgIHRvZG9FZGl0QnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2hvd0VkaXRGb3JtKHByb2plY3RJbmRleCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgdG9kb0RldGFpbHNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgdG9kb0RldGFpbHNEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdG9kb0RldGFpbHNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgfSk7XHJcbn07XHJcbnRvZG9EZXRhaWxzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG4vLyBSZWZyZXNoIEV2ZW50IExpc3RlbmVyc1xyXG5mdW5jdGlvbiByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCB0b2RvRG9uZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1kb25lJyk7XHJcbiAgICBjb25zdCB0b2RvRGV0YWlsc0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1kZXRhaWxzJyk7XHJcblxyXG4gICAgdG9kb0RvbmVCdG5zLmZvckVhY2goZG9uZUJ0biA9PiB7XHJcbiAgICAgICAgZG9uZUJ0bi5vbmNsaWNrID0gIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSArIGRvbmVCdG4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSArIGRvbmVCdG4ucGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgICAgIHVwZGF0ZURvbmVTdGF0dXMocHJvamVjdEluZGV4LCBpbmRleCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgdG9kb0RldGFpbHNCdG5zLmZvckVhY2goZGV0YWlsc0J0biA9PiB7XHJcbiAgICAgICAgZGV0YWlsc0J0bi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICsgZGV0YWlsc0J0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9ICsgZGV0YWlsc0J0bi5wYXJlbnROb2RlLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKTtcclxuICAgICAgICAgICAgc2hvd1RvZG9EZXRhaWxzKHByb2plY3RJbmRleCwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHNtYWxsU2NyZWVuID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA3NjBweClcIik7XHJcbmZ1bmN0aW9uIGNsb3NlU2lkZWJhcigpIHtcclxuICAgIGlmKHNtYWxsU2NyZWVuLm1hdGNoZXMpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctc2lkZS1iYXInKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSgpIHtcclxuICAgIGNvbnN0IHByb2plY3RzU3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ215LXByb2plY3RzJyk7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zdCBuZXh0V2VlayA9IG5ldyBEYXRlKHRvZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNykpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IERhdGVGdW5jdGlvbnMuZ2V0Rm9ybWF0dGVkRGF0ZShuZXh0V2VlaykgKyBcIlQxMjowMDowMFwiO1xyXG4gICAgaWYocHJvamVjdHNTdHJpbmcpIHtcclxuICAgICAgICBwcm9qZWN0cyA9IEpTT04ucGFyc2UocHJvamVjdHNTdHJpbmcpO1xyXG4gICAgICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgICAgICAgcHJvamVjdC5saXN0LmZvckVhY2goKHRvZG8pID0+IHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0b2RvLCBUb2RvTWFrZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvamVjdCwgUHJvamVjdE1ha2VyKTtcclxuICAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9qZWN0cyA9IFtuZXcgUHJvamVjdE1ha2VyKCdIb21lJywgbnVsbCldO1xyXG4gICAgICAgIGFkZFRvZG9JdGVtKFxyXG4gICAgICAgICAgICBcIkhvdyBUbyBVc2UgP1wiLFxyXG4gICAgICAgICAgICBcIkNoZWNrIHRoaXMgdG9kbyB0byBsZWFybiBob3cgdG8gdXNlIHRoaXMgd2ViIGFwcFwiLFxyXG4gICAgICAgICAgICBmb3JtYXR0ZWREYXRlLFxyXG4gICAgICAgICAgICAzLFxyXG4gICAgICAgICAgICBcIlRoaW5ncyBZb3UgY2FuIGRvICFcXG4tIEFkZCB0b2RvIGl0ZW1zIHdpdGggQWRkIG5ldyB0YXNrIGJ1dHRvblxcbi0gQWRkIG5ldyBwcm9qZWN0cyB3aXRoIHRoZSBuZXcgcHJvamVjdCBidXR0b25cXG4tIE1hcmsgVG9kb3MgZG9uZS91bmRvbmVcXG4tIEVkaXQvRGVsZXRlIGFkZGVkIGl0ZW1zIGFuZCBwcm9qZWN0c1wiLFxyXG4gICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVQYWdlKDApO1xyXG4gICAgdXBkYXRlUHJvamVjdHMoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlRGF0YSgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdteS1wcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbn1cclxuXHJcbmdldERhdGEoKTtcclxuXHJcbi8vIFRFU1RJTkdcclxuXHJcbi8vIGFkZFByb2plY3QoXCJNeSBQcm9qZWN0IDFcIiwgMSk7XHJcbi8vIGFkZFByb2plY3QoXCJNeSBQcm9qZWN0IDJcIiwgMik7XHJcblxyXG4vLyBhZGRUb2RvSXRlbShcIkNvZGVcIiwgXCJXcml0ZSBjb2RlIGZvciB0aGUgbmV3IGZlYXR1cmVcIiwgXCIyMDI0LTAzLTA3VDEyOjAwOjAwXCIsIDEsIFwiYmxhaCBibGFoIGJsYWhcIiwgZmFsc2UsIDApO1xyXG4vLyBhZGRUb2RvSXRlbShcIlN0dWR5XCIsIFwiUHJlcGFyZSBmb3IgdGhlIHVwY29taW5nIGV4YW1cIiwgXCIyMDI0LTAzLTA4VDE0OjMwOjAwXCIsIDIsIFwiU3R1ZHkgZm9yIGV4YW1zXCIsIGZhbHNlLCAwKTtcclxuLy8gYWRkVG9kb0l0ZW0oXCJFeGVyY2lzZVwiLCBcIkdvIGZvciBhIGpvZyBpbiB0aGUgcGFya1wiLCBcIjIwMjQtMDMtMDlUMTg6MDA6MDBcIiwgMywgXCJHbyBmb3IgYSBydW5cIiwgZmFsc2UsIDEpO1xyXG4vLyBhZGRUb2RvSXRlbShcIlJlYWRcIiwgXCJGaW5pc2ggdGhlIGxhdGVzdCBub3ZlbFwiLCBcIjIwMjQtMDMtMTBUMTA6MDA6MDBcIiwgMSwgXCJSZWFkIGEgYm9va1wiLCBmYWxzZSwgMSk7XHJcbi8vIGFkZFRvZG9JdGVtKFwiTWVldGluZ1wiLCBcIkRpc2N1c3MgcHJvamVjdCB1cGRhdGVzXCIsIFwiMjAyNC0wMy0xMVQxNTo0NTowMFwiLCAyLCBcIkF0dGVuZCB0ZWFtIG1lZXRpbmdcIiwgZmFsc2UsIDIpO1xyXG4vLyBhZGRUb2RvSXRlbShcIlByb2plY3RcIiwgXCJXb3JrIG9uIFVJIGltcHJvdmVtZW50c1wiLCBcIjIwMjQtMDMtMTJUMDk6MzA6MDBcIiwgMywgXCJXb3JrIG9uIHByb2plY3RcIiwgZmFsc2UsIDIpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==