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
    let formattedDate = date.split('T')[0];
    const today = getFormattedDate(new Date());
    return formattedDate === today;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({filterToday});

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({getAllLists, getTodayList});

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
    new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"]("Home", null),
];
let currentPage = null;

// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new _modules_todo_maker__WEBPACK_IMPORTED_MODULE_3__["default"](title, description, dueDate, priority, notes, done, project);
    // const index = projects[project].list.length;
    projects[project].list.push(newTodo);
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, project, projects[project].name);
    todoFormContainer.classList.remove('show');
    refreshEventListeners();
}

// Changing todo item
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

function updatePage(projectIndex) {
    switch(currentPage){
        case 'allLists':
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 'allLists', 'All Lists');
            break;
        case 'todayList':
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 'todayList', 'Today List');
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

// Details Container
function showTodoDetails(projectIndex, index) {
    const todo = projects[projectIndex].list[index];
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].displayTodoDetails(todo);
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
_modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0, projects[0].name);
refreshEventListeners();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bGlzdC8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1zeW1ib2xzL291dGxpbmVkLmNzcz82MGY0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3R5bGUvc3R5bGUuc2Nzcz80NTZkIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9kYXRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20tZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC1tYWtlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvc2FuaXRpemVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90aGVtZSZzaWRlYmFyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby1tYWtlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XHJcbmNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiZGF0ZVwiXScpO1xyXG5jb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRpbWVcIl0nKTtcclxuXHJcbmNvbnN0IGRhdGVBcnJheSA9IFtdO1xyXG5cclxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IGRhdGUudmFsdWUgKyBcIlRcIiArIHRpbWUudmFsdWU7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRlU3RyaW5nKTtcclxuICAgIGNvbnN0IGRhdGVUaW1lID0gY3JlYXRlRGF0ZShkYXRlU3RyaW5nKTtcclxuICAgIGRhdGVBcnJheS5wdXNoKGRhdGVUaW1lKTtcclxufSlcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURhdGUgKGRhdGVTdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc29ydERhdGUoYXJyYXkpIHtcclxuICAgIHJldHVybiBhcnJheS5zb3J0KChhLGIpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEpO1xyXG4gICAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYik7XHJcbiAgICAgICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgdGVzdEFycmF5ID0gW1xyXG4gICAgXCJNYXIgMTIgMjAxMiAxMDowMDowMCBBTVwiLFxyXG4gICAgXCJNYXIgOCAyMDEyIDA4OjAwOjAwIEFNXCJcclxuXVxyXG5cclxuY29uc29sZS5sb2codGVzdEFycmF5KTtcclxuY29uc29sZS5sb2coc29ydERhdGUodGVzdEFycmF5KSk7XHJcblxyXG5jb25zdCBkYXRlMSA9IG5ldyBEYXRlKCcyMDI0LTAzLTExJyk7XHJcbmNvbnN0IGRhdGUyID0gbmV3IERhdGUoJzIwMjQtMDQtMDZUMjA6MjQ6MzInKTtcclxuY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG5jb25zb2xlLmxvZyhkYXRlMS5nZXRUaW1lKCkgPCB0b2RheS5nZXRUaW1lKCkpOyAvLyBEYXRlZCBkdWVkXHJcbmNvbnNvbGUubG9nKFtkYXRlMS5nZXRGdWxsWWVhcigpLCBwYWQyZGlnaXRzKGRhdGUxLmdldE1vbnRoKCkrMSksIHBhZDJkaWdpdHMoZGF0ZTEuZ2V0RGF0ZSgpKV0uam9pbignLScpKTtcclxuXHJcbmNvbnNvbGUubG9nKGRhdGUxLmdldERhdGUoKSA9PT0gdG9kYXkuZ2V0RGF0ZSgpKTsgLy8gZGF5XHJcbmNvbnNvbGUubG9nKGRhdGUyLmdldERhdGUoKSA9PT0gdG9kYXkuZ2V0RGF0ZSgpKTtcclxuXHJcbmNvbnNvbGUubG9nKGRhdGUxLmdldERhdGUoKSk7XHJcblxyXG4vLyBQYWQgMHMgb24gZGF5ICYgbW9udGhcclxuZnVuY3Rpb24gcGFkMmRpZ2l0cyhudW0pIHtcclxuICAgIHJldHVybiBTdHJpbmcobnVtKS5wYWRTdGFydCgyLCAnMCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGb3JtYXR0ZWREYXRlIChkYXRlKSB7XHJcbiAgICByZXR1cm4gW2RhdGUuZ2V0RnVsbFllYXIoKSwgcGFkMmRpZ2l0cyh0b2RheS5nZXRNb250aCgpICsgMSksIHBhZDJkaWdpdHModG9kYXkuZ2V0RGF0ZSgpKV0uam9pbignLScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJUb2RheShkYXRlKSB7XHJcbiAgICBsZXQgZm9ybWF0dGVkRGF0ZSA9IGRhdGUuc3BsaXQoJ1QnKVswXTtcclxuICAgIGNvbnN0IHRvZGF5ID0gZ2V0Rm9ybWF0dGVkRGF0ZShuZXcgRGF0ZSgpKTtcclxuICAgIHJldHVybiBmb3JtYXR0ZWREYXRlID09PSB0b2RheTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2ZpbHRlclRvZGF5fTsiLCJpbXBvcnQgc2FuaXRpemUgZnJvbSAnLi9zYW5pdGl6ZXIuanMnO1xyXG5pbXBvcnQgcHJvamVjdEZ1bmN0aW9ucyBmcm9tICcuL3Byb2plY3QtZnVuY3Rpb25zLmpzJztcclxuXHJcbmNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15LXByb2plY3RzLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcbmNvbnN0IHRvZG9MaXN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0LXRpdGxlJyk7XHJcblxyXG5jb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tdGl0bGUnKTtcclxuY29uc3QgdG9kb0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLWRlc2NyaXB0aW9uJyk7XHJcbmNvbnN0IHRvZG9EdWVkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLWR1ZWRhdGUgc3BhbicpO1xyXG5jb25zdCB0b2RvUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tcHJpb3JpdHkgc3BhbicpO1xyXG5jb25zdCB0b2RvTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0LXRvZG8tbm90ZXMnKTtcclxuXHJcbi8vIFRvZG8gRE9NXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvZG8gKHRvZG8sIGluZGV4KSB7XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY2FyZC1jb250YWluZXInKTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpO1xyXG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcsIHRvZG8ucHJvamVjdCk7XHJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1kb25lJywgdG9kby5kb25lKTtcclxuICAgIGNvbnN0IEhUTUxTbmlwcGV0ID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZS1kZXNjcmlwdGlvbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGg0IGNsYXNzPVwidG9kby10aXRsZVwiPlxyXG4gICAgICAgICAgICAke3Nhbml0aXplKHRvZG8udGl0bGUpfVxyXG4gICAgICAgICAgICA8L2g0PlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cInRvZG8tZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICR7c2FuaXRpemUodG9kby5kZXNjcmlwdGlvbil9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1idG5zLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9kby1kb25lIGJ0bi1jaXJjbGVcIiB0aXRsZT0ke3RvZG8uZG9uZT8gXCJEb25lXCI6IFwiVG9kb1wifT48c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj4ke3RvZG8uZG9uZT8gXCJjaGVja19jaXJjbGVcIjogXCJyYWRpb19idXR0b25fdW5jaGVja2VkXCJ9PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9kby1kZXRhaWxzIGJ0bi1jaXJjbGVcIiB0aXRsZT1cIk1vcmUgRGV0YWlsc1wiPjxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPnN1bW1hcml6ZTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgICBpdGVtLmlubmVySFRNTCA9IEhUTUxTbmlwcGV0O1xyXG4gICAgcmV0dXJuIGl0ZW07XHJcbn07XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUb2RvTGlzdChhcnJheSwgaW5kZXgsIHRpdGxlKSB7XHJcbiAgICBjb25zdCB0b2RvTGlzdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0cycpO1xyXG4gICAgdG9kb0xpc3RzRGl2LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdG9kb0xpc3RUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBsZXQgdG9kb3NUb0Rpc3BsYXk7XHJcbiAgICBpZiAoaW5kZXggPT09ICdhbGxMaXN0cycpIHtcclxuICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IHByb2plY3RGdW5jdGlvbnMuZ2V0QWxsTGlzdHMoYXJyYXkpO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gJ3RvZGF5TGlzdCcpIHtcclxuICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IHByb2plY3RGdW5jdGlvbnMuZ2V0VG9kYXlMaXN0KGFycmF5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9kb3NUb0Rpc3BsYXkgPSBbLi4uYXJyYXlbaW5kZXhdLmxpc3QubWFwKCh0b2RvLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICB7dG9kbywgaW5kZXh9XHJcbiAgICAgICAgKSldO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codG9kb3NUb0Rpc3BsYXkpO1xyXG5cclxuICAgIHRvZG9zVG9EaXNwbGF5LmZvckVhY2goKHt0b2RvLCBpbmRleH0pID0+IHtcclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjcmVhdGVUb2RvKHRvZG8sIGluZGV4KSk7XHJcbiAgICB9KVxyXG4gICAgdG9kb0xpc3RzRGl2LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxufVxyXG5cclxuLy8gUHJvamVjdCBET01cclxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChwcm9qZWN0LCBpbmRleCkge1xyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnbGluay1idG4nLCAncHJvamVjdC1idG4nKTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpO1xyXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBwcm9qZWN0Lm5hbWUpO1xyXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGluZGV4KTtcclxuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgIHJldHVybiB7YnV0dG9uOiBidXR0b24sIG9wdGlvbjogb3B0aW9ufTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoYXJyYXkpIHtcclxuICAgIHByb2plY3RzRGl2LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdG9kb1Byb2plY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCIwXCIgc2VsZWN0ZWQ+SG9tZTwvb3B0aW9uPic7XHJcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY3JlYXRlUHJvamVjdChhcnJheVtpXSwgaSk7XHJcbiAgICAgICAgcHJvamVjdHNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdE9iai5idXR0b24pO1xyXG4gICAgICAgIHRvZG9Qcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RPYmoub3B0aW9uKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gVG9kbyBEZXRhaWxzIFBhZ2VcclxuZnVuY3Rpb24gZGlzcGxheVRvZG9EZXRhaWxzKHRvZG8pIHtcclxuICAgIHRvZG9UaXRsZS50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XHJcbiAgICB0b2RvRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0b2RvLmRlc2NyaXB0aW9uO1xyXG4gICAgdG9kb0R1ZWRhdGUudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGU7XHJcbiAgICB0b2RvUHJpb3JpdHkudGV4dENvbnRlbnQgPSB0b2RvLnByaW9yaXR5O1xyXG4gICAgdG9kb05vdGVzLnRleHRDb250ZW50ID0gdG9kby5ub3RlcztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NyZWF0ZVRvZG8sIGNyZWF0ZVByb2plY3QsIHVwZGF0ZVRvZG9MaXN0LCB1cGRhdGVQcm9qZWN0TGlzdCwgZGlzcGxheVRvZG9EZXRhaWxzfTsiLCJpbXBvcnQgZGF0ZUZ1bmN0aW9ucyBmcm9tICcuL2RhdGUuanMnO1xyXG5cclxuZnVuY3Rpb24gZ2V0QWxsTGlzdHMgKHByb2plY3RzKSB7XHJcbiAgICBsZXQgYXJyID0gW107XHJcbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgIGFyciA9IFsuLi5hcnIsIC4uLnByb2plY3QubGlzdC5tYXAoKHRvZG8sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgIHt0b2RvLCBpbmRleH1cclxuICAgICAgICApKV07XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGFycjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9kYXlMaXN0IChwcm9qZWN0cykge1xyXG4gICAgY29uc3QgYWxsTGlzdHMgPSBnZXRBbGxMaXN0cyhwcm9qZWN0cyk7XHJcbiAgICBjb25zdCB0b2RheUxpc3QgPSBhbGxMaXN0cy5maWx0ZXIoKHt0b2RvLCBpbmRleH0pID0+IHtcclxuICAgICAgICByZXR1cm4gZGF0ZUZ1bmN0aW9ucy5maWx0ZXJUb2RheSh0b2RvLmR1ZURhdGUpO1xyXG4gICAgfSlcclxuICAgIHJldHVybiB0b2RheUxpc3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtnZXRBbGxMaXN0cywgZ2V0VG9kYXlMaXN0fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0TWFrZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgcHJpb3JpdHkpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtuYW1lLCBwcmlvcml0eX0pO1xyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xyXG4gICAgfVxyXG59IiwiLy8gc2FuaXRpemVyIHRvIHVzZSBpbm5lckhUTUwgd2l0aG91dCBzZWN1cml0eSBjb25jZXJuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhbml0aXplKGlucHV0KSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi50ZXh0Q29udGVudCA9IGlucHV0O1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn0iLCJjb25zdCB0aGVtZVN3aXRjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9dGhlbWUtc3dpdGNoXScpO1xyXG5jb25zdCBzaWRlYmFyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGUtYmFyLXRvZ2dsZScpO1xyXG5cclxuLy8gTWF0Y2ggdXNlciBUaGVtZVxyXG5pZih3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMpIHtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnZGFyaycpO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b24uY2hlY2tlZCA9IHRydWU7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJMaWdodCBNb2RlXCIpO1xyXG59IGVsc2Uge1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdsaWdodCcpO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b24uY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiRGFyayBNb2RlXCIpO1xyXG59XHJcblxyXG4vLyBUb2dnbGUgVGhlbWUgb24gQ2xpY2tcclxudGhlbWVTd2l0Y2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywoZSkgPT4ge1xyXG4gICAgaWYoZS50YXJnZXQuY2hlY2tlZCkge1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnZGFyaycpO1xyXG4gICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIlN3aXRjaCB0byBMaWdodFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdsaWdodCcpO1xyXG4gICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIlN3aXRjaCB0byBEYXJrXCIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIFRvZ2dsZSBTaWRlYmFyXHJcbmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnc2hvdy1zaWRlLWJhcicpO1xyXG5zaWRlYmFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LXNpZGUtYmFyJyk7XHJcbn0pIiwiZnVuY3Rpb24gY2hhbmdlVGl0bGUodG9kbywgbmV3VGl0bGUpIHtcclxuICAgIHRvZG8udGl0bGUgPSBuZXdUaXRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlRGVzY3JpcHRpb24odG9kbywgbmV3RGVzY3JpcHRpb24pIHtcclxuICAgIHRvZG8uZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlU3RhdGUgKHRvZG8pIHtcclxuICAgIHRvZG8uZG9uZSA9IHRvZG8uZG9uZSA/IGZhbHNlIDogdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHkgKHRvZG8sIG5ld1ByaW9yaXR5KSB7XHJcbiAgICB0b2RvLnByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUR1ZURhdGUgKHRvZG8sIG5ld0RhdGUpIHtcclxuICAgIHRvZG8uZHVlRGF0ZSA9IG5ld0RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZU5vdGVzICh0b2RvLCBuZXdOb3Rlcykge1xyXG4gICAgdG9kby5ub3RlcyA9IG5ld05vdGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVJdGVtIChhcnJheSwgaW5kZXgpIHtcclxuICAgIHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Y2hhbmdlVGl0bGUsIGNoYW5nZURlc2NyaXB0aW9uLCBjaGFuZ2VTdGF0ZSwgY2hhbmdlUHJpb3JpdHksIGNoYW5nZUR1ZURhdGUsIGNoYW5nZU5vdGVzLCBkZWxldGVJdGVtfTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvTWFrZXIge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3QpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdH0pO1xyXG4gICAgfTtcclxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlL3N0eWxlLnNjc3MnO1xyXG5pbXBvcnQgJ21hdGVyaWFsLXN5bWJvbHMvb3V0bGluZWQuY3NzJztcclxuaW1wb3J0ICcuL21vZHVsZXMvdGhlbWUmc2lkZWJhcic7XHJcbmltcG9ydCBUb2RvTWFrZXIgZnJvbSAnLi9tb2R1bGVzL3RvZG8tbWFrZXInO1xyXG5pbXBvcnQgUHJvamVjdE1ha2VyIGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LW1ha2VyJztcclxuaW1wb3J0IFRvZG9GdW5jdGlvbnMgZnJvbSAnLi9tb2R1bGVzL3RvZG8tZnVuY3Rpb25zJztcclxuaW1wb3J0IERvbUZ1bmN0aW9ucyBmcm9tICcuL21vZHVsZXMvZG9tLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCB0b2RvRnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy90b2RvLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBwcm9qZWN0RnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LWZ1bmN0aW9ucyc7XHJcblxyXG4vLyBET00gRWxlbWVudHNcclxuY29uc3QgdG9kb0xpc3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0cycpO1xyXG5jb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1wcm9qZWN0cy1jb250YWluZXInKTtcclxuY29uc3QgdG9kb0RldGFpbHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscy1jYXJkLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzLWNhcmQnKTtcclxuLy8gSW5wdXRzXHJcbmNvbnN0IHRvZG9Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tY29udGFpbmVyJyk7XHJcbmNvbnN0IHRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10b2RvLWZvcm0nKTtcclxuY29uc3QgcHJvamVjdEZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtLWNvbnRhaW5lcicpO1xyXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0nKTtcclxuLy8gVG9kbyBJbnB1dHNcclxuY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XHJcbmNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xyXG5jb25zdCB0b2RvRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJyk7XHJcbmNvbnN0IHRvZG9UaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWUnKTtcclxuY29uc3QgdG9kb1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5Jyk7XHJcbmNvbnN0IHRvZG9Ob3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3RlcycpO1xyXG5jb25zdCB0b2RvUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcbi8vIFByb2plY3QgSW5wdXRzXHJcbmNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJyk7XHJcbmNvbnN0IHByb2plY3RQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXByaW9yaXR5Jyk7XHJcblxyXG4vLyBBZGQgQnV0dG9uc1xyXG5jb25zdCBvcGVuVG9kb0Zvcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3Blbi10b2RvLWZvcm0tYnRuJyk7XHJcbmNvbnN0IGFkZFRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRvZG8tYnRuJyk7XHJcbmNvbnN0IG9wZW5Qcm9qZWN0Rm9ybUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1wcm9qZWN0LWZvcm0tYnRuJyk7XHJcbmNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnRuJyk7XHJcblxyXG4vLyBQcm9qZWN0IEJ1dHRvbnNcclxuY29uc3QgaG9tZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIkhvbWVcIl0nKTtcclxuY29uc3QgYWxsTGlzdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJBbGwgTGlzdHNcIl0nKTtcclxuY29uc3QgdG9kYXlMaXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiVG9kYXlcIl0nKTtcclxuY29uc3QgbXlQcm9qZWN0c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0aXRsZT1cIk15IFByb2plY3RzXCJdJyk7XHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IFtcclxuICAgIG5ldyBQcm9qZWN0TWFrZXIoXCJIb21lXCIsIG51bGwpLFxyXG5dO1xyXG5sZXQgY3VycmVudFBhZ2UgPSBudWxsO1xyXG5cclxuLy8gQWRkIFRvZG8gSXRlbVxyXG5mdW5jdGlvbiBhZGRUb2RvSXRlbSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3QpIHtcclxuICAgIGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9kb01ha2VyKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0KTtcclxuICAgIC8vIGNvbnN0IGluZGV4ID0gcHJvamVjdHNbcHJvamVjdF0ubGlzdC5sZW5ndGg7XHJcbiAgICBwcm9qZWN0c1twcm9qZWN0XS5saXN0LnB1c2gobmV3VG9kbyk7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3QsIHByb2plY3RzW3Byb2plY3RdLm5hbWUpO1xyXG4gICAgdG9kb0Zvcm1Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbi8vIENoYW5naW5nIHRvZG8gaXRlbVxyXG5mdW5jdGlvbiB1cGRhdGVEb25lU3RhdHVzKHByb2plY3RJbmRleCwgdG9kbykge1xyXG4gICAgVG9kb0Z1bmN0aW9ucy5jaGFuZ2VTdGF0ZShwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbdG9kb10pO1xyXG4gICAgdXBkYXRlUGFnZShwcm9qZWN0SW5kZXgpO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbi8vIFJlbW92ZSBUb2RvIEl0ZW1cclxuZnVuY3Rpb24gcmVtb3ZlVG9kb0l0ZW0gKHByb2plY3RJbmRleCwgaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3QsIGluZGV4KTtcclxuICAgIHVwZGF0ZVBhZ2UocHJvamVjdEluZGV4KTtcclxuICAgIHRvZG9EZXRhaWxzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQYWdlKHByb2plY3RJbmRleCkge1xyXG4gICAgc3dpdGNoKGN1cnJlbnRQYWdlKXtcclxuICAgICAgICBjYXNlICdhbGxMaXN0cyc6XHJcbiAgICAgICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgJ2FsbExpc3RzJywgJ0FsbCBMaXN0cycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b2RheUxpc3QnOlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsICd0b2RheUxpc3QnLCAnVG9kYXkgTGlzdCcpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3RJbmRleCwgcHJvamVjdHNbcHJvamVjdEluZGV4XS5uYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQWRkIFByb2plY3RcclxuZnVuY3Rpb24gYWRkUHJvamVjdCAobmFtZSwgcHJpb3JpdHkpIHtcclxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdE1ha2VyKG5hbWUsIHByaW9yaXR5KTtcclxuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlUHJvamVjdExpc3QocHJvamVjdHMpO1xyXG4gICAgLy8gcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICBjb25zdCBwcm9qZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0LWJ0bicpO1xyXG4gICAgcHJvamVjdEJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBidG4uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlID0gbnVsbDtcclxuICAgICAgICAgICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCBpbmRleCwgcHJvamVjdHNbaW5kZXhdLm5hbWUpO1xyXG4gICAgICAgICAgICByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuICAgIHByb2plY3RGb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIHByb2plY3RzRGl2LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgcHJvamVjdHMubGVuZ3RoIC0gMSwgcHJvamVjdHNbcHJvamVjdHMubGVuZ3RoIC0xXS5uYW1lKTtcclxufVxyXG5cclxuLy8gUmVtb3ZlIFByb2plY3RcclxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdCAoaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0cywgaW5kZXgpO1xyXG4gICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCAwLCBwcm9qZWN0c1swXS5uYW1lKTtcclxufVxyXG5cclxuLy8gRXZlbnQgTGlzdGVuZXJzIFRvZG8gRm9ybSBPcGVuIFVwXHJcbm9wZW5Ub2RvRm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIHRvZG9Gb3JtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG59KTtcclxudG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge2Uuc3RvcFByb3BhZ2F0aW9uKCl9KTtcclxuXHJcbi8vIEV2ZW50IExpc3RlbmVyIFByb2plY3QgRm9ybSBPcGVuIFVwXHJcbm9wZW5Qcm9qZWN0Rm9ybUJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBwcm9qZWN0Rm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgcHJvamVjdEZvcm1Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3RGb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KVxyXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKX0pO1xyXG5cclxuLy8gQWRkIHRvZG8gaXRlbSBvbiBGb3JtIHN1Ym1pdFxyXG5hZGRUb2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGR1ZURhdGUgPSB0b2RvRGF0ZS52YWx1ZSArIFwiVFwiICsgdG9kb1RpbWUudmFsdWU7XHJcbiAgICBhZGRUb2RvSXRlbSh0b2RvVGl0bGUudmFsdWUsIHRvZG9EZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZSwgdG9kb1ByaW9yaXR5LnZhbHVlLCB0b2RvTm90ZXMudmFsdWUsIGZhbHNlLCArdG9kb1Byb2plY3QudmFsdWUpO1xyXG59KTtcclxuXHJcbi8vIEFkZCBwcm9qZWN0IG9uIEZvcm0gc3VibWl0XHJcbmFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYocHJvamVjdFRpdGxlLnZhbHVlICYmIHByb2plY3RQcmlvcml0eS52YWx1ZSkge1xyXG4gICAgICAgIGFkZFByb2plY3QocHJvamVjdFRpdGxlLnZhbHVlLCBwcm9qZWN0UHJpb3JpdHkudmFsdWUpO1xyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gTmF2aWdhdGUgUHJvamVjdHNcclxuaG9tZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgMCwgcHJvamVjdHNbMF0ubmFtZSk7XHJcbiAgICByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIGN1cnJlbnRQYWdlID0gbnVsbDtcclxufSk7XHJcbm15UHJvamVjdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBwcm9qZWN0c0Rpdi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XHJcbn0pO1xyXG5hbGxMaXN0c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgXCJhbGxMaXN0c1wiLCBcIkFsbCBMaXN0c1wiKTtcclxuICAgIGN1cnJlbnRQYWdlID0gXCJhbGxMaXN0c1wiO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn0pXHJcbnRvZGF5TGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgXCJ0b2RheUxpc3RcIiwgXCJUb2RheSBMaXN0XCIpO1xyXG4gICAgY3VycmVudFBhZ2UgPSBcInRvZGF5TGlzdFwiO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn0pXHJcblxyXG4vLyBEZXRhaWxzIENvbnRhaW5lclxyXG5mdW5jdGlvbiBzaG93VG9kb0RldGFpbHMocHJvamVjdEluZGV4LCBpbmRleCkge1xyXG4gICAgY29uc3QgdG9kbyA9IHByb2plY3RzW3Byb2plY3RJbmRleF0ubGlzdFtpbmRleF07XHJcbiAgICBEb21GdW5jdGlvbnMuZGlzcGxheVRvZG9EZXRhaWxzKHRvZG8pO1xyXG4gICAgY29uc3QgdG9kb0VkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1lZGl0LWJ0bicpO1xyXG4gICAgY29uc3QgdG9kb0RlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWRlbC1idG4nKTtcclxuICAgIHRvZG9EZWxldGVCdG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZW1vdmVUb2RvSXRlbSh0b2RvLnByb2plY3QsIGluZGV4KTtcclxuICAgIH07XHJcblxyXG4gICAgdG9kb0RldGFpbHNEaXYuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgdG9kb0RldGFpbHNEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdG9kb0RldGFpbHNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgfSk7XHJcbn07XHJcbnRvZG9EZXRhaWxzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG4vLyBSZWZyZXNoIEV2ZW50IExpc3RlbmVyc1xyXG5mdW5jdGlvbiByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCB0b2RvRG9uZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1kb25lJyk7XHJcbiAgICBjb25zdCB0b2RvRGV0YWlsc0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1kZXRhaWxzJyk7XHJcblxyXG4gICAgdG9kb0RvbmVCdG5zLmZvckVhY2goZG9uZUJ0biA9PiB7XHJcbiAgICAgICAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSArIGRvbmVCdG4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSArIGRvbmVCdG4ucGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0Jyk7XHJcbiAgICAgICAgICAgIHVwZGF0ZURvbmVTdGF0dXMocHJvamVjdEluZGV4LCBpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRvZG9EZXRhaWxzQnRucy5mb3JFYWNoKGRldGFpbHNCdG4gPT4ge1xyXG4gICAgICAgIGRldGFpbHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKyBkZXRhaWxzQnRuLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gKyBkZXRhaWxzQnRuLnBhcmVudE5vZGUucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcpO1xyXG4gICAgICAgICAgICBzaG93VG9kb0RldGFpbHMocHJvamVjdEluZGV4LCBpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8vIFRFU1RJTkdcclxuXHJcbmFkZFByb2plY3QoXCJNeSBQcm9qZWN0IDFcIiwgMSk7XHJcbmFkZFByb2plY3QoXCJNeSBQcm9qZWN0IDJcIiwgMik7XHJcblxyXG5hZGRUb2RvSXRlbShcIkNvZGVcIiwgXCI8aW1nIHNyYz0nJz5cIiwgXCIyMDI0LTAzLTAzXCIsIDEsIFwiYmxhaCBibGFoIGJsYWhcIiwgZmFsc2UsIDApO1xyXG5hZGRUb2RvSXRlbShcIkVhdFwiLCBcImNvZGluZyBpcyBiZWF1dGlmdWxcIiwgXCIyMDI0LTAzLTA0XCIsIDEsIFwiYmxhaCBibGFoIGJsYWhcIiwgZmFsc2UsIDApO1xyXG5hZGRUb2RvSXRlbShcIlNsZWVwXCIsIFwiY29kaW5nIGlzIGJlYXV0aWZ1bFwiLCBcIjIwMjQtMDMtMDVcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMSk7XHJcbmFkZFRvZG9JdGVtKFwiUmVwZWF0XCIsIFwiY29kaW5nIGlzIGJlYXV0aWZ1bFwiLCBcIjIwMjQtMDMtMDZcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMik7XHJcblxyXG4vLyBTdGFydCBhdCBIb21lIFBhZ2UgXHJcbkRvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgMCwgcHJvamVjdHNbMF0ubmFtZSk7XHJcbnJlZnJlc2hFdmVudExpc3RlbmVycygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==