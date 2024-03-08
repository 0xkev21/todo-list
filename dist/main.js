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

// Todo DOM
function createTodo (todo, index) {
    const item = document.createElement('div');
    item.classList.add('todo-card-container');
    item.setAttribute('data-index', index);
    item.setAttribute('data-project', todo.project);
    item.setAttribute('data-done', todo.done);
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
    const button = document.createElement('button');
    button.classList.add('link-btn', 'project-btn');
    button.setAttribute('type', 'button');
    button.setAttribute('data-index', index);
    button.setAttribute('title', project.name);
    button.textContent = project.name;
    const option = document.createElement('option');
    option.setAttribute('value', index);
    option.textContent = project.name;
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({getAllLists, getTodayList, getUpcomingList});

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
    constructor(name, priority) {
        Object.assign(this, {name, priority});
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({editTodo, changeState, deleteItem});

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
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, projectIndex, projects[projectIndex].name);
    }
    refreshEventListeners();
}


// Add Project
function addProject (name, priority) {
    const newProject = new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"](name, priority);
    projects.push(newProject);
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateProjectList(projects);
    // refreshEventListeners();
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            currentPage = null;
            updatePage(index);
        })
    })
    projectFormContainer.classList.remove('show');
    projectsDiv.classList.add('show');
    updatePage(projects.length -1);
}


// Remove Project
function removeProject (index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects, index);
    updatePage(0);
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
    addTodoBtn.textContent = "Save Changes";
}

function closeForm(form) {
    form.reset();
    form.parentNode.classList.remove('show');
}


// Add/Edit todo item on Form submit
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const dueDate = todoDate.value + "T" + todoTime.value;
    if(editingTodo) {
        _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].editTodo(projects, editingTodo, todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, +todoProject.value);
    } else {
        addTodoItem(todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, false, +todoProject.value);
    }
    updatePage(todoProject.value);
    todoFormContainer.classList.remove('show');
});


// Add/Edit project on Form submit
addProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(projectTitle.value && projectPriority.value) {
        addProject(projectTitle.value, projectPriority.value);
    }
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
    currentPage = "allLists";
    updatePage();
})
todayListBtn.addEventListener('click', () => {
    currentPage = "todayList";
    updatePage();
})
upcomingListBtn.addEventListener('click', () => {
    currentPage = "upcomingList";
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
_modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0, projects[0].name);
refreshEventListeners();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxDQUFDLDRCQUE0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRU47QUFDZ0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyx5REFBUTtBQUN0QjtBQUNBO0FBQ0Esa0JBQWtCLHlEQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCwwQkFBMEIsMkNBQTJDLG9EQUFvRDtBQUNsTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDZEQUFnQjtBQUN6QyxNQUFNO0FBQ04seUJBQXlCLDZEQUFnQjtBQUN6QyxNQUFNO0FBQ04seUJBQXlCLDZEQUFnQjtBQUN6QztBQUNBLE1BQU07QUFDTjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixZQUFZO0FBQ3pDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsQ0FBQyxpRkFBaUY7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRzNEO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxZQUFZO0FBQ3BELGVBQWUsZ0RBQWE7QUFDNUIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsWUFBWTtBQUN2RCxlQUFlLGdEQUFhO0FBQzVCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxDQUFDLDJDQUEyQzs7Ozs7Ozs7Ozs7Ozs7O0FDNUI1QztBQUNmO0FBQ0EsNkJBQTZCLGVBQWU7QUFDNUM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUJvQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLG1EQUFTO0FBQ3BELE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxDQUFDLGtDQUFrQzs7Ozs7Ozs7Ozs7Ozs7O0FDNUNuQztBQUNmO0FBQ0EsNkJBQTZCLDREQUE0RDtBQUN6RjtBQUNBOzs7Ozs7VUNKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDdUM7QUFDWDtBQUNLO0FBQ1k7QUFDTTtBQUNFO0FBQ0Y7QUFDUTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOERBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkRBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrREFBYTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLCtEQUFhO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksOERBQVk7QUFDeEI7QUFDQTtBQUNBLFlBQVksOERBQVk7QUFDeEI7QUFDQTtBQUNBLFlBQVksOERBQVk7QUFDeEI7QUFDQTtBQUNBLFlBQVksOERBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsOERBQVk7QUFDdkM7QUFDQSxJQUFJLDhEQUFZO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrREFBYTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsMkNBQTJDLG9CQUFvQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsb0JBQW9CO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFhO0FBQ3JCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhEQUFZO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxvQkFBb0I7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBWTtBQUNaLHdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1zeW1ib2xzL291dGxpbmVkLmNzcz82MGY0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3R5bGUvc3R5bGUuc2Nzcz80NTZkIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9kYXRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20tZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC1tYWtlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvc2FuaXRpemVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90aGVtZSZzaWRlYmFyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby1tYWtlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XHJcbmNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiZGF0ZVwiXScpO1xyXG5jb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRpbWVcIl0nKTtcclxuXHJcbmNvbnN0IGRhdGVBcnJheSA9IFtdO1xyXG5cclxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IGRhdGUudmFsdWUgKyBcIlRcIiArIHRpbWUudmFsdWU7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRlU3RyaW5nKTtcclxuICAgIGNvbnN0IGRhdGVUaW1lID0gY3JlYXRlRGF0ZShkYXRlU3RyaW5nKTtcclxuICAgIGRhdGVBcnJheS5wdXNoKGRhdGVUaW1lKTtcclxufSlcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURhdGUgKGRhdGVTdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc29ydERhdGUoYXJyYXkpIHtcclxuICAgIHJldHVybiBhcnJheS5zb3J0KChhLGIpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEpO1xyXG4gICAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYik7XHJcbiAgICAgICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgdGVzdEFycmF5ID0gW1xyXG4gICAgXCJNYXIgMTIgMjAxMiAxMDowMDowMCBBTVwiLFxyXG4gICAgXCJNYXIgOCAyMDEyIDA4OjAwOjAwIEFNXCJcclxuXVxyXG5cclxuY29uc29sZS5sb2codGVzdEFycmF5KTtcclxuY29uc29sZS5sb2coc29ydERhdGUodGVzdEFycmF5KSk7XHJcblxyXG5jb25zdCBkYXRlMSA9IG5ldyBEYXRlKCcyMDI0LTAzLTExJyk7XHJcbmNvbnN0IGRhdGUyID0gbmV3IERhdGUoJzIwMjQtMDQtMDZUMjA6MjQ6MzInKTtcclxuY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG5jb25zb2xlLmxvZyhkYXRlMS5nZXRUaW1lKCkgPCB0b2RheS5nZXRUaW1lKCkpOyAvLyBEYXRlZCBkdWVkXHJcbmNvbnNvbGUubG9nKFtkYXRlMS5nZXRGdWxsWWVhcigpLCBwYWQyZGlnaXRzKGRhdGUxLmdldE1vbnRoKCkrMSksIHBhZDJkaWdpdHMoZGF0ZTEuZ2V0RGF0ZSgpKV0uam9pbignLScpKTtcclxuXHJcbmNvbnNvbGUubG9nKGRhdGUxLmdldERhdGUoKSA9PT0gdG9kYXkuZ2V0RGF0ZSgpKTsgLy8gZGF5XHJcbmNvbnNvbGUubG9nKGRhdGUyLmdldERhdGUoKSA9PT0gdG9kYXkuZ2V0RGF0ZSgpKTtcclxuXHJcbmNvbnNvbGUubG9nKGRhdGUxLmdldERhdGUoKSk7XHJcblxyXG4vLyBQYWQgMHMgb24gZGF5ICYgbW9udGhcclxuZnVuY3Rpb24gcGFkMmRpZ2l0cyhudW0pIHtcclxuICAgIHJldHVybiBTdHJpbmcobnVtKS5wYWRTdGFydCgyLCAnMCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGb3JtYXR0ZWREYXRlIChkYXRlKSB7XHJcbiAgICByZXR1cm4gW2RhdGUuZ2V0RnVsbFllYXIoKSwgcGFkMmRpZ2l0cyh0b2RheS5nZXRNb250aCgpICsgMSksIHBhZDJkaWdpdHModG9kYXkuZ2V0RGF0ZSgpKV0uam9pbignLScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJUb2RheShkYXRlKSB7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZGF0ZS5zcGxpdCgnVCcpWzBdO1xyXG4gICAgY29uc3QgdG9kYXkgPSBnZXRGb3JtYXR0ZWREYXRlKG5ldyBEYXRlKCkpO1xyXG4gICAgcmV0dXJuIGZvcm1hdHRlZERhdGUgPT09IHRvZGF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJVcGNvbWluZyhkYXRlKSB7XHJcbiAgICBjb25zdCB0b3RhbFRpbWVGcm9tRGF0ZSA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKTtcclxuICAgIGNvbnNvbGUubG9nKHRvdGFsVGltZUZyb21EYXRlKTtcclxuICAgIGNvbnN0IHRvdGFsVGltZUZyb21Ub2RheSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgY29uc29sZS5sb2codG90YWxUaW1lRnJvbVRvZGF5KTtcclxuICAgIHJldHVybiB0b3RhbFRpbWVGcm9tRGF0ZSA+IHRvdGFsVGltZUZyb21Ub2RheTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2ZpbHRlclRvZGF5LCBmaWx0ZXJVcGNvbWluZ307IiwiaW1wb3J0IHNhbml0aXplIGZyb20gJy4vc2FuaXRpemVyLmpzJztcclxuaW1wb3J0IHByb2plY3RGdW5jdGlvbnMgZnJvbSAnLi9wcm9qZWN0LWZ1bmN0aW9ucy5qcyc7XHJcblxyXG5jb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1wcm9qZWN0cy1jb250YWluZXInKTtcclxuY29uc3QgdG9kb1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xyXG5jb25zdCB0b2RvTGlzdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC10aXRsZScpO1xyXG5cclxuY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLXRpdGxlJyk7XHJcbmNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXQtdG9kby1kZXNjcmlwdGlvbicpO1xyXG5jb25zdCB0b2RvRHVlZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXQtdG9kby1kdWVkYXRlIHNwYW4nKTtcclxuY29uc3QgdG9kb1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLXByaW9yaXR5IHNwYW4nKTtcclxuY29uc3QgdG9kb05vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLW5vdGVzJyk7XHJcblxyXG4vLyBUb2RvIERPTVxyXG5mdW5jdGlvbiBjcmVhdGVUb2RvICh0b2RvLCBpbmRleCkge1xyXG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvLWNhcmQtY29udGFpbmVyJyk7XHJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnLCB0b2RvLnByb2plY3QpO1xyXG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZG9uZScsIHRvZG8uZG9uZSk7XHJcbiAgICBjb25zdCBIVE1MU25pcHBldCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtZGVzY3JpcHRpb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxoNCBjbGFzcz1cInRvZG8tdGl0bGVcIj5cclxuICAgICAgICAgICAgJHtzYW5pdGl6ZSh0b2RvLnRpdGxlKX1cclxuICAgICAgICAgICAgPC9oND5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0b2RvLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAke3Nhbml0aXplKHRvZG8uZGVzY3JpcHRpb24pfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tYnRucy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvZG8tZG9uZSBidG4tY2lyY2xlXCIgdGl0bGU9JHt0b2RvLmRvbmU/IFwiRG9uZVwiOiBcIlRvZG9cIn0+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+JHt0b2RvLmRvbmU/IFwiY2hlY2tfY2lyY2xlXCI6IFwicmFkaW9fYnV0dG9uX3VuY2hlY2tlZFwifTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvZG8tZGV0YWlscyBidG4tY2lyY2xlXCIgdGl0bGU9XCJNb3JlIERldGFpbHNcIj48c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5zdW1tYXJpemU8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gICAgaXRlbS5pbm5lckhUTUwgPSBIVE1MU25pcHBldDtcclxuICAgIHJldHVybiBpdGVtO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlVG9kb0xpc3QoYXJyYXksIGluZGV4LCB0aXRsZSkge1xyXG4gICAgY29uc3QgdG9kb0xpc3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuICAgIHRvZG9MaXN0c0Rpdi5pbm5lckhUTUwgPSAnJztcclxuICAgIHRvZG9MaXN0VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbGV0IHRvZG9zVG9EaXNwbGF5O1xyXG4gICAgaWYgKGluZGV4ID09PSAnYWxsTGlzdHMnKSB7XHJcbiAgICAgICAgdG9kb3NUb0Rpc3BsYXkgPSBwcm9qZWN0RnVuY3Rpb25zLmdldEFsbExpc3RzKGFycmF5KTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT09ICd0b2RheUxpc3QnKSB7XHJcbiAgICAgICAgdG9kb3NUb0Rpc3BsYXkgPSBwcm9qZWN0RnVuY3Rpb25zLmdldFRvZGF5TGlzdChhcnJheSk7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAndXBjb21pbmdMaXN0Jykge1xyXG4gICAgICAgIHRvZG9zVG9EaXNwbGF5ID0gcHJvamVjdEZ1bmN0aW9ucy5nZXRVcGNvbWluZ0xpc3QoYXJyYXkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGV5XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IFsuLi5hcnJheVtpbmRleF0ubGlzdC5tYXAoKHRvZG8sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgIHt0b2RvLCBpbmRleH1cclxuICAgICAgICApKV07XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0b2Rvc1RvRGlzcGxheSk7XHJcblxyXG4gICAgdG9kb3NUb0Rpc3BsYXkuZm9yRWFjaCgoe3RvZG8sIGluZGV4fSkgPT4ge1xyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNyZWF0ZVRvZG8odG9kbywgaW5kZXgpKTtcclxuICAgIH0pXHJcbiAgICB0b2RvTGlzdHNEaXYuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG4vLyBQcm9qZWN0IERPTVxyXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KHByb2plY3QsIGluZGV4KSB7XHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdsaW5rLWJ0bicsICdwcm9qZWN0LWJ0bicpO1xyXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpbmRleCk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIHByb2plY3QubmFtZSk7XHJcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgaW5kZXgpO1xyXG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgcmV0dXJuIHtidXR0b246IGJ1dHRvbiwgb3B0aW9uOiBvcHRpb259O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdChhcnJheSkge1xyXG4gICAgcHJvamVjdHNEaXYuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB0b2RvUHJvamVjdC5pbm5lckhUTUwgPSAnPG9wdGlvbiB2YWx1ZT1cIjBcIiBzZWxlY3RlZD5Ib21lPC9vcHRpb24+JztcclxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RPYmogPSBjcmVhdGVQcm9qZWN0KGFycmF5W2ldLCBpKTtcclxuICAgICAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChwcm9qZWN0T2JqLmJ1dHRvbik7XHJcbiAgICAgICAgdG9kb1Byb2plY3QuYXBwZW5kQ2hpbGQocHJvamVjdE9iai5vcHRpb24pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBUb2RvIERldGFpbHMgUGFnZVxyXG5mdW5jdGlvbiBkaXNwbGF5VG9kb0RldGFpbHModG9kbykge1xyXG4gICAgdG9kb1RpdGxlLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcclxuICAgIHRvZG9EZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZGVzY3JpcHRpb247XHJcbiAgICB0b2RvRHVlZGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZTtcclxuICAgIHRvZG9Qcmlvcml0eS50ZXh0Q29udGVudCA9IHRvZG8ucHJpb3JpdHk7XHJcbiAgICB0b2RvTm90ZXMudGV4dENvbnRlbnQgPSB0b2RvLm5vdGVzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Y3JlYXRlVG9kbywgY3JlYXRlUHJvamVjdCwgdXBkYXRlVG9kb0xpc3QsIHVwZGF0ZVByb2plY3RMaXN0LCBkaXNwbGF5VG9kb0RldGFpbHN9OyIsImltcG9ydCBkYXRlRnVuY3Rpb25zIGZyb20gJy4vZGF0ZS5qcyc7XHJcblxyXG5mdW5jdGlvbiBnZXRBbGxMaXN0cyAocHJvamVjdHMpIHtcclxuICAgIGxldCBhcnIgPSBbXTtcclxuICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgYXJyID0gWy4uLmFyciwgLi4ucHJvamVjdC5saXN0Lm1hcCgodG9kbywgaW5kZXgpID0+IChcclxuICAgICAgICAgICAge3RvZG8sIGluZGV4fVxyXG4gICAgICAgICkpXTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb2RheUxpc3QgKHByb2plY3RzKSB7XHJcbiAgICBjb25zdCBhbGxMaXN0cyA9IGdldEFsbExpc3RzKHByb2plY3RzKTtcclxuICAgIGNvbnN0IHRvZGF5TGlzdCA9IGFsbExpc3RzLmZpbHRlcigoe3RvZG8sIGluZGV4fSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBkYXRlRnVuY3Rpb25zLmZpbHRlclRvZGF5KHRvZG8uZHVlRGF0ZSk7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHRvZGF5TGlzdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VXBjb21pbmdMaXN0IChwcm9qZWN0cykge1xyXG4gICAgY29uc3QgYWxsTGlzdHMgPSBnZXRBbGxMaXN0cyhwcm9qZWN0cyk7XHJcbiAgICBjb25zdCB1cGNvbWluZ0xpc3QgPSBhbGxMaXN0cy5maWx0ZXIoKHt0b2RvLCBpbmRleH0pID0+IHtcclxuICAgICAgICByZXR1cm4gZGF0ZUZ1bmN0aW9ucy5maWx0ZXJVcGNvbWluZyh0b2RvLmR1ZURhdGUpO1xyXG4gICAgfSlcclxuICAgIHJldHVybiB1cGNvbWluZ0xpc3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtnZXRBbGxMaXN0cywgZ2V0VG9kYXlMaXN0LCBnZXRVcGNvbWluZ0xpc3R9OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RNYWtlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBwcmlvcml0eSkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge25hbWUsIHByaW9yaXR5fSk7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcbiAgICB9XHJcbn0iLCIvLyBzYW5pdGl6ZXIgdG8gdXNlIGlubmVySFRNTCB3aXRob3V0IHNlY3VyaXR5IGNvbmNlcm5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2FuaXRpemUoaW5wdXQpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnRleHRDb250ZW50ID0gaW5wdXQ7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufSIsImNvbnN0IHRoZW1lU3dpdGNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT10aGVtZS1zd2l0Y2hdJyk7XHJcbmNvbnN0IHNpZGViYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZS1iYXItdG9nZ2xlJyk7XHJcblxyXG4vLyBNYXRjaCB1c2VyIFRoZW1lXHJcbmlmKHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcykge1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdkYXJrJyk7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5jaGVja2VkID0gdHJ1ZTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkxpZ2h0IE1vZGVcIik7XHJcbn0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2xpZ2h0Jyk7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJEYXJrIE1vZGVcIik7XHJcbn1cclxuXHJcbi8vIFRvZ2dsZSBUaGVtZSBvbiBDbGlja1xyXG50aGVtZVN3aXRjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLChlKSA9PiB7XHJcbiAgICBpZihlLnRhcmdldC5jaGVja2VkKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdkYXJrJyk7XHJcbiAgICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiU3dpdGNoIHRvIExpZ2h0XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2xpZ2h0Jyk7XHJcbiAgICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiU3dpdGNoIHRvIERhcmtcIik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gVG9nZ2xlIFNpZGViYXJcclxuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzaG93LXNpZGUtYmFyJyk7XHJcbnNpZGViYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctc2lkZS1iYXInKTtcclxufSkiLCJpbXBvcnQgVG9kb01ha2VyIGZyb20gJy4vdG9kby1tYWtlcic7XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VUaXRsZSh0b2RvLCBuZXdUaXRsZSkge1xyXG4gICAgdG9kby50aXRsZSA9IG5ld1RpdGxlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VEZXNjcmlwdGlvbih0b2RvLCBuZXdEZXNjcmlwdGlvbikge1xyXG4gICAgdG9kby5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VEdWVEYXRlICh0b2RvLCBuZXdEYXRlKSB7XHJcbiAgICB0b2RvLmR1ZURhdGUgPSBuZXdEYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VQcmlvcml0eSAodG9kbywgbmV3UHJpb3JpdHkpIHtcclxuICAgIHRvZG8ucHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlTm90ZXMgKHRvZG8sIG5ld05vdGVzKSB7XHJcbiAgICB0b2RvLm5vdGVzID0gbmV3Tm90ZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVN0YXRlICh0b2RvKSB7XHJcbiAgICB0b2RvLmRvbmUgPSB0b2RvLmRvbmUgPyBmYWxzZSA6IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZUl0ZW0gKGFycmF5LCBpbmRleCkge1xyXG4gICAgcmV0dXJuIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVkaXRUb2RvKHByb2plY3RzLCB0b2RvLCBuZXdUaXRsZSwgbmV3RGVzLCBuZXdEdWVEYXRlLCBuZXdQcmlvcml0eSwgbmV3Tm90ZXMsIG5ld1Byb2plY3QpIHtcclxuICAgIGlmKHRvZG8ucHJvamVjdEluZGV4ICE9PSBuZXdQcm9qZWN0KSB7XHJcbiAgICAgICAgcHJvamVjdHNbdG9kby5wcm9qZWN0SW5kZXhdLmxpc3Quc3BsaWNlKHRvZG8uaW5kZXgsIDEpO1xyXG4gICAgICAgIHByb2plY3RzW25ld1Byb2plY3RdLmxpc3QucHVzaChuZXcgVG9kb01ha2VyKG5ld1RpdGxlLCBuZXdEZXMsIG5ld0R1ZURhdGUsIG5ld1ByaW9yaXR5LCBuZXdOb3RlcywgdG9kby5kb25lLCBuZXdQcm9qZWN0KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGVkaXRpbmdUb2RvID0gcHJvamVjdHNbdG9kby5wcm9qZWN0SW5kZXhdLmxpc3RbdG9kby5pbmRleF07XHJcbiAgICAgICAgY2hhbmdlVGl0bGUoZWRpdGluZ1RvZG8sIG5ld1RpdGxlKTtcclxuICAgICAgICBjaGFuZ2VEZXNjcmlwdGlvbihlZGl0aW5nVG9kbywgbmV3RGVzKTtcclxuICAgICAgICBjaGFuZ2VEdWVEYXRlKGVkaXRpbmdUb2RvLCBuZXdEdWVEYXRlKTtcclxuICAgICAgICBjaGFuZ2VQcmlvcml0eShlZGl0aW5nVG9kbywgbmV3UHJpb3JpdHkpO1xyXG4gICAgICAgIGNoYW5nZU5vdGVzKGVkaXRpbmdUb2RvLCBuZXdOb3Rlcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtlZGl0VG9kbywgY2hhbmdlU3RhdGUsIGRlbGV0ZUl0ZW19OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9NYWtlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0fSk7XHJcbiAgICB9O1xyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBEZXBlbmRlbmNpZXNcclxuaW1wb3J0ICdtYXRlcmlhbC1zeW1ib2xzL291dGxpbmVkLmNzcyc7XHJcbmltcG9ydCAnLi9zdHlsZS9zdHlsZS5zY3NzJztcclxuaW1wb3J0ICcuL21vZHVsZXMvdGhlbWUmc2lkZWJhcic7XHJcbmltcG9ydCBUb2RvTWFrZXIgZnJvbSAnLi9tb2R1bGVzL3RvZG8tbWFrZXInO1xyXG5pbXBvcnQgUHJvamVjdE1ha2VyIGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LW1ha2VyJztcclxuaW1wb3J0IFRvZG9GdW5jdGlvbnMgZnJvbSAnLi9tb2R1bGVzL3RvZG8tZnVuY3Rpb25zJztcclxuaW1wb3J0IERvbUZ1bmN0aW9ucyBmcm9tICcuL21vZHVsZXMvZG9tLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBQcm9qZWN0RnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LWZ1bmN0aW9ucyc7XHJcblxyXG5cclxuLy8gRE9NIEVsZW1lbnRzXHJcbmNvbnN0IHRvZG9MaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktcHJvamVjdHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IHRvZG9EZXRhaWxzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbHMtY2FyZC1jb250YWluZXInKTtcclxuY29uc3QgdG9kb0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscy1jYXJkJyk7XHJcbi8vIElucHV0c1xyXG5jb25zdCB0b2RvRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdG9kby1mb3JtJyk7XHJcbmNvbnN0IHByb2plY3RGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybS1jb250YWluZXInKTtcclxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XHJcbi8vIFRvZG8gSW5wdXRzXHJcbmNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xyXG5jb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcclxuY29uc3QgdG9kb0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xyXG5jb25zdCB0b2RvVGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lJyk7XHJcbmNvbnN0IHRvZG9Qcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpO1xyXG5jb25zdCB0b2RvTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90ZXMnKTtcclxuY29uc3QgdG9kb1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xyXG4vLyBQcm9qZWN0IElucHV0c1xyXG5jb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpO1xyXG5jb25zdCBwcm9qZWN0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1wcmlvcml0eScpO1xyXG5cclxuLy8gRm9ybSBCdXR0b25zXHJcbmNvbnN0IG9wZW5Ub2RvRm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcGVuLXRvZG8tZm9ybS1idG4nKTtcclxuY29uc3QgYWRkVG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdG9kby1idG4nKTtcclxuY29uc3Qgb3BlblByb2plY3RGb3JtQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLXByb2plY3QtZm9ybS1idG4nKTtcclxuY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1idG4nKTtcclxuY29uc3QgY2FuY2VsQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tY2FuY2VsJyk7XHJcblxyXG4vLyBQcm9qZWN0IEJ1dHRvbnNcclxuY29uc3QgaG9tZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIkhvbWVcIl0nKTtcclxuY29uc3QgYWxsTGlzdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJBbGwgTGlzdHNcIl0nKTtcclxuY29uc3QgdG9kYXlMaXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiVG9kYXlcIl0nKTtcclxuY29uc3QgdXBjb21pbmdMaXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiVXBjb21pbmdcIl0nKTtcclxuY29uc3QgbXlQcm9qZWN0c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIk15IFByb2plY3RzXCJdJyk7XHJcblxyXG4vLyBJbml0aWFsaXplIHZhcmlhYmxlc1xyXG5jb25zdCBwcm9qZWN0cyA9IFtcclxuICAgIG5ldyBQcm9qZWN0TWFrZXIoXCJIb21lXCIsIG51bGwpLFxyXG5dO1xyXG5sZXQgY3VycmVudFBhZ2UgPSBudWxsO1xyXG5sZXQgZWRpdGluZ1RvZG8gPSBmYWxzZTtcclxuXHJcblxyXG4vLyBBZGQgVG9kbyBJdGVtXHJcbmZ1bmN0aW9uIGFkZFRvZG9JdGVtICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCkge1xyXG4gICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvTWFrZXIodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3QpO1xyXG4gICAgcHJvamVjdHNbcHJvamVjdF0ubGlzdC5wdXNoKG5ld1RvZG8pO1xyXG59XHJcblxyXG5cclxuLy8gQ2hhbmdpbmcgdG9kbyBkb25lIHN0YXR1c1xyXG5mdW5jdGlvbiB1cGRhdGVEb25lU3RhdHVzKHByb2plY3RJbmRleCwgdG9kbykge1xyXG4gICAgVG9kb0Z1bmN0aW9ucy5jaGFuZ2VTdGF0ZShwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbdG9kb10pO1xyXG4gICAgdXBkYXRlUGFnZShwcm9qZWN0SW5kZXgpO1xyXG59XHJcblxyXG5cclxuLy8gUmVtb3ZlIFRvZG8gSXRlbVxyXG5mdW5jdGlvbiByZW1vdmVUb2RvSXRlbSAocHJvamVjdEluZGV4LCBpbmRleCkge1xyXG4gICAgVG9kb0Z1bmN0aW9ucy5kZWxldGVJdGVtKHByb2plY3RzW3Byb2plY3RJbmRleF0ubGlzdCwgaW5kZXgpO1xyXG4gICAgdXBkYXRlUGFnZShwcm9qZWN0SW5kZXgpO1xyXG4gICAgdG9kb0RldGFpbHNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG59XHJcblxyXG5cclxuLy8gVXBkYXRlIFBhZ2UgYmFzZWQgb24gY3VycmVudFBhZ2VcclxuZnVuY3Rpb24gdXBkYXRlUGFnZShwcm9qZWN0SW5kZXgpIHtcclxuICAgIHN3aXRjaChjdXJyZW50UGFnZSl7XHJcbiAgICAgICAgY2FzZSAnYWxsTGlzdHMnOlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsICdhbGxMaXN0cycsICdBbGwgTGlzdHMnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9kYXlMaXN0JzpcclxuICAgICAgICAgICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCAndG9kYXlMaXN0JywgJ1RvZGF5IExpc3QnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndXBjb21pbmdMaXN0JzpcclxuICAgICAgICAgICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCAndXBjb21pbmdMaXN0JywgJ1VwY29taW5nIExpc3QnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCBwcm9qZWN0SW5kZXgsIHByb2plY3RzW3Byb2plY3RJbmRleF0ubmFtZSk7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxufVxyXG5cclxuXHJcbi8vIEFkZCBQcm9qZWN0XHJcbmZ1bmN0aW9uIGFkZFByb2plY3QgKG5hbWUsIHByaW9yaXR5KSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3RNYWtlcihuYW1lLCBwcmlvcml0eSk7XHJcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVByb2plY3RMaXN0KHByb2plY3RzKTtcclxuICAgIC8vIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG4gICAgY29uc3QgcHJvamVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcclxuICAgIHByb2plY3RCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgICAgICBjdXJyZW50UGFnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHVwZGF0ZVBhZ2UoaW5kZXgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgcHJvamVjdEZvcm1Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgcHJvamVjdHNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgdXBkYXRlUGFnZShwcm9qZWN0cy5sZW5ndGggLTEpO1xyXG59XHJcblxyXG5cclxuLy8gUmVtb3ZlIFByb2plY3RcclxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdCAoaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0cywgaW5kZXgpO1xyXG4gICAgdXBkYXRlUGFnZSgwKTtcclxufVxyXG5cclxuXHJcbi8vIFRvZ2dsZSBUb2RvIEZvcm0gT3BlbiBVcFxyXG5vcGVuVG9kb0Zvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBhZGRUb2RvQnRuLnRleHRDb250ZW50ID0gJ0FkZCBUb2RvJztcclxuICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxufSk7XHJcbnRvZG9Gb3JtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY2xvc2VGb3JtKHRvZG9Gb3JtKTtcclxufSk7XHJcbnRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG5cclxuLy8gVG9nZ2xlIFByb2plY3QgRm9ybSBPcGVuIFVwXHJcbm9wZW5Qcm9qZWN0Rm9ybUJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgYWRkUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdBZGQgUHJvamVjdCc7XHJcbiAgICAgICAgICAgIHByb2plY3RGb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG59KVxyXG5wcm9qZWN0Rm9ybUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNsb3NlRm9ybShwcm9qZWN0Rm9ybSk7XHJcbn0pO1xyXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKX0pO1xyXG5cclxuLy8gY2FuY2VsIGJ1dHRvbnNcclxuY2FuY2VsQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VGb3JtKGJ0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgfSlcclxufSlcclxuXHJcbi8vIEVkaXQgVG9kbyBGb3JtXHJcbmZ1bmN0aW9uIHNob3dFZGl0Rm9ybShwcm9qZWN0SW5kZXgsIGluZGV4KSB7XHJcbiAgICBlZGl0aW5nVG9kbyA9IHtwcm9qZWN0SW5kZXgsIGluZGV4fTtcclxuICAgIGNvbnN0IHRvZG8gPSBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbaW5kZXhdO1xyXG4gICAgdG9kb1RpdGxlLnZhbHVlID0gdG9kby50aXRsZTtcclxuICAgIHRvZG9EZXNjcmlwdGlvbi52YWx1ZSA9IHRvZG8uZGVzY3JpcHRpb247XHJcbiAgICB0b2RvRGF0ZS52YWx1ZSA9IHRvZG8uZHVlRGF0ZS5zcGxpdCgnVCcpWzBdO1xyXG4gICAgdG9kb1RpbWUudmFsdWUgPSB0b2RvLmR1ZURhdGUuc3BsaXQoJ1QnKVsxXTtcclxuICAgIHRvZG9Qcmlvcml0eS52YWx1ZSA9IHRvZG8ucHJpb3JpdHk7XHJcbiAgICB0b2RvTm90ZXMudmFsdWUgPSB0b2RvLm5vdGVzO1xyXG4gICAgdG9kb1Byb2plY3QudmFsdWUgPSB0b2RvLnByb2plY3Q7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB0b2RvRGV0YWlsc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICBhZGRUb2RvQnRuLnRleHRDb250ZW50ID0gXCJTYXZlIENoYW5nZXNcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VGb3JtKGZvcm0pIHtcclxuICAgIGZvcm0ucmVzZXQoKTtcclxuICAgIGZvcm0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbn1cclxuXHJcblxyXG4vLyBBZGQvRWRpdCB0b2RvIGl0ZW0gb24gRm9ybSBzdWJtaXRcclxuYWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gdG9kb0RhdGUudmFsdWUgKyBcIlRcIiArIHRvZG9UaW1lLnZhbHVlO1xyXG4gICAgaWYoZWRpdGluZ1RvZG8pIHtcclxuICAgICAgICBUb2RvRnVuY3Rpb25zLmVkaXRUb2RvKHByb2plY3RzLCBlZGl0aW5nVG9kbywgdG9kb1RpdGxlLnZhbHVlLCB0b2RvRGVzY3JpcHRpb24udmFsdWUsIGR1ZURhdGUsIHRvZG9Qcmlvcml0eS52YWx1ZSwgdG9kb05vdGVzLnZhbHVlLCArdG9kb1Byb2plY3QudmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhZGRUb2RvSXRlbSh0b2RvVGl0bGUudmFsdWUsIHRvZG9EZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZSwgdG9kb1ByaW9yaXR5LnZhbHVlLCB0b2RvTm90ZXMudmFsdWUsIGZhbHNlLCArdG9kb1Byb2plY3QudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUGFnZSh0b2RvUHJvamVjdC52YWx1ZSk7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbn0pO1xyXG5cclxuXHJcbi8vIEFkZC9FZGl0IHByb2plY3Qgb24gRm9ybSBzdWJtaXRcclxuYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZihwcm9qZWN0VGl0bGUudmFsdWUgJiYgcHJvamVjdFByaW9yaXR5LnZhbHVlKSB7XHJcbiAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0VGl0bGUudmFsdWUsIHByb2plY3RQcmlvcml0eS52YWx1ZSk7XHJcbiAgICB9XHJcbn0pXHJcblxyXG5cclxuLy8gTmF2aWdhdGUgUHJvamVjdHNcclxuaG9tZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGN1cnJlbnRQYWdlID0gbnVsbDtcclxuICAgIHVwZGF0ZVBhZ2UoMCk7XHJcbn0pO1xyXG5teVByb2plY3RzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgcHJvamVjdHNEaXYuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG59KTtcclxuYWxsTGlzdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjdXJyZW50UGFnZSA9IFwiYWxsTGlzdHNcIjtcclxuICAgIHVwZGF0ZVBhZ2UoKTtcclxufSlcclxudG9kYXlMaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY3VycmVudFBhZ2UgPSBcInRvZGF5TGlzdFwiO1xyXG4gICAgdXBkYXRlUGFnZSgpO1xyXG59KVxyXG51cGNvbWluZ0xpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjdXJyZW50UGFnZSA9IFwidXBjb21pbmdMaXN0XCI7XHJcbiAgICB1cGRhdGVQYWdlKCk7XHJcbn0pXHJcblxyXG5cclxuLy8gRGV0YWlscyBDb250YWluZXJcclxuZnVuY3Rpb24gc2hvd1RvZG9EZXRhaWxzKHByb2plY3RJbmRleCwgaW5kZXgpIHtcclxuICAgIGNvbnN0IHRvZG8gPSBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbaW5kZXhdO1xyXG4gICAgRG9tRnVuY3Rpb25zLmRpc3BsYXlUb2RvRGV0YWlscyh0b2RvKTtcclxuICAgIGNvbnN0IHRvZG9FZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tZWRpdC1idG4nKTtcclxuICAgIGNvbnN0IHRvZG9EZWxldGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1kZWwtYnRuJyk7XHJcbiAgICB0b2RvRGVsZXRlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVtb3ZlVG9kb0l0ZW0odG9kby5wcm9qZWN0LCBpbmRleCk7XHJcbiAgICB9O1xyXG4gICAgdG9kb0VkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgc2hvd0VkaXRGb3JtKHByb2plY3RJbmRleCwgaW5kZXgpO1xyXG4gICAgfSlcclxuICAgIHRvZG9EZXRhaWxzRGl2LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIHRvZG9EZXRhaWxzRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRvZG9EZXRhaWxzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG59O1xyXG50b2RvRGV0YWlscy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKX0pO1xyXG5cclxuXHJcbi8vIFJlZnJlc2ggRXZlbnQgTGlzdGVuZXJzXHJcbmZ1bmN0aW9uIHJlZnJlc2hFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHRvZG9Eb25lQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWRvbmUnKTtcclxuICAgIGNvbnN0IHRvZG9EZXRhaWxzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWRldGFpbHMnKTtcclxuXHJcbiAgICB0b2RvRG9uZUJ0bnMuZm9yRWFjaChkb25lQnRuID0+IHtcclxuICAgICAgICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICsgZG9uZUJ0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9ICsgZG9uZUJ0bi5wYXJlbnROb2RlLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKTtcclxuICAgICAgICAgICAgdXBkYXRlRG9uZVN0YXR1cyhwcm9qZWN0SW5kZXgsIGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdG9kb0RldGFpbHNCdG5zLmZvckVhY2goZGV0YWlsc0J0biA9PiB7XHJcbiAgICAgICAgZGV0YWlsc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSArIGRldGFpbHNCdG4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSArIGRldGFpbHNCdG4ucGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgICAgIHNob3dUb2RvRGV0YWlscyhwcm9qZWN0SW5kZXgsIGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuLy8gVEVTVElOR1xyXG5cclxuYWRkUHJvamVjdChcIk15IFByb2plY3QgMVwiLCAxKTtcclxuYWRkUHJvamVjdChcIk15IFByb2plY3QgMlwiLCAyKTtcclxuXHJcbmFkZFRvZG9JdGVtKFwiQ29kZVwiLCBcIldyaXRlIGNvZGUgZm9yIHRoZSBuZXcgZmVhdHVyZVwiLCBcIjIwMjQtMDMtMDdUMTI6MDA6MDBcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMCk7XHJcbmFkZFRvZG9JdGVtKFwiU3R1ZHlcIiwgXCJQcmVwYXJlIGZvciB0aGUgdXBjb21pbmcgZXhhbVwiLCBcIjIwMjQtMDMtMDhUMTQ6MzA6MDBcIiwgMiwgXCJTdHVkeSBmb3IgZXhhbXNcIiwgZmFsc2UsIDApO1xyXG5hZGRUb2RvSXRlbShcIkV4ZXJjaXNlXCIsIFwiR28gZm9yIGEgam9nIGluIHRoZSBwYXJrXCIsIFwiMjAyNC0wMy0wOVQxODowMDowMFwiLCAzLCBcIkdvIGZvciBhIHJ1blwiLCBmYWxzZSwgMSk7XHJcbmFkZFRvZG9JdGVtKFwiUmVhZFwiLCBcIkZpbmlzaCB0aGUgbGF0ZXN0IG5vdmVsXCIsIFwiMjAyNC0wMy0xMFQxMDowMDowMFwiLCAxLCBcIlJlYWQgYSBib29rXCIsIGZhbHNlLCAxKTtcclxuYWRkVG9kb0l0ZW0oXCJNZWV0aW5nXCIsIFwiRGlzY3VzcyBwcm9qZWN0IHVwZGF0ZXNcIiwgXCIyMDI0LTAzLTExVDE1OjQ1OjAwXCIsIDIsIFwiQXR0ZW5kIHRlYW0gbWVldGluZ1wiLCBmYWxzZSwgMik7XHJcbmFkZFRvZG9JdGVtKFwiUHJvamVjdFwiLCBcIldvcmsgb24gVUkgaW1wcm92ZW1lbnRzXCIsIFwiMjAyNC0wMy0xMlQwOTozMDowMFwiLCAzLCBcIldvcmsgb24gcHJvamVjdFwiLCBmYWxzZSwgMik7XHJcblxyXG4vLyBTdGFydCBhdCBIb21lIFBhZ2UgXHJcbkRvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgMCwgcHJvamVjdHNbMF0ubmFtZSk7XHJcbnJlZnJlc2hFdmVudExpc3RlbmVycygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==