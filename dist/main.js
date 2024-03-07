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
function changeTitle(todo, newTitle) {
    todo.title = newTitle;
}

function changeDescription(todo, newDescription) {
    todo.description = newDescription;
}

function changeState (todo) {
    todo.done = todo.done ? false : true;
}

function changePriority (todo, newPriority) {
    todo.priority = newPriority;
}

function changeDueDate (todo, newDate) {
    todo.dueDate = newDate;
}

function changeNotes (todo, newNotes) {
    todo.notes = newNotes;
}

function deleteItem (array, index) {
    return array.splice(index, 1);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({changeTitle, changeDescription, changeState, changePriority, changeDueDate, changeNotes, deleteItem});

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
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/style.scss */ "./src/style/style.scss");
/* harmony import */ var material_symbols_outlined_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! material-symbols/outlined.css */ "./node_modules/material-symbols/outlined.css");
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

// Add Buttons
const openTodoFormBtn = document.querySelector('.open-todo-form-btn');
const addTodoBtn = document.querySelector('#add-todo-btn');
const openProjectFormBtns = document.querySelectorAll('.open-project-form-btn');
const addProjectBtn = document.querySelector('#add-project-btn');

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


// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new _modules_todo_maker__WEBPACK_IMPORTED_MODULE_3__["default"](title, description, dueDate, priority, notes, done, project);
    projects[project].list.push(newTodo);
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, project, projects[project].name);
    todoFormContainer.classList.remove('show');
    refreshEventListeners();
}


// Changing todo done status
function updateDoneStatus(projectIndex, todo) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].changeState(projects[projectIndex].list[todo]);
    updatePage(projectIndex);
    refreshEventListeners();
}


// Remove Todo Item
function removeTodoItem (projectIndex, index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects[projectIndex].list, index);
    updatePage(projectIndex);
    todoDetailsDiv.classList.remove('show');
    refreshEventListeners();
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
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, index, projects[index].name);
            refreshEventListeners();
        })
    })
    projectFormContainer.classList.remove('show');
    projectsDiv.classList.add('show');
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, projects.length - 1, projects[projects.length -1].name);
}


// Remove Project
function removeProject (index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects, index);
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0, projects[0].name);
}


// Toggle Todo Form Open Up
openTodoFormBtn.addEventListener('click', () => {
    todoFormContainer.classList.add('show');
    todoFormContainer.addEventListener('click', () => {
        todoFormContainer.classList.remove('show');
    });
});
todoForm.addEventListener('click', (e) => {e.stopPropagation()});


// Toggle Project Form Open Up
openProjectFormBtns.forEach(btn => {
        btn.addEventListener('click', () => {
        projectFormContainer.classList.add('show');
        projectFormContainer.addEventListener('click', () => {
            projectFormContainer.classList.remove('show');
        });
    });
})
projectForm.addEventListener('click', (e) => {e.stopPropagation()});


// Add/Edit todo item on Form submit
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const dueDate = todoDate.value + "T" + todoTime.value;
    addTodoItem(todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, false, +todoProject.value);
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
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0, projects[0].name);
    refreshEventListeners();
    currentPage = null;
});
myProjectsBtn.addEventListener('click', () => {
    projectsDiv.classList.toggle('show');
});
allListsBtn.addEventListener('click', () => {
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, "allLists", "All Lists");
    currentPage = "allLists";
    refreshEventListeners();
})
todayListBtn.addEventListener('click', () => {
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, "todayList", "Today List");
    currentPage = "todayList";
    refreshEventListeners();
})
upcomingListBtn.addEventListener('click', () => {
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, "upcomingList", "Upcoming List");
    currentPage = "upcomingList";
    refreshEventListeners();
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


// Edit Todo Form
function showEditForm(projectIndex, index) {

}


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

addTodoItem("Code", "<img src=''>", "2024-03-07", 1, "blah blah blah", false, 0);
addTodoItem("Eat", "coding is beautiful", "2024-03-08", 1, "blah blah blah", false, 0);
addTodoItem("Sleep", "coding is beautiful", "2024-03-05", 1, "blah blah blah", false, 1);
addTodoItem("Repeat", "coding is beautiful", "2024-03-06", 1, "blah blah blah", false, 2);

// Start at Home Page 
_modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0, projects[0].name);
refreshEventListeners();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxvQkFBb0I7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUFZO0FBQ1osd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLXN5bWJvbHMvb3V0bGluZWQuY3NzPzYwZjQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHlsZS9zdHlsZS5zY3NzPzQ1NmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QtZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LW1ha2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9zYW5pdGl6ZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RoZW1lJnNpZGViYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8tZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLW1ha2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcclxuY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJkYXRlXCJdJyk7XHJcbmNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGltZVwiXScpO1xyXG5cclxuY29uc3QgZGF0ZUFycmF5ID0gW107XHJcblxyXG5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBkYXRlU3RyaW5nID0gZGF0ZS52YWx1ZSArIFwiVFwiICsgdGltZS52YWx1ZTtcclxuICAgIGNvbnNvbGUubG9nKGRhdGVTdHJpbmcpO1xyXG4gICAgY29uc3QgZGF0ZVRpbWUgPSBjcmVhdGVEYXRlKGRhdGVTdHJpbmcpO1xyXG4gICAgZGF0ZUFycmF5LnB1c2goZGF0ZVRpbWUpO1xyXG59KVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRGF0ZSAoZGF0ZVN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzb3J0RGF0ZShhcnJheSkge1xyXG4gICAgcmV0dXJuIGFycmF5LnNvcnQoKGEsYikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoYSk7XHJcbiAgICAgICAgY29uc3QgZGF0ZUIgPSBuZXcgRGF0ZShiKTtcclxuICAgICAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCB0ZXN0QXJyYXkgPSBbXHJcbiAgICBcIk1hciAxMiAyMDEyIDEwOjAwOjAwIEFNXCIsXHJcbiAgICBcIk1hciA4IDIwMTIgMDg6MDA6MDAgQU1cIlxyXG5dXHJcblxyXG5jb25zb2xlLmxvZyh0ZXN0QXJyYXkpO1xyXG5jb25zb2xlLmxvZyhzb3J0RGF0ZSh0ZXN0QXJyYXkpKTtcclxuXHJcbmNvbnN0IGRhdGUxID0gbmV3IERhdGUoJzIwMjQtMDMtMTEnKTtcclxuY29uc3QgZGF0ZTIgPSBuZXcgRGF0ZSgnMjAyNC0wNC0wNlQyMDoyNDozMicpO1xyXG5jb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbmNvbnNvbGUubG9nKGRhdGUxLmdldFRpbWUoKSA8IHRvZGF5LmdldFRpbWUoKSk7IC8vIERhdGVkIGR1ZWRcclxuY29uc29sZS5sb2coW2RhdGUxLmdldEZ1bGxZZWFyKCksIHBhZDJkaWdpdHMoZGF0ZTEuZ2V0TW9udGgoKSsxKSwgcGFkMmRpZ2l0cyhkYXRlMS5nZXREYXRlKCkpXS5qb2luKCctJykpO1xyXG5cclxuY29uc29sZS5sb2coZGF0ZTEuZ2V0RGF0ZSgpID09PSB0b2RheS5nZXREYXRlKCkpOyAvLyBkYXlcclxuY29uc29sZS5sb2coZGF0ZTIuZ2V0RGF0ZSgpID09PSB0b2RheS5nZXREYXRlKCkpO1xyXG5cclxuY29uc29sZS5sb2coZGF0ZTEuZ2V0RGF0ZSgpKTtcclxuXHJcbi8vIFBhZCAwcyBvbiBkYXkgJiBtb250aFxyXG5mdW5jdGlvbiBwYWQyZGlnaXRzKG51bSkge1xyXG4gICAgcmV0dXJuIFN0cmluZyhudW0pLnBhZFN0YXJ0KDIsICcwJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEZvcm1hdHRlZERhdGUgKGRhdGUpIHtcclxuICAgIHJldHVybiBbZGF0ZS5nZXRGdWxsWWVhcigpLCBwYWQyZGlnaXRzKHRvZGF5LmdldE1vbnRoKCkgKyAxKSwgcGFkMmRpZ2l0cyh0b2RheS5nZXREYXRlKCkpXS5qb2luKCctJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbHRlclRvZGF5KGRhdGUpIHtcclxuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBkYXRlLnNwbGl0KCdUJylbMF07XHJcbiAgICBjb25zdCB0b2RheSA9IGdldEZvcm1hdHRlZERhdGUobmV3IERhdGUoKSk7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVkRGF0ZSA9PT0gdG9kYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbHRlclVwY29taW5nKGRhdGUpIHtcclxuICAgIGNvbnN0IHRvdGFsVGltZUZyb21EYXRlID0gbmV3IERhdGUoZGF0ZSkuZ2V0VGltZSgpO1xyXG4gICAgY29uc29sZS5sb2codG90YWxUaW1lRnJvbURhdGUpO1xyXG4gICAgY29uc3QgdG90YWxUaW1lRnJvbVRvZGF5ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICBjb25zb2xlLmxvZyh0b3RhbFRpbWVGcm9tVG9kYXkpO1xyXG4gICAgcmV0dXJuIHRvdGFsVGltZUZyb21EYXRlID4gdG90YWxUaW1lRnJvbVRvZGF5O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7ZmlsdGVyVG9kYXksIGZpbHRlclVwY29taW5nfTsiLCJpbXBvcnQgc2FuaXRpemUgZnJvbSAnLi9zYW5pdGl6ZXIuanMnO1xyXG5pbXBvcnQgcHJvamVjdEZ1bmN0aW9ucyBmcm9tICcuL3Byb2plY3QtZnVuY3Rpb25zLmpzJztcclxuXHJcbmNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15LXByb2plY3RzLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcbmNvbnN0IHRvZG9MaXN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0LXRpdGxlJyk7XHJcblxyXG5jb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tdGl0bGUnKTtcclxuY29uc3QgdG9kb0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLWRlc2NyaXB0aW9uJyk7XHJcbmNvbnN0IHRvZG9EdWVkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLWR1ZWRhdGUgc3BhbicpO1xyXG5jb25zdCB0b2RvUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tcHJpb3JpdHkgc3BhbicpO1xyXG5jb25zdCB0b2RvTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tbm90ZXMnKTtcclxuXHJcbi8vIFRvZG8gRE9NXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvZG8gKHRvZG8sIGluZGV4KSB7XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY2FyZC1jb250YWluZXInKTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpO1xyXG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIHRvZG8ucHJvamVjdCk7XHJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1kb25lJywgdG9kby5kb25lKTtcclxuICAgIGNvbnN0IEhUTUxTbmlwcGV0ID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZS1kZXNjcmlwdGlvbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGg0IGNsYXNzPVwidG9kby10aXRsZVwiPlxyXG4gICAgICAgICAgICAke3Nhbml0aXplKHRvZG8udGl0bGUpfVxyXG4gICAgICAgICAgICA8L2g0PlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cInRvZG8tZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICR7c2FuaXRpemUodG9kby5kZXNjcmlwdGlvbil9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1idG5zLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9kby1kb25lIGJ0bi1jaXJjbGVcIiB0aXRsZT0ke3RvZG8uZG9uZT8gXCJEb25lXCI6IFwiVG9kb1wifT48c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj4ke3RvZG8uZG9uZT8gXCJjaGVja19jaXJjbGVcIjogXCJyYWRpb19idXR0b25fdW5jaGVja2VkXCJ9PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9kby1kZXRhaWxzIGJ0bi1jaXJjbGVcIiB0aXRsZT1cIk1vcmUgRGV0YWlsc1wiPjxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPnN1bW1hcml6ZTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgICBpdGVtLmlubmVySFRNTCA9IEhUTUxTbmlwcGV0O1xyXG4gICAgcmV0dXJuIGl0ZW07XHJcbn07XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUb2RvTGlzdChhcnJheSwgaW5kZXgsIHRpdGxlKSB7XHJcbiAgICBjb25zdCB0b2RvTGlzdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0cycpO1xyXG4gICAgdG9kb0xpc3RzRGl2LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdG9kb0xpc3RUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBsZXQgdG9kb3NUb0Rpc3BsYXk7XHJcbiAgICBpZiAoaW5kZXggPT09ICdhbGxMaXN0cycpIHtcclxuICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IHByb2plY3RGdW5jdGlvbnMuZ2V0QWxsTGlzdHMoYXJyYXkpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gJ3RvZGF5TGlzdCcpIHtcclxuICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IHByb2plY3RGdW5jdGlvbnMuZ2V0VG9kYXlMaXN0KGFycmF5KTtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT09ICd1cGNvbWluZ0xpc3QnKSB7XHJcbiAgICAgICAgdG9kb3NUb0Rpc3BsYXkgPSBwcm9qZWN0RnVuY3Rpb25zLmdldFVwY29taW5nTGlzdChhcnJheSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoZXlcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvZG9zVG9EaXNwbGF5ID0gWy4uLmFycmF5W2luZGV4XS5saXN0Lm1hcCgodG9kbywgaW5kZXgpID0+IChcclxuICAgICAgICAgICAge3RvZG8sIGluZGV4fVxyXG4gICAgICAgICkpXTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRvZG9zVG9EaXNwbGF5KTtcclxuXHJcbiAgICB0b2Rvc1RvRGlzcGxheS5mb3JFYWNoKCh7dG9kbywgaW5kZXh9KSA9PiB7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlVG9kbyh0b2RvLCBpbmRleCkpO1xyXG4gICAgfSlcclxuICAgIHRvZG9MaXN0c0Rpdi5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbn1cclxuXHJcbi8vIFByb2plY3QgRE9NXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QocHJvamVjdCwgaW5kZXgpIHtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2xpbmstYnRuJywgJ3Byb2plY3QtYnRuJyk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgcHJvamVjdC5uYW1lKTtcclxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBpbmRleCk7XHJcbiAgICBvcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICByZXR1cm4ge2J1dHRvbjogYnV0dG9uLCBvcHRpb246IG9wdGlvbn07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RMaXN0KGFycmF5KSB7XHJcbiAgICBwcm9qZWN0c0Rpdi5pbm5lckhUTUwgPSAnJztcclxuICAgIHRvZG9Qcm9qZWN0LmlubmVySFRNTCA9ICc8b3B0aW9uIHZhbHVlPVwiMFwiIHNlbGVjdGVkPkhvbWU8L29wdGlvbj4nO1xyXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IGNyZWF0ZVByb2plY3QoYXJyYXlbaV0sIGkpO1xyXG4gICAgICAgIHByb2plY3RzRGl2LmFwcGVuZENoaWxkKHByb2plY3RPYmouYnV0dG9uKTtcclxuICAgICAgICB0b2RvUHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0T2JqLm9wdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFRvZG8gRGV0YWlscyBQYWdlXHJcbmZ1bmN0aW9uIGRpc3BsYXlUb2RvRGV0YWlscyh0b2RvKSB7XHJcbiAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xyXG4gICAgdG9kb0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5kZXNjcmlwdGlvbjtcclxuICAgIHRvZG9EdWVkYXRlLnRleHRDb250ZW50ID0gdG9kby5kdWVEYXRlO1xyXG4gICAgdG9kb1ByaW9yaXR5LnRleHRDb250ZW50ID0gdG9kby5wcmlvcml0eTtcclxuICAgIHRvZG9Ob3Rlcy50ZXh0Q29udGVudCA9IHRvZG8ubm90ZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtjcmVhdGVUb2RvLCBjcmVhdGVQcm9qZWN0LCB1cGRhdGVUb2RvTGlzdCwgdXBkYXRlUHJvamVjdExpc3QsIGRpc3BsYXlUb2RvRGV0YWlsc307IiwiaW1wb3J0IGRhdGVGdW5jdGlvbnMgZnJvbSAnLi9kYXRlLmpzJztcclxuXHJcbmZ1bmN0aW9uIGdldEFsbExpc3RzIChwcm9qZWN0cykge1xyXG4gICAgbGV0IGFyciA9IFtdO1xyXG4gICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICBhcnIgPSBbLi4uYXJyLCAuLi5wcm9qZWN0Lmxpc3QubWFwKCh0b2RvLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICB7dG9kbywgaW5kZXh9XHJcbiAgICAgICAgKSldO1xyXG4gICAgfSlcclxuICAgIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvZGF5TGlzdCAocHJvamVjdHMpIHtcclxuICAgIGNvbnN0IGFsbExpc3RzID0gZ2V0QWxsTGlzdHMocHJvamVjdHMpO1xyXG4gICAgY29uc3QgdG9kYXlMaXN0ID0gYWxsTGlzdHMuZmlsdGVyKCh7dG9kbywgaW5kZXh9KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGVGdW5jdGlvbnMuZmlsdGVyVG9kYXkodG9kby5kdWVEYXRlKTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4gdG9kYXlMaXN0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRVcGNvbWluZ0xpc3QgKHByb2plY3RzKSB7XHJcbiAgICBjb25zdCBhbGxMaXN0cyA9IGdldEFsbExpc3RzKHByb2plY3RzKTtcclxuICAgIGNvbnN0IHVwY29taW5nTGlzdCA9IGFsbExpc3RzLmZpbHRlcigoe3RvZG8sIGluZGV4fSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBkYXRlRnVuY3Rpb25zLmZpbHRlclVwY29taW5nKHRvZG8uZHVlRGF0ZSk7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHVwY29taW5nTGlzdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2dldEFsbExpc3RzLCBnZXRUb2RheUxpc3QsIGdldFVwY29taW5nTGlzdH07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdE1ha2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHByaW9yaXR5KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7bmFtZSwgcHJpb3JpdHl9KTtcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIH1cclxufSIsIi8vIHNhbml0aXplciB0byB1c2UgaW5uZXJIVE1MIHdpdGhvdXQgc2VjdXJpdHkgY29uY2VyblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYW5pdGl6ZShpbnB1dCkge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYudGV4dENvbnRlbnQgPSBpbnB1dDtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59IiwiY29uc3QgdGhlbWVTd2l0Y2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPXRoZW1lLXN3aXRjaF0nKTtcclxuY29uc3Qgc2lkZWJhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLWJhci10b2dnbGUnKTtcclxuXHJcbi8vIE1hdGNoIHVzZXIgVGhlbWVcclxuaWYod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2RhcmsnKTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiTGlnaHQgTW9kZVwiKTtcclxufSBlbHNlIHtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnbGlnaHQnKTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkRhcmsgTW9kZVwiKTtcclxufVxyXG5cclxuLy8gVG9nZ2xlIFRoZW1lIG9uIENsaWNrXHJcbnRoZW1lU3dpdGNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsKGUpID0+IHtcclxuICAgIGlmKGUudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2RhcmsnKTtcclxuICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJTd2l0Y2ggdG8gTGlnaHRcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnbGlnaHQnKTtcclxuICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJTd2l0Y2ggdG8gRGFya1wiKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBUb2dnbGUgU2lkZWJhclxyXG5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZS1iYXInKTtcclxuc2lkZWJhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1zaWRlLWJhcicpO1xyXG59KSIsImZ1bmN0aW9uIGNoYW5nZVRpdGxlKHRvZG8sIG5ld1RpdGxlKSB7XHJcbiAgICB0b2RvLnRpdGxlID0gbmV3VGl0bGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZURlc2NyaXB0aW9uKHRvZG8sIG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICB0b2RvLmRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVN0YXRlICh0b2RvKSB7XHJcbiAgICB0b2RvLmRvbmUgPSB0b2RvLmRvbmUgPyBmYWxzZSA6IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5ICh0b2RvLCBuZXdQcmlvcml0eSkge1xyXG4gICAgdG9kby5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VEdWVEYXRlICh0b2RvLCBuZXdEYXRlKSB7XHJcbiAgICB0b2RvLmR1ZURhdGUgPSBuZXdEYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VOb3RlcyAodG9kbywgbmV3Tm90ZXMpIHtcclxuICAgIHRvZG8ubm90ZXMgPSBuZXdOb3RlcztcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlSXRlbSAoYXJyYXksIGluZGV4KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NoYW5nZVRpdGxlLCBjaGFuZ2VEZXNjcmlwdGlvbiwgY2hhbmdlU3RhdGUsIGNoYW5nZVByaW9yaXR5LCBjaGFuZ2VEdWVEYXRlLCBjaGFuZ2VOb3RlcywgZGVsZXRlSXRlbX07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb01ha2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3R9KTtcclxuICAgIH07XHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuc2Nzcyc7XHJcbmltcG9ydCAnbWF0ZXJpYWwtc3ltYm9scy9vdXRsaW5lZC5jc3MnO1xyXG5pbXBvcnQgJy4vbW9kdWxlcy90aGVtZSZzaWRlYmFyJztcclxuaW1wb3J0IFRvZG9NYWtlciBmcm9tICcuL21vZHVsZXMvdG9kby1tYWtlcic7XHJcbmltcG9ydCBQcm9qZWN0TWFrZXIgZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QtbWFrZXInO1xyXG5pbXBvcnQgVG9kb0Z1bmN0aW9ucyBmcm9tICcuL21vZHVsZXMvdG9kby1mdW5jdGlvbnMnO1xyXG5pbXBvcnQgRG9tRnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy9kb20tZnVuY3Rpb25zJztcclxuaW1wb3J0IFByb2plY3RGdW5jdGlvbnMgZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QtZnVuY3Rpb25zJztcclxuXHJcblxyXG4vLyBET00gRWxlbWVudHNcclxuY29uc3QgdG9kb0xpc3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0cycpO1xyXG5jb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1wcm9qZWN0cy1jb250YWluZXInKTtcclxuY29uc3QgdG9kb0RldGFpbHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscy1jYXJkLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzLWNhcmQnKTtcclxuLy8gSW5wdXRzXHJcbmNvbnN0IHRvZG9Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tY29udGFpbmVyJyk7XHJcbmNvbnN0IHRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10b2RvLWZvcm0nKTtcclxuY29uc3QgcHJvamVjdEZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLWNvbnRhaW5lcicpO1xyXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0nKTtcclxuLy8gVG9kbyBJbnB1dHNcclxuY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XHJcbmNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xyXG5jb25zdCB0b2RvRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJyk7XHJcbmNvbnN0IHRvZG9UaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWUnKTtcclxuY29uc3QgdG9kb1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5Jyk7XHJcbmNvbnN0IHRvZG9Ob3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3RlcycpO1xyXG5jb25zdCB0b2RvUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcbi8vIFByb2plY3QgSW5wdXRzXHJcbmNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJyk7XHJcbmNvbnN0IHByb2plY3RQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXByaW9yaXR5Jyk7XHJcblxyXG4vLyBBZGQgQnV0dG9uc1xyXG5jb25zdCBvcGVuVG9kb0Zvcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3Blbi10b2RvLWZvcm0tYnRuJyk7XHJcbmNvbnN0IGFkZFRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRvZG8tYnRuJyk7XHJcbmNvbnN0IG9wZW5Qcm9qZWN0Rm9ybUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1wcm9qZWN0LWZvcm0tYnRuJyk7XHJcbmNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnRuJyk7XHJcblxyXG4vLyBQcm9qZWN0IEJ1dHRvbnNcclxuY29uc3QgaG9tZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIkhvbWVcIl0nKTtcclxuY29uc3QgYWxsTGlzdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJBbGwgTGlzdHNcIl0nKTtcclxuY29uc3QgdG9kYXlMaXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiVG9kYXlcIl0nKTtcclxuY29uc3QgdXBjb21pbmdMaXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiVXBjb21pbmdcIl0nKTtcclxuY29uc3QgbXlQcm9qZWN0c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIk15IFByb2plY3RzXCJdJyk7XHJcblxyXG4vLyBJbml0aWFsaXplIHZhcmlhYmxlc1xyXG5jb25zdCBwcm9qZWN0cyA9IFtcclxuICAgIG5ldyBQcm9qZWN0TWFrZXIoXCJIb21lXCIsIG51bGwpLFxyXG5dO1xyXG5sZXQgY3VycmVudFBhZ2UgPSBudWxsO1xyXG5cclxuXHJcbi8vIEFkZCBUb2RvIEl0ZW1cclxuZnVuY3Rpb24gYWRkVG9kb0l0ZW0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0KSB7XHJcbiAgICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG9NYWtlcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCk7XHJcbiAgICBwcm9qZWN0c1twcm9qZWN0XS5saXN0LnB1c2gobmV3VG9kbyk7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3QsIHByb2plY3RzW3Byb2plY3RdLm5hbWUpO1xyXG4gICAgdG9kb0Zvcm1Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcblxyXG4vLyBDaGFuZ2luZyB0b2RvIGRvbmUgc3RhdHVzXHJcbmZ1bmN0aW9uIHVwZGF0ZURvbmVTdGF0dXMocHJvamVjdEluZGV4LCB0b2RvKSB7XHJcbiAgICBUb2RvRnVuY3Rpb25zLmNoYW5nZVN0YXRlKHByb2plY3RzW3Byb2plY3RJbmRleF0ubGlzdFt0b2RvXSk7XHJcbiAgICB1cGRhdGVQYWdlKHByb2plY3RJbmRleCk7XHJcbiAgICByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxufVxyXG5cclxuXHJcbi8vIFJlbW92ZSBUb2RvIEl0ZW1cclxuZnVuY3Rpb24gcmVtb3ZlVG9kb0l0ZW0gKHByb2plY3RJbmRleCwgaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3QsIGluZGV4KTtcclxuICAgIHVwZGF0ZVBhZ2UocHJvamVjdEluZGV4KTtcclxuICAgIHRvZG9EZXRhaWxzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG59XHJcblxyXG5cclxuLy8gVXBkYXRlIFBhZ2UgYmFzZWQgb24gY3VycmVudFBhZ2VcclxuZnVuY3Rpb24gdXBkYXRlUGFnZShwcm9qZWN0SW5kZXgpIHtcclxuICAgIHN3aXRjaChjdXJyZW50UGFnZSl7XHJcbiAgICAgICAgY2FzZSAnYWxsTGlzdHMnOlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsICdhbGxMaXN0cycsICdBbGwgTGlzdHMnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9kYXlMaXN0JzpcclxuICAgICAgICAgICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCAndG9kYXlMaXN0JywgJ1RvZGF5IExpc3QnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndXBjb21pbmdMaXN0JzpcclxuICAgICAgICAgICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCAndXBjb21pbmdMaXN0JywgJ1VwY29taW5nIExpc3QnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCBwcm9qZWN0SW5kZXgsIHByb2plY3RzW3Byb2plY3RJbmRleF0ubmFtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vLyBBZGQgUHJvamVjdFxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0IChuYW1lLCBwcmlvcml0eSkge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0TWFrZXIobmFtZSwgcHJpb3JpdHkpO1xyXG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVQcm9qZWN0TGlzdChwcm9qZWN0cyk7XHJcbiAgICAvLyByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIGNvbnN0IHByb2plY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtYnRuJyk7XHJcbiAgICBwcm9qZWN0QnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICAgICAgY3VycmVudFBhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIGluZGV4LCBwcm9qZWN0c1tpbmRleF0ubmFtZSk7XHJcbiAgICAgICAgICAgIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgcHJvamVjdEZvcm1Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgcHJvamVjdHNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCBwcm9qZWN0cy5sZW5ndGggLSAxLCBwcm9qZWN0c1twcm9qZWN0cy5sZW5ndGggLTFdLm5hbWUpO1xyXG59XHJcblxyXG5cclxuLy8gUmVtb3ZlIFByb2plY3RcclxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdCAoaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0cywgaW5kZXgpO1xyXG4gICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCAwLCBwcm9qZWN0c1swXS5uYW1lKTtcclxufVxyXG5cclxuXHJcbi8vIFRvZ2dsZSBUb2RvIEZvcm0gT3BlbiBVcFxyXG5vcGVuVG9kb0Zvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICB9KTtcclxufSk7XHJcbnRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG5cclxuLy8gVG9nZ2xlIFByb2plY3QgRm9ybSBPcGVuIFVwXHJcbm9wZW5Qcm9qZWN0Rm9ybUJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBwcm9qZWN0Rm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgcHJvamVjdEZvcm1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3RGb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KVxyXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKX0pO1xyXG5cclxuXHJcbi8vIEFkZC9FZGl0IHRvZG8gaXRlbSBvbiBGb3JtIHN1Ym1pdFxyXG5hZGRUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGR1ZURhdGUgPSB0b2RvRGF0ZS52YWx1ZSArIFwiVFwiICsgdG9kb1RpbWUudmFsdWU7XHJcbiAgICBhZGRUb2RvSXRlbSh0b2RvVGl0bGUudmFsdWUsIHRvZG9EZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZSwgdG9kb1ByaW9yaXR5LnZhbHVlLCB0b2RvTm90ZXMudmFsdWUsIGZhbHNlLCArdG9kb1Byb2plY3QudmFsdWUpO1xyXG59KTtcclxuXHJcblxyXG4vLyBBZGQvRWRpdCBwcm9qZWN0IG9uIEZvcm0gc3VibWl0XHJcbmFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYocHJvamVjdFRpdGxlLnZhbHVlICYmIHByb2plY3RQcmlvcml0eS52YWx1ZSkge1xyXG4gICAgICAgIGFkZFByb2plY3QocHJvamVjdFRpdGxlLnZhbHVlLCBwcm9qZWN0UHJpb3JpdHkudmFsdWUpO1xyXG4gICAgfVxyXG59KVxyXG5cclxuXHJcbi8vIE5hdmlnYXRlIFByb2plY3RzXHJcbmhvbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIDAsIHByb2plY3RzWzBdLm5hbWUpO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICBjdXJyZW50UGFnZSA9IG51bGw7XHJcbn0pO1xyXG5teVByb2plY3RzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgcHJvamVjdHNEaXYuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG59KTtcclxuYWxsTGlzdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIFwiYWxsTGlzdHNcIiwgXCJBbGwgTGlzdHNcIik7XHJcbiAgICBjdXJyZW50UGFnZSA9IFwiYWxsTGlzdHNcIjtcclxuICAgIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG59KVxyXG50b2RheUxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIFwidG9kYXlMaXN0XCIsIFwiVG9kYXkgTGlzdFwiKTtcclxuICAgIGN1cnJlbnRQYWdlID0gXCJ0b2RheUxpc3RcIjtcclxuICAgIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG59KVxyXG51cGNvbWluZ0xpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIFwidXBjb21pbmdMaXN0XCIsIFwiVXBjb21pbmcgTGlzdFwiKTtcclxuICAgIGN1cnJlbnRQYWdlID0gXCJ1cGNvbWluZ0xpc3RcIjtcclxuICAgIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG59KVxyXG5cclxuXHJcbi8vIERldGFpbHMgQ29udGFpbmVyXHJcbmZ1bmN0aW9uIHNob3dUb2RvRGV0YWlscyhwcm9qZWN0SW5kZXgsIGluZGV4KSB7XHJcbiAgICBjb25zdCB0b2RvID0gcHJvamVjdHNbcHJvamVjdEluZGV4XS5saXN0W2luZGV4XTtcclxuICAgIERvbUZ1bmN0aW9ucy5kaXNwbGF5VG9kb0RldGFpbHModG9kbyk7XHJcbiAgICBjb25zdCB0b2RvRWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWVkaXQtYnRuJyk7XHJcbiAgICBjb25zdCB0b2RvRGVsZXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tZGVsLWJ0bicpO1xyXG4gICAgdG9kb0RlbGV0ZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHJlbW92ZVRvZG9JdGVtKHRvZG8ucHJvamVjdCwgaW5kZXgpO1xyXG4gICAgfTtcclxuICAgIHRvZG9FZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHNob3dFZGl0Rm9ybShwcm9qZWN0SW5kZXgsIGluZGV4KTtcclxuICAgIH0pXHJcbiAgICB0b2RvRGV0YWlsc0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB0b2RvRGV0YWlsc0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0b2RvRGV0YWlsc0Rpdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICB9KTtcclxufTtcclxudG9kb0RldGFpbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge2Uuc3RvcFByb3BhZ2F0aW9uKCl9KTtcclxuXHJcblxyXG4vLyBFZGl0IFRvZG8gRm9ybVxyXG5mdW5jdGlvbiBzaG93RWRpdEZvcm0ocHJvamVjdEluZGV4LCBpbmRleCkge1xyXG5cclxufVxyXG5cclxuXHJcbi8vIFJlZnJlc2ggRXZlbnQgTGlzdGVuZXJzXHJcbmZ1bmN0aW9uIHJlZnJlc2hFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHRvZG9Eb25lQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWRvbmUnKTtcclxuICAgIGNvbnN0IHRvZG9EZXRhaWxzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWRldGFpbHMnKTtcclxuXHJcbiAgICB0b2RvRG9uZUJ0bnMuZm9yRWFjaChkb25lQnRuID0+IHtcclxuICAgICAgICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICsgZG9uZUJ0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9ICsgZG9uZUJ0bi5wYXJlbnROb2RlLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKTtcclxuICAgICAgICAgICAgdXBkYXRlRG9uZVN0YXR1cyhwcm9qZWN0SW5kZXgsIGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdG9kb0RldGFpbHNCdG5zLmZvckVhY2goZGV0YWlsc0J0biA9PiB7XHJcbiAgICAgICAgZGV0YWlsc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSArIGRldGFpbHNCdG4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSArIGRldGFpbHNCdG4ucGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgICAgIHNob3dUb2RvRGV0YWlscyhwcm9qZWN0SW5kZXgsIGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuLy8gVEVTVElOR1xyXG5cclxuYWRkUHJvamVjdChcIk15IFByb2plY3QgMVwiLCAxKTtcclxuYWRkUHJvamVjdChcIk15IFByb2plY3QgMlwiLCAyKTtcclxuXHJcbmFkZFRvZG9JdGVtKFwiQ29kZVwiLCBcIjxpbWcgc3JjPScnPlwiLCBcIjIwMjQtMDMtMDdcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMCk7XHJcbmFkZFRvZG9JdGVtKFwiRWF0XCIsIFwiY29kaW5nIGlzIGJlYXV0aWZ1bFwiLCBcIjIwMjQtMDMtMDhcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMCk7XHJcbmFkZFRvZG9JdGVtKFwiU2xlZXBcIiwgXCJjb2RpbmcgaXMgYmVhdXRpZnVsXCIsIFwiMjAyNC0wMy0wNVwiLCAxLCBcImJsYWggYmxhaCBibGFoXCIsIGZhbHNlLCAxKTtcclxuYWRkVG9kb0l0ZW0oXCJSZXBlYXRcIiwgXCJjb2RpbmcgaXMgYmVhdXRpZnVsXCIsIFwiMjAyNC0wMy0wNlwiLCAxLCBcImJsYWggYmxhaCBibGFoXCIsIGZhbHNlLCAyKTtcclxuXHJcbi8vIFN0YXJ0IGF0IEhvbWUgUGFnZSBcclxuRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCAwLCBwcm9qZWN0c1swXS5uYW1lKTtcclxucmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9