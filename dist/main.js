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
    const totalTimeFromDate = new Date(date).getTime();
    console.log(totalTimeFromDate);
    const totalTimeFromToday = new Date().getTime();
    console.log(totalTimeFromToday);
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
        projects.forEach(project => {
            Object.setPrototypeOf(project, _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"]);
            project.list.forEach(todo => {
                Object.setPrototypeOf(todo, _modules_todo_maker__WEBPACK_IMPORTED_MODULE_3__["default"]);
            })
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLXN5bWJvbHMvb3V0bGluZWQuY3NzPzYwZjQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHlsZS9zdHlsZS5zY3NzPzQ1NmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QtZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LW1ha2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9zYW5pdGl6ZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RoZW1lJnNpZGViYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8tZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLW1ha2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiZnVuY3Rpb24gY3JlYXRlRGF0ZSAoZGF0ZVN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzb3J0RGF0ZShhcnJheSkge1xyXG4gICAgcmV0dXJuIGFycmF5LnNvcnQoKGEsYikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGVBID0gY3JlYXRlRGF0ZShhKTtcclxuICAgICAgICBjb25zdCBkYXRlQiA9IGNyZWF0ZURhdGUoYik7XHJcbiAgICAgICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gVXNlIGR1ZURhdGUuZ2V0VGltZSgpIDwgdG9kYXkuZ2V0VGltZSgpIGZvciBjaGVja2luZyBkdWVcclxuXHJcbi8vIFBhZCAwcyBvbiBkYXkgJiBtb250aFxyXG5mdW5jdGlvbiBwYWQyZGlnaXRzKG51bSkge1xyXG4gICAgcmV0dXJuIFN0cmluZyhudW0pLnBhZFN0YXJ0KDIsICcwJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEZvcm1hdHRlZERhdGUgKGRhdGUpIHtcclxuICAgIHJldHVybiBbZGF0ZS5nZXRGdWxsWWVhcigpLCBwYWQyZGlnaXRzKGRhdGUuZ2V0TW9udGgoKSArIDEpLCBwYWQyZGlnaXRzKGRhdGUuZ2V0RGF0ZSgpKV0uam9pbignLScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJUb2RheShkYXRlKSB7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZGF0ZS5zcGxpdCgnVCcpWzBdO1xyXG4gICAgY29uc3QgdG9kYXkgPSBnZXRGb3JtYXR0ZWREYXRlKG5ldyBEYXRlKCkpO1xyXG4gICAgcmV0dXJuIGZvcm1hdHRlZERhdGUgPT09IHRvZGF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJVcGNvbWluZyhkYXRlKSB7XHJcbiAgICBjb25zdCB0b3RhbFRpbWVGcm9tRGF0ZSA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKTtcclxuICAgIGNvbnNvbGUubG9nKHRvdGFsVGltZUZyb21EYXRlKTtcclxuICAgIGNvbnN0IHRvdGFsVGltZUZyb21Ub2RheSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgY29uc29sZS5sb2codG90YWxUaW1lRnJvbVRvZGF5KTtcclxuICAgIHJldHVybiB0b3RhbFRpbWVGcm9tRGF0ZSA+IHRvdGFsVGltZUZyb21Ub2RheTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2dldEZvcm1hdHRlZERhdGUsIGZpbHRlclRvZGF5LCBmaWx0ZXJVcGNvbWluZ307IiwiaW1wb3J0IHNhbml0aXplIGZyb20gJy4vc2FuaXRpemVyLmpzJztcclxuaW1wb3J0IHByb2plY3RGdW5jdGlvbnMgZnJvbSAnLi9wcm9qZWN0LWZ1bmN0aW9ucy5qcyc7XHJcblxyXG5jb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1wcm9qZWN0cy1jb250YWluZXInKTtcclxuY29uc3QgdG9kb1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xyXG5jb25zdCB0b2RvTGlzdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC10aXRsZScpO1xyXG5cclxuY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLXRpdGxlJyk7XHJcbmNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXQtdG9kby1kZXNjcmlwdGlvbicpO1xyXG5jb25zdCB0b2RvRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXQtdG9kby1kdWVkYXRlIC5kYXRlJyk7XHJcbmNvbnN0IHRvZG9EdWVUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLWR1ZWRhdGUgLnRpbWUnKTtcclxuY29uc3QgdG9kb1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLXByaW9yaXR5IHNwYW4nKTtcclxuY29uc3QgdG9kb05vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLW5vdGVzJyk7XHJcbmNvbnN0IHByaW9yaXRpZXMgPSBbXCJOb3QgSW1wb3J0YW50XCIsIFwiTm9ybWFsXCIsIFwiSW1wb3J0YW50XCJdXHJcblxyXG4vLyBUb2RvIERPTVxyXG5mdW5jdGlvbiBjcmVhdGVUb2RvICh0b2RvLCBpbmRleCkge1xyXG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvLWNhcmQtY29udGFpbmVyJyk7XHJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnLCB0b2RvLnByb2plY3QpO1xyXG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZG9uZScsIHRvZG8uZG9uZSk7XHJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1wJywgdG9kby5wcmlvcml0eSk7XHJcbiAgICBjb25zdCBIVE1MU25pcHBldCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtZGVzY3JpcHRpb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxoNCBjbGFzcz1cInRvZG8tdGl0bGVcIj5cclxuICAgICAgICAgICAgJHtzYW5pdGl6ZSh0b2RvLnRpdGxlKX1cclxuICAgICAgICAgICAgPC9oND5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0b2RvLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAke3Nhbml0aXplKHRvZG8uZGVzY3JpcHRpb24pfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tYnRucy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvZG8tZG9uZSBidG4tY2lyY2xlXCIgdGl0bGU9JHt0b2RvLmRvbmU/IFwiRG9uZVwiOiBcIlRvZG9cIn0+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+JHt0b2RvLmRvbmU/IFwiY2hlY2tfY2lyY2xlXCI6IFwicmFkaW9fYnV0dG9uX3VuY2hlY2tlZFwifTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvZG8tZGV0YWlscyBidG4tY2lyY2xlXCIgdGl0bGU9XCJNb3JlIERldGFpbHNcIj48c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5zdW1tYXJpemU8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmlvcml0eVwiIHRpdGxlPVwiUHJpb3JpdHktJHtwcmlvcml0aWVzW3RvZG8ucHJpb3JpdHkgLSAxXX1cIj48L3NwYW4+XHJcbiAgICBgO1xyXG4gICAgaXRlbS5pbm5lckhUTUwgPSBIVE1MU25pcHBldDtcclxuICAgIHJldHVybiBpdGVtO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlVG9kb0xpc3QoYXJyYXksIGluZGV4LCB0aXRsZSkge1xyXG4gICAgY29uc3QgdG9kb0xpc3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuICAgIHRvZG9MaXN0c0Rpdi5pbm5lckhUTUwgPSAnJztcclxuICAgIHRvZG9MaXN0VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbGV0IHRvZG9zVG9EaXNwbGF5O1xyXG4gICAgaWYgKGluZGV4ID09PSAnYWxsTGlzdHMnKSB7XHJcbiAgICAgICAgdG9kb3NUb0Rpc3BsYXkgPSBwcm9qZWN0RnVuY3Rpb25zLmdldEFsbExpc3RzKGFycmF5KTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT09ICd0b2RheUxpc3QnKSB7XHJcbiAgICAgICAgdG9kb3NUb0Rpc3BsYXkgPSBwcm9qZWN0RnVuY3Rpb25zLmdldFRvZGF5TGlzdChhcnJheSk7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAndXBjb21pbmdMaXN0Jykge1xyXG4gICAgICAgIHRvZG9zVG9EaXNwbGF5ID0gcHJvamVjdEZ1bmN0aW9ucy5nZXRVcGNvbWluZ0xpc3QoYXJyYXkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGV5XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IFsuLi5hcnJheVtpbmRleF0ubGlzdC5tYXAoKHRvZG8sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgIHt0b2RvLCBpbmRleH1cclxuICAgICAgICApKV07XHJcbiAgICB9XHJcblxyXG4gICAgdG9kb3NUb0Rpc3BsYXkuZm9yRWFjaCgoe3RvZG8sIGluZGV4fSkgPT4ge1xyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNyZWF0ZVRvZG8odG9kbywgaW5kZXgpKTtcclxuICAgIH0pXHJcbiAgICB0b2RvTGlzdHNEaXYuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG4vLyBQcm9qZWN0IERPTVxyXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KHByb2plY3QsIGluZGV4KSB7XHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgnbGluay1idG4nKTtcclxuICAgIGVkaXRCdG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ0VkaXQgUHJvamVjdCcpO1xyXG4gICAgY29uc3QgZWRpdFN5bWJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGVkaXRTeW1ib2wuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xyXG4gICAgZWRpdFN5bWJvbC50ZXh0Q29udGVudCA9ICdlZGl0JztcclxuICAgIGVkaXRCdG4uYXBwZW5kQ2hpbGQoZWRpdFN5bWJvbCk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKTtcclxuICAgIHByaW9yaXR5LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgUHJpb3JpdHktJHtwcmlvcml0aWVzW3Byb2plY3QucHJpb3JpdHkgLSAxXX1gKTtcclxuXHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnbGluay1idG4nLCAncHJvamVjdC1idG4nKTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpO1xyXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBwcm9qZWN0LnRpdGxlKTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcCcsIHByb2plY3QucHJpb3JpdHkpXHJcbiAgICBcclxuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XHJcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBpbmRleCk7XHJcbiAgICBvcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgcmV0dXJuIHtidXR0b246IGJ1dHRvbiwgb3B0aW9uOiBvcHRpb259O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdChhcnJheSkge1xyXG4gICAgcHJvamVjdHNEaXYuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB0b2RvUHJvamVjdC5pbm5lckhUTUwgPSAnPG9wdGlvbiB2YWx1ZT1cIjBcIiBzZWxlY3RlZD5Ib21lPC9vcHRpb24+JztcclxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RPYmogPSBjcmVhdGVQcm9qZWN0KGFycmF5W2ldLCBpKTtcclxuICAgICAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0T2JqLmJ1dHRvbik7XHJcbiAgICAgICAgdG9kb1Byb2plY3QuYXBwZW5kQ2hpbGQocHJvamVjdE9iai5vcHRpb24pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBUb2RvIERldGFpbHMgUGFnZVxyXG5mdW5jdGlvbiBkaXNwbGF5VG9kb0RldGFpbHModG9kbykge1xyXG4gICAgdG9kb1RpdGxlLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcclxuICAgIHRvZG9EZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZGVzY3JpcHRpb247XHJcbiAgICB0b2RvRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZS5zcGxpdCgnVCcpWzBdO1xyXG4gICAgdG9kb0R1ZVRpbWUudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGUuc3BsaXQoJ1QnKVsxXTtcclxuICAgIHRvZG9Qcmlvcml0eS5pbm5lckhUTUwgPSAnJztcclxuICAgIGNvbnN0IHByaW9yaXR5QXJyID0gWydOb3QgSW1wb3J0YW50JywgJ05vcm1hbCcsICdJbXBvcnRhbnQnXTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0b2RvLnByaW9yaXR5OyBpKyspIHtcclxuICAgICAgICB0b2RvUHJpb3JpdHkuaW5uZXJIVE1MICs9ICc8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5zdGFyPC9zcGFuPic7XHJcbiAgICB9XHJcbiAgICB0b2RvUHJpb3JpdHkuc2V0QXR0cmlidXRlKCd0aXRsZScsIHByaW9yaXR5QXJyW3RvZG8ucHJpb3JpdHkgLSAxXSk7XHJcbiAgICB0b2RvTm90ZXMudGV4dENvbnRlbnQgPSB0b2RvLm5vdGVzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Y3JlYXRlVG9kbywgY3JlYXRlUHJvamVjdCwgdXBkYXRlVG9kb0xpc3QsIHVwZGF0ZVByb2plY3RMaXN0LCBkaXNwbGF5VG9kb0RldGFpbHN9OyIsImltcG9ydCBkYXRlRnVuY3Rpb25zIGZyb20gJy4vZGF0ZS5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBvYmp9IGZyb20gJy4vdG9kby1mdW5jdGlvbnMnO1xyXG5jb25zdCB7Y2hhbmdlVGl0bGUsIGNoYW5nZVByaW9yaXR5fSA9IG9iajtcclxuXHJcbmZ1bmN0aW9uIGdldEFsbExpc3RzIChwcm9qZWN0cykge1xyXG4gICAgbGV0IGFyciA9IFtdO1xyXG4gICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICBhcnIgPSBbLi4uYXJyLCAuLi5wcm9qZWN0Lmxpc3QubWFwKCh0b2RvLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICB7dG9kbywgaW5kZXh9XHJcbiAgICAgICAgKSldO1xyXG4gICAgfSlcclxuICAgIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvZGF5TGlzdCAocHJvamVjdHMpIHtcclxuICAgIGNvbnN0IGFsbExpc3RzID0gZ2V0QWxsTGlzdHMocHJvamVjdHMpO1xyXG4gICAgY29uc3QgdG9kYXlMaXN0ID0gYWxsTGlzdHMuZmlsdGVyKCh7dG9kbywgaW5kZXh9KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGVGdW5jdGlvbnMuZmlsdGVyVG9kYXkodG9kby5kdWVEYXRlKTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gdG9kYXlMaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRVcGNvbWluZ0xpc3QgKHByb2plY3RzKSB7XHJcbiAgICBjb25zdCBhbGxMaXN0cyA9IGdldEFsbExpc3RzKHByb2plY3RzKTtcclxuICAgIGNvbnN0IHVwY29taW5nTGlzdCA9IGFsbExpc3RzLmZpbHRlcigoe3RvZG8sIGluZGV4fSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBkYXRlRnVuY3Rpb25zLmZpbHRlclVwY29taW5nKHRvZG8uZHVlRGF0ZSk7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHVwY29taW5nTGlzdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZWRpdFByb2plY3QocHJvamVjdCwgbmV3VGl0bGUsIG5ld1ByaW9yaXR5KSB7XHJcbiAgICBjaGFuZ2VUaXRsZShwcm9qZWN0LCBuZXdUaXRsZSk7XHJcbiAgICBjaGFuZ2VQcmlvcml0eShwcm9qZWN0LCBuZXdQcmlvcml0eSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtnZXRBbGxMaXN0cywgZ2V0VG9kYXlMaXN0LCBnZXRVcGNvbWluZ0xpc3QsIGVkaXRQcm9qZWN0fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0TWFrZXIge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIHByaW9yaXR5KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7dGl0bGUsIHByaW9yaXR5fSk7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICB9XHJcbn0iLCIvLyBzYW5pdGl6ZXIgdG8gdXNlIGlubmVySFRNTCB3aXRob3V0IHNlY3VyaXR5IGNvbmNlcm5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2FuaXRpemUoaW5wdXQpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnRleHRDb250ZW50ID0gaW5wdXQ7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufSIsImNvbnN0IHRoZW1lU3dpdGNoQnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZW1lLXN3aXRjaC1idG4nKTtcclxuY29uc3QgdGhlbWVTd2l0Y2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidGhlbWUtc3dpdGNoXCJdJyk7XHJcbmNvbnN0IHNpZGViYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZS1iYXItdG9nZ2xlJyk7XHJcblxyXG4vLyBNYXRjaCB1c2VyIFRoZW1lXHJcbmlmKHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcykge1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdkYXJrJyk7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5jaGVja2VkID0gdHJ1ZTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkxpZ2h0IE1vZGVcIik7XHJcbn0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2xpZ2h0Jyk7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJEYXJrIE1vZGVcIik7XHJcbn1cclxuXHJcbi8vIFRvZ2dsZSBUaGVtZSBvbiBDbGlja1xyXG50aGVtZVN3aXRjaEJ1dHRvbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBpZighdGhlbWVTd2l0Y2hCdXR0b24uY2hlY2tlZCkge1xyXG4gICAgICAgIHRoZW1lU3dpdGNoQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnZGFyaycpO1xyXG4gICAgICAgIHRoZW1lU3dpdGNoQnV0dG9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIlN3aXRjaCB0byBMaWdodFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhlbWVTd2l0Y2hCdXR0b24uY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnbGlnaHQnKTtcclxuICAgICAgICB0aGVtZVN3aXRjaEJ1dHRvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJTd2l0Y2ggdG8gRGFya1wiKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBUb2dnbGUgU2lkZWJhclxyXG5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZS1iYXInKTtcclxuc2lkZWJhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1zaWRlLWJhcicpO1xyXG59KSIsImltcG9ydCBUb2RvTWFrZXIgZnJvbSAnLi90b2RvLW1ha2VyJztcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVRpdGxlKHRvZG8sIG5ld1RpdGxlKSB7XHJcbiAgICB0b2RvLnRpdGxlID0gbmV3VGl0bGU7XHJcbn1cclxuZnVuY3Rpb24gY2hhbmdlRGVzY3JpcHRpb24odG9kbywgbmV3RGVzY3JpcHRpb24pIHtcclxuICAgIHRvZG8uZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxufVxyXG5mdW5jdGlvbiBjaGFuZ2VEdWVEYXRlICh0b2RvLCBuZXdEYXRlKSB7XHJcbiAgICB0b2RvLmR1ZURhdGUgPSBuZXdEYXRlO1xyXG59XHJcbmZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5ICh0b2RvLCBuZXdQcmlvcml0eSkge1xyXG4gICAgdG9kby5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xyXG59XHJcbmZ1bmN0aW9uIGNoYW5nZU5vdGVzICh0b2RvLCBuZXdOb3Rlcykge1xyXG4gICAgdG9kby5ub3RlcyA9IG5ld05vdGVzO1xyXG59XHJcbmZ1bmN0aW9uIGNoYW5nZVN0YXRlICh0b2RvKSB7XHJcbiAgICB0b2RvLmRvbmUgPSB0b2RvLmRvbmUgPyBmYWxzZSA6IHRydWU7XHJcbn1cclxuZnVuY3Rpb24gZGVsZXRlSXRlbSAoYXJyYXksIGluZGV4KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZWRpdFRvZG8ocHJvamVjdHMsIHRvZG8sIG5ld1RpdGxlLCBuZXdEZXMsIG5ld0R1ZURhdGUsIG5ld1ByaW9yaXR5LCBuZXdOb3RlcywgbmV3UHJvamVjdCkge1xyXG4gICAgaWYodG9kby5wcm9qZWN0SW5kZXggIT09IG5ld1Byb2plY3QpIHtcclxuICAgICAgICBwcm9qZWN0c1t0b2RvLnByb2plY3RJbmRleF0ubGlzdC5zcGxpY2UodG9kby5pbmRleCwgMSk7XHJcbiAgICAgICAgcHJvamVjdHNbbmV3UHJvamVjdF0ubGlzdC5wdXNoKG5ldyBUb2RvTWFrZXIobmV3VGl0bGUsIG5ld0RlcywgbmV3RHVlRGF0ZSwgbmV3UHJpb3JpdHksIG5ld05vdGVzLCB0b2RvLmRvbmUsIG5ld1Byb2plY3QpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZWRpdGluZ1RvZG8gPSBwcm9qZWN0c1t0b2RvLnByb2plY3RJbmRleF0ubGlzdFt0b2RvLmluZGV4XTtcclxuICAgICAgICBjaGFuZ2VUaXRsZShlZGl0aW5nVG9kbywgbmV3VGl0bGUpO1xyXG4gICAgICAgIGNoYW5nZURlc2NyaXB0aW9uKGVkaXRpbmdUb2RvLCBuZXdEZXMpO1xyXG4gICAgICAgIGNoYW5nZUR1ZURhdGUoZWRpdGluZ1RvZG8sIG5ld0R1ZURhdGUpO1xyXG4gICAgICAgIGNoYW5nZVByaW9yaXR5KGVkaXRpbmdUb2RvLCBuZXdQcmlvcml0eSk7XHJcbiAgICAgICAgY2hhbmdlTm90ZXMoZWRpdGluZ1RvZG8sIG5ld05vdGVzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NoYW5nZVRpdGxlLCBjaGFuZ2VQcmlvcml0eSwgZWRpdFRvZG8sIGNoYW5nZVN0YXRlLCBkZWxldGVJdGVtfTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvTWFrZXIge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3QpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdH0pO1xyXG4gICAgfTtcclxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCAnbWF0ZXJpYWwtc3ltYm9scy9vdXRsaW5lZC5jc3MnO1xyXG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuc2Nzcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL3RoZW1lJnNpZGViYXInO1xyXG5pbXBvcnQgVG9kb01ha2VyIGZyb20gJy4vbW9kdWxlcy90b2RvLW1ha2VyJztcclxuaW1wb3J0IFByb2plY3RNYWtlciBmcm9tICcuL21vZHVsZXMvcHJvamVjdC1tYWtlcic7XHJcbmltcG9ydCBUb2RvRnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy90b2RvLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBEb21GdW5jdGlvbnMgZnJvbSAnLi9tb2R1bGVzL2RvbS1mdW5jdGlvbnMnO1xyXG5pbXBvcnQgUHJvamVjdEZ1bmN0aW9ucyBmcm9tICcuL21vZHVsZXMvcHJvamVjdC1mdW5jdGlvbnMnO1xyXG5pbXBvcnQgRGF0ZUZ1bmN0aW9ucyBmcm9tICcuL21vZHVsZXMvZGF0ZS5qcyc7XHJcblxyXG5cclxuLy8gRE9NIEVsZW1lbnRzXHJcbmNvbnN0IHRvZG9MaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktcHJvamVjdHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IHRvZG9EZXRhaWxzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbHMtY2FyZC1jb250YWluZXInKTtcclxuY29uc3QgdG9kb0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscy1jYXJkJyk7XHJcbi8vIElucHV0c1xyXG5jb25zdCB0b2RvRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdG9kby1mb3JtJyk7XHJcbmNvbnN0IHByb2plY3RGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybS1jb250YWluZXInKTtcclxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XHJcbi8vIFRvZG8gSW5wdXRzXHJcbmNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xyXG5jb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcclxuY29uc3QgdG9kb0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xyXG5jb25zdCB0b2RvVGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lJyk7XHJcbmNvbnN0IHRvZG9Qcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpO1xyXG5jb25zdCB0b2RvTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90ZXMnKTtcclxuY29uc3QgdG9kb1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xyXG4vLyBQcm9qZWN0IElucHV0c1xyXG5jb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpO1xyXG5jb25zdCBwcm9qZWN0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1wcmlvcml0eScpO1xyXG5cclxuLy8gRm9ybSBCdXR0b25zXHJcbmNvbnN0IG9wZW5Ub2RvRm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcGVuLXRvZG8tZm9ybS1idG4nKTtcclxuY29uc3QgYWRkVG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdG9kby1idG4nKTtcclxuY29uc3Qgb3BlblByb2plY3RGb3JtQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXByb2plY3QtZm9ybS1idG4nKTtcclxuY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1idG4nKTtcclxuY29uc3QgY2FuY2VsQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tY2FuY2VsJyk7XHJcbmNvbnN0IHJlbW92ZVByb2plY3RCdG4gPSBwcm9qZWN0Rm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLWNpcmNsZScpO1xyXG5cclxuLy8gUHJvamVjdCBCdXR0b25zXHJcbmNvbnN0IGhvbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJIb21lXCJdJyk7XHJcbmNvbnN0IGFsbExpc3RzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiQWxsIExpc3RzXCJdJyk7XHJcbmNvbnN0IHRvZGF5TGlzdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIlRvZGF5XCJdJyk7XHJcbmNvbnN0IHVwY29taW5nTGlzdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIlVwY29taW5nXCJdJyk7XHJcbmNvbnN0IG15UHJvamVjdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJNeSBQcm9qZWN0c1wiXScpO1xyXG5cclxuLy8gSW5pdGlhbGl6ZSB2YXJpYWJsZXNcclxubGV0IHByb2plY3RzID0gW107XHJcbmxldCBjdXJyZW50UGFnZSA9IG51bGw7XHJcbmxldCBlZGl0aW5nVG9kbyA9IGZhbHNlO1xyXG5sZXQgZWRpdGluZ1Byb2plY3QgPSBmYWxzZTtcclxuXHJcblxyXG4vLyBBZGQgVG9kbyBJdGVtXHJcbmZ1bmN0aW9uIGFkZFRvZG9JdGVtICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCkge1xyXG4gICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvTWFrZXIodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3QpO1xyXG4gICAgcHJvamVjdHNbcHJvamVjdF0ubGlzdC5wdXNoKG5ld1RvZG8pO1xyXG4gICAgdXBkYXRlUGFnZShwcm9qZWN0KTtcclxufVxyXG5cclxuXHJcbi8vIENoYW5naW5nIHRvZG8gZG9uZSBzdGF0dXNcclxuZnVuY3Rpb24gdXBkYXRlRG9uZVN0YXR1cyhwcm9qZWN0SW5kZXgsIHRvZG8pIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuY2hhbmdlU3RhdGUocHJvamVjdHNbcHJvamVjdEluZGV4XS5saXN0W3RvZG9dKTtcclxuICAgIHVwZGF0ZVBhZ2UocHJvamVjdEluZGV4KTtcclxufVxyXG5cclxuXHJcbi8vIFJlbW92ZSBUb2RvIEl0ZW1cclxuZnVuY3Rpb24gcmVtb3ZlVG9kb0l0ZW0gKHByb2plY3RJbmRleCwgaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3QsIGluZGV4KTtcclxuICAgIHVwZGF0ZVBhZ2UocHJvamVjdEluZGV4KTtcclxuICAgIHRvZG9EZXRhaWxzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxufVxyXG5cclxuLy8gQWRkIFByb2plY3RcclxuZnVuY3Rpb24gYWRkUHJvamVjdCAobmFtZSwgcHJpb3JpdHkpIHtcclxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdE1ha2VyKG5hbWUsIHByaW9yaXR5KTtcclxuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICB1cGRhdGVQcm9qZWN0cygpO1xyXG4gICAgcHJvamVjdHNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgdXBkYXRlUGFnZShwcm9qZWN0cy5sZW5ndGggLSAxKTtcclxufVxyXG5cclxuLy8gUmVtb3ZlIFByb2plY3RcclxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdCAoaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0cywgaW5kZXgpO1xyXG4gICAgdXBkYXRlUHJvamVjdHMoKTtcclxuICAgIGlmKGN1cnJlbnRQYWdlKSB1cGRhdGVQYWdlKDApO1xyXG4gICAgdXBkYXRlRGF0YSgpO1xyXG59XHJcblxyXG4vLyBVcGRhdGUgUGFnZSBiYXNlZCBvbiBjdXJyZW50UGFnZVxyXG5mdW5jdGlvbiB1cGRhdGVQYWdlKHByb2plY3RJbmRleCkge1xyXG4gICAgc3dpdGNoKGN1cnJlbnRQYWdlKXtcclxuICAgICAgICBjYXNlICdhbGxMaXN0cyc6XHJcbiAgICAgICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgJ2FsbExpc3RzJywgJ0FsbCBMaXN0cycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b2RheUxpc3QnOlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsICd0b2RheUxpc3QnLCAnVG9kYXkgTGlzdCcpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd1cGNvbWluZ0xpc3QnOlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsICd1cGNvbWluZ0xpc3QnLCAnVXBjb21pbmcgTGlzdCcpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3RJbmRleCwgcHJvamVjdHNbcHJvamVjdEluZGV4XS50aXRsZSk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIHVwZGF0ZURhdGEoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdHMoKSB7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlUHJvamVjdExpc3QocHJvamVjdHMpO1xyXG4gICAgY29uc3QgcHJvamVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcclxuICAgIHByb2plY3RCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgdXBkYXRlUGFnZShpbmRleCk7XHJcbiAgICAgICAgICAgIGNsb3NlU2lkZWJhcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RFZGl0QnRuID0gYnRuLnF1ZXJ5U2VsZWN0b3IoJy5saW5rLWJ0bicpO1xyXG4gICAgICAgIHByb2plY3RFZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZWRpdGluZ1Byb2plY3QgPSBpbmRleDtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgc2hvd1Byb2plY3RFZGl0Rm9ybShpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBwcm9qZWN0Rm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbn1cclxuXHJcbi8vIFRvZ2dsZSBUb2RvIEZvcm0gT3BlbiBVcFxyXG5vcGVuVG9kb0Zvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBhZGRUb2RvQnRuLnRleHRDb250ZW50ID0gJ0FkZCBUb2RvJztcclxuICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxufSk7XHJcbnRvZG9Gb3JtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY2xvc2VGb3JtKHRvZG9Gb3JtKTtcclxufSk7XHJcbnRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG5cclxuLy8gVG9nZ2xlIFByb2plY3QgRm9ybSBPcGVuIFVwXHJcbm9wZW5Qcm9qZWN0Rm9ybUJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGFkZFByb2plY3RCdG4udGV4dENvbnRlbnQgPSAnQWRkIFByb2plY3QnO1xyXG4gICAgICAgIHByb2plY3RGb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG59KVxyXG5wcm9qZWN0Rm9ybUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNsb3NlRm9ybShwcm9qZWN0Rm9ybSk7XHJcbn0pO1xyXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKX0pO1xyXG5cclxuLy8gY2FuY2VsIGJ1dHRvbnNcclxuY2FuY2VsQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VGb3JtKGJ0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgfSlcclxufSlcclxuXHJcbi8vIEVkaXQgVG9kbyBGb3JtXHJcbmZ1bmN0aW9uIHNob3dFZGl0Rm9ybShwcm9qZWN0SW5kZXgsIGluZGV4KSB7XHJcbiAgICBlZGl0aW5nVG9kbyA9IHtwcm9qZWN0SW5kZXgsIGluZGV4fTtcclxuICAgIGNvbnN0IHRvZG8gPSBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbaW5kZXhdO1xyXG4gICAgdG9kb1RpdGxlLnZhbHVlID0gdG9kby50aXRsZTtcclxuICAgIHRvZG9EZXNjcmlwdGlvbi52YWx1ZSA9IHRvZG8uZGVzY3JpcHRpb247XHJcbiAgICB0b2RvRGF0ZS52YWx1ZSA9IHRvZG8uZHVlRGF0ZS5zcGxpdCgnVCcpWzBdO1xyXG4gICAgdG9kb1RpbWUudmFsdWUgPSB0b2RvLmR1ZURhdGUuc3BsaXQoJ1QnKVsxXTtcclxuICAgIHRvZG9Qcmlvcml0eS52YWx1ZSA9IHRvZG8ucHJpb3JpdHk7XHJcbiAgICB0b2RvTm90ZXMudmFsdWUgPSB0b2RvLm5vdGVzO1xyXG4gICAgdG9kb1Byb2plY3QudmFsdWUgPSB0b2RvLnByb2plY3Q7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB0b2RvRGV0YWlsc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICBhZGRUb2RvQnRuLnRleHRDb250ZW50ID0gJ1NhdmUgQ2hhbmdlcyc7XHJcbn1cclxuXHJcbi8vIEVkaXQgUHJvamVjdEZvcm1cclxuZnVuY3Rpb24gc2hvd1Byb2plY3RFZGl0Rm9ybShwcm9qZWN0SW5kZXgpIHtcclxuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0c1twcm9qZWN0SW5kZXhdO1xyXG4gICAgcHJvamVjdFRpdGxlLnZhbHVlID0gcHJvamVjdC50aXRsZTtcclxuICAgIHByb2plY3RQcmlvcml0eS52YWx1ZSA9IHByb2plY3QucHJpb3JpdHk7XHJcbiAgICBwcm9qZWN0Rm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICBwcm9qZWN0Rm9ybS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBwcm9qZWN0SW5kZXgpO1xyXG4gICAgYWRkUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdTYXZlIENoYW5nZXMnO1xyXG4gICAgcmVtb3ZlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlRm9ybShmb3JtKSB7XHJcbiAgICBlZGl0aW5nVG9kbyA9IGZhbHNlO1xyXG4gICAgZWRpdGluZ1Byb2plY3QgPSBmYWxzZTtcclxuICAgIGZvcm0ucmVzZXQoKTtcclxuICAgIGZvcm0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICByZW1vdmVQcm9qZWN0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxufVxyXG5cclxuLy8gQWRkL0VkaXQgdG9kbyBpdGVtIG9uIEZvcm0gc3VibWl0XHJcbmFkZFRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYodG9kb0Zvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XHJcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IHRvZG9EYXRlLnZhbHVlICsgJ1QnICsgdG9kb1RpbWUudmFsdWU7XHJcbiAgICAgICAgaWYoZWRpdGluZ1RvZG8pIHtcclxuICAgICAgICAgICAgVG9kb0Z1bmN0aW9ucy5lZGl0VG9kbyhwcm9qZWN0cywgZWRpdGluZ1RvZG8sIHRvZG9UaXRsZS52YWx1ZSwgdG9kb0Rlc2NyaXB0aW9uLnZhbHVlLCBkdWVEYXRlLCB0b2RvUHJpb3JpdHkudmFsdWUsIHRvZG9Ob3Rlcy52YWx1ZSwgK3RvZG9Qcm9qZWN0LnZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhZGRUb2RvSXRlbSh0b2RvVGl0bGUudmFsdWUsIHRvZG9EZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZSwgdG9kb1ByaW9yaXR5LnZhbHVlLCB0b2RvTm90ZXMudmFsdWUsIGZhbHNlLCArdG9kb1Byb2plY3QudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGVQYWdlKHRvZG9Qcm9qZWN0LnZhbHVlKTtcclxuICAgICAgICBjbG9zZUZvcm0odG9kb0Zvcm0pO1xyXG4gICAgICAgIGNsb3NlU2lkZWJhcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0b2RvRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIEFkZC9FZGl0IHByb2plY3Qgb24gRm9ybSBzdWJtaXRcclxuYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZihwcm9qZWN0Rm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICBpZihlZGl0aW5nUHJvamVjdCkge1xyXG4gICAgICAgICAgICBQcm9qZWN0RnVuY3Rpb25zLmVkaXRQcm9qZWN0KHByb2plY3RzW2VkaXRpbmdQcm9qZWN0XSwgcHJvamVjdFRpdGxlLnZhbHVlLCBwcm9qZWN0UHJpb3JpdHkudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZihwcm9qZWN0VGl0bGUudmFsdWUgJiYgcHJvamVjdFByaW9yaXR5LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGFkZFByb2plY3QocHJvamVjdFRpdGxlLnZhbHVlLCBwcm9qZWN0UHJpb3JpdHkudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGVQcm9qZWN0cygpO1xyXG4gICAgICAgIGNsb3NlRm9ybShwcm9qZWN0Rm9ybSk7XHJcbiAgICAgICAgY2xvc2VTaWRlYmFyKCk7XHJcbiAgICAgICAgdXBkYXRlRGF0YSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9qZWN0Rm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gUmVtb3ZlIFByb2plY3RcclxucmVtb3ZlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgaW5kZXggPSArIHRoaXMucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgIHJlbW92ZVByb2plY3QoaW5kZXgpO1xyXG4gICAgdXBkYXRlRGF0YSgpO1xyXG59KVxyXG5cclxuLy8gTmF2aWdhdGUgUHJvamVjdHNcclxuaG9tZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGN1cnJlbnRQYWdlID0gbnVsbDtcclxuICAgIHVwZGF0ZVBhZ2UoMCk7XHJcbiAgICBjbG9zZVNpZGViYXIoKTtcclxufSk7XHJcbm15UHJvamVjdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBwcm9qZWN0c0Rpdi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XHJcbn0pO1xyXG5hbGxMaXN0c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGN1cnJlbnRQYWdlID0gJ2FsbExpc3RzJztcclxuICAgIHVwZGF0ZVBhZ2UoKTtcclxuICAgIGNsb3NlU2lkZWJhcigpO1xyXG59KVxyXG50b2RheUxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjdXJyZW50UGFnZSA9ICd0b2RheUxpc3QnO1xyXG4gICAgdXBkYXRlUGFnZSgpO1xyXG4gICAgY2xvc2VTaWRlYmFyKCk7XHJcbn0pXHJcbnVwY29taW5nTGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGN1cnJlbnRQYWdlID0gJ3VwY29taW5nTGlzdCc7XHJcbiAgICB1cGRhdGVQYWdlKCk7XHJcbiAgICBjbG9zZVNpZGViYXIoKTtcclxufSlcclxuXHJcbi8vIERldGFpbHMgQ29udGFpbmVyXHJcbmZ1bmN0aW9uIHNob3dUb2RvRGV0YWlscyhwcm9qZWN0SW5kZXgsIGluZGV4KSB7XHJcbiAgICBjb25zdCB0b2RvID0gcHJvamVjdHNbcHJvamVjdEluZGV4XS5saXN0W2luZGV4XTtcclxuICAgIERvbUZ1bmN0aW9ucy5kaXNwbGF5VG9kb0RldGFpbHModG9kbyk7XHJcbiAgICBjb25zdCB0b2RvRWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWVkaXQtYnRuJyk7XHJcbiAgICBjb25zdCB0b2RvRGVsZXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tZGVsLWJ0bicpO1xyXG4gICAgdG9kb0RlbGV0ZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHJlbW92ZVRvZG9JdGVtKHRvZG8ucHJvamVjdCwgaW5kZXgpO1xyXG4gICAgfTtcclxuICAgIHRvZG9FZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHNob3dFZGl0Rm9ybShwcm9qZWN0SW5kZXgsIGluZGV4KTtcclxuICAgIH0pXHJcbiAgICB0b2RvRGV0YWlsc0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB0b2RvRGV0YWlsc0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0b2RvRGV0YWlsc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICB9KTtcclxufTtcclxudG9kb0RldGFpbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge2Uuc3RvcFByb3BhZ2F0aW9uKCl9KTtcclxuXHJcbi8vIFJlZnJlc2ggRXZlbnQgTGlzdGVuZXJzXHJcbmZ1bmN0aW9uIHJlZnJlc2hFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHRvZG9Eb25lQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWRvbmUnKTtcclxuICAgIGNvbnN0IHRvZG9EZXRhaWxzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWRldGFpbHMnKTtcclxuXHJcbiAgICB0b2RvRG9uZUJ0bnMuZm9yRWFjaChkb25lQnRuID0+IHtcclxuICAgICAgICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICsgZG9uZUJ0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9ICsgZG9uZUJ0bi5wYXJlbnROb2RlLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKTtcclxuICAgICAgICAgICAgdXBkYXRlRG9uZVN0YXR1cyhwcm9qZWN0SW5kZXgsIGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdG9kb0RldGFpbHNCdG5zLmZvckVhY2goZGV0YWlsc0J0biA9PiB7XHJcbiAgICAgICAgZGV0YWlsc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSArIGRldGFpbHNCdG4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSArIGRldGFpbHNCdG4ucGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgICAgIHNob3dUb2RvRGV0YWlscyhwcm9qZWN0SW5kZXgsIGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3Qgc21hbGxTY3JlZW4gPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDc2MHB4KVwiKTtcclxuZnVuY3Rpb24gY2xvc2VTaWRlYmFyKCkge1xyXG4gICAgaWYoc21hbGxTY3JlZW4ubWF0Y2hlcykge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaWRlLWJhcicpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gICAgY29uc3QgcHJvamVjdHNTdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXktcHJvamVjdHMnKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IG5leHRXZWVrID0gbmV3IERhdGUodG9kYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA3KSk7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gRGF0ZUZ1bmN0aW9ucy5nZXRGb3JtYXR0ZWREYXRlKG5leHRXZWVrKSArIFwiVDEyOjAwOjAwXCI7XHJcbiAgICBpZihwcm9qZWN0c1N0cmluZykge1xyXG4gICAgICAgIHByb2plY3RzID0gSlNPTi5wYXJzZShwcm9qZWN0c1N0cmluZyk7XHJcbiAgICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHByb2plY3QsIFByb2plY3RNYWtlcik7XHJcbiAgICAgICAgICAgIHByb2plY3QubGlzdC5mb3JFYWNoKHRvZG8gPT4ge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRvZG8sIFRvZG9NYWtlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2plY3RzID0gW25ldyBQcm9qZWN0TWFrZXIoJ0hvbWUnLCBudWxsKV07XHJcbiAgICAgICAgYWRkVG9kb0l0ZW0oXHJcbiAgICAgICAgICAgIFwiSG93IFRvIFVzZSA/XCIsXHJcbiAgICAgICAgICAgIFwiQ2hlY2sgdGhpcyB0b2RvIHRvIGxlYXJuIGhvdyB0byB1c2UgdGhpcyB3ZWIgYXBwXCIsXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZERhdGUsXHJcbiAgICAgICAgICAgIDMsXHJcbiAgICAgICAgICAgIFwiVGhpbmdzIFlvdSBjYW4gZG8gIVxcbi0gQWRkIHRvZG8gaXRlbXMgd2l0aCBBZGQgbmV3IHRhc2sgYnV0dG9uXFxuLSBBZGQgbmV3IHByb2plY3RzIHdpdGggdGhlIG5ldyBwcm9qZWN0IGJ1dHRvblxcbi0gTWFyayBUb2RvcyBkb25lL3VuZG9uZVxcbi0gRWRpdC9EZWxldGUgYWRkZWQgaXRlbXMgYW5kIHByb2plY3RzXCIsXHJcbiAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBhZ2UoMCk7XHJcbiAgICB1cGRhdGVQcm9qZWN0cygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVEYXRhKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ215LXByb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxufVxyXG5cclxuZ2V0RGF0YSgpO1xyXG5cclxuLy8gVEVTVElOR1xyXG5cclxuLy8gYWRkUHJvamVjdChcIk15IFByb2plY3QgMVwiLCAxKTtcclxuLy8gYWRkUHJvamVjdChcIk15IFByb2plY3QgMlwiLCAyKTtcclxuXHJcbi8vIGFkZFRvZG9JdGVtKFwiQ29kZVwiLCBcIldyaXRlIGNvZGUgZm9yIHRoZSBuZXcgZmVhdHVyZVwiLCBcIjIwMjQtMDMtMDdUMTI6MDA6MDBcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMCk7XHJcbi8vIGFkZFRvZG9JdGVtKFwiU3R1ZHlcIiwgXCJQcmVwYXJlIGZvciB0aGUgdXBjb21pbmcgZXhhbVwiLCBcIjIwMjQtMDMtMDhUMTQ6MzA6MDBcIiwgMiwgXCJTdHVkeSBmb3IgZXhhbXNcIiwgZmFsc2UsIDApO1xyXG4vLyBhZGRUb2RvSXRlbShcIkV4ZXJjaXNlXCIsIFwiR28gZm9yIGEgam9nIGluIHRoZSBwYXJrXCIsIFwiMjAyNC0wMy0wOVQxODowMDowMFwiLCAzLCBcIkdvIGZvciBhIHJ1blwiLCBmYWxzZSwgMSk7XHJcbi8vIGFkZFRvZG9JdGVtKFwiUmVhZFwiLCBcIkZpbmlzaCB0aGUgbGF0ZXN0IG5vdmVsXCIsIFwiMjAyNC0wMy0xMFQxMDowMDowMFwiLCAxLCBcIlJlYWQgYSBib29rXCIsIGZhbHNlLCAxKTtcclxuLy8gYWRkVG9kb0l0ZW0oXCJNZWV0aW5nXCIsIFwiRGlzY3VzcyBwcm9qZWN0IHVwZGF0ZXNcIiwgXCIyMDI0LTAzLTExVDE1OjQ1OjAwXCIsIDIsIFwiQXR0ZW5kIHRlYW0gbWVldGluZ1wiLCBmYWxzZSwgMik7XHJcbi8vIGFkZFRvZG9JdGVtKFwiUHJvamVjdFwiLCBcIldvcmsgb24gVUkgaW1wcm92ZW1lbnRzXCIsIFwiMjAyNC0wMy0xMlQwOTozMDowMFwiLCAzLCBcIldvcmsgb24gcHJvamVjdFwiLCBmYWxzZSwgMik7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9