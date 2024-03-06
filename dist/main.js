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
    let todosToDisplay = [];
    if(index === "allLists") {
        array.forEach(project => {
            const todosWithIndices = project.list.map((todo, index) => (
                {todo, index}
            ));
            todosToDisplay = [...todosToDisplay, ...todosWithIndices];
        })
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
function getAllLists (projects) {
    const allLists = projects.reduce((acc, curr) => {
        return [...acc, ...curr.list]
    }, [])
    return allLists;
}

function getTodayLists (projects) {
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({getAllLists});

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
const myProjectsBtn = document.querySelector('button[title="My Projects"]');

const projects = [
    new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"]("Home", null),
];
let currentPage;

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
    if(currentPage === "allLists") {
        _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 'allLists', 'All Lists');
    } else {
        _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, projectIndex, projects[projectIndex].name);
    }
    refreshEventListeners();
}

// Remove Todo Item
function removeTodoItem (projectIndex, index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects[projectIndex].list, index);
    if(currentPage === "allLists") {
        _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 'allLists', 'All Lists');
    } else {
        _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, projectIndex, projects[projectIndex].name);
    }
    todoDetailsDiv.classList.remove('show');
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
    console.log(todoDate.value);
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

addTodoItem("Code", "<img src=''>", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Eat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Sleep", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 1);
addTodoItem("Repeat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 2);

// Start at Home Page 
currentPage = null;
_modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0, projects[0].name);
refreshEventListeners();

console.log(_modules_project_functions__WEBPACK_IMPORTED_MODULE_7__["default"].getAllLists(projects));
const date = new Date('2024-03-11T12:00');
const date2 = new Date('2024-03-06T20:24:32');
const today = new Date();
console.log(date.getTime() < today.getTime()); // Dated dued
console.log([date.getFullYear(), pad2digits(date.getMonth()+1), pad2digits(date.getDate())].join('-'));

console.log(date.getDate() === today.getDate());
console.log(date2.getDate() === today.getDate());

// Pad 0s on day & month
function pad2digits(num) {
    return String(num).padStart(2, '0');
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSSw4REFBWTtBQUNoQjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw4REFBWTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsb0JBQW9CO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZLGtFQUFnQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLXN5bWJvbHMvb3V0bGluZWQuY3NzPzYwZjQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHlsZS9zdHlsZS5zY3NzPzQ1NmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QtZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0LW1ha2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9zYW5pdGl6ZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RoZW1lJnNpZGViYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8tZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLW1ha2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHNhbml0aXplIGZyb20gJy4vc2FuaXRpemVyLmpzJztcclxuaW1wb3J0IHByb2plY3RGdW5jdGlvbnMgZnJvbSAnLi9wcm9qZWN0LWZ1bmN0aW9ucy5qcyc7XHJcblxyXG5jb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1wcm9qZWN0cy1jb250YWluZXInKTtcclxuY29uc3QgdG9kb1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xyXG5jb25zdCB0b2RvTGlzdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC10aXRsZScpO1xyXG5cclxuY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLXRpdGxlJyk7XHJcbmNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXQtdG9kby1kZXNjcmlwdGlvbicpO1xyXG5jb25zdCB0b2RvRHVlZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXQtdG9kby1kdWVkYXRlIHNwYW4nKTtcclxuY29uc3QgdG9kb1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLXByaW9yaXR5IHNwYW4nKTtcclxuY29uc3QgdG9kb05vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldC10b2RvLW5vdGVzJyk7XHJcblxyXG4vLyBUb2RvIERPTVxyXG5mdW5jdGlvbiBjcmVhdGVUb2RvICh0b2RvLCBpbmRleCkge1xyXG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvLWNhcmQtY29udGFpbmVyJyk7XHJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnLCB0b2RvLnByb2plY3QpO1xyXG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZG9uZScsIHRvZG8uZG9uZSk7XHJcbiAgICBjb25zdCBIVE1MU25pcHBldCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtZGVzY3JpcHRpb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxoNCBjbGFzcz1cInRvZG8tdGl0bGVcIj5cclxuICAgICAgICAgICAgJHtzYW5pdGl6ZSh0b2RvLnRpdGxlKX1cclxuICAgICAgICAgICAgPC9oND5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0b2RvLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAke3Nhbml0aXplKHRvZG8uZGVzY3JpcHRpb24pfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tYnRucy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvZG8tZG9uZSBidG4tY2lyY2xlXCIgdGl0bGU9JHt0b2RvLmRvbmU/IFwiRG9uZVwiOiBcIlRvZG9cIn0+PHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkXCI+JHt0b2RvLmRvbmU/IFwiY2hlY2tfY2lyY2xlXCI6IFwicmFkaW9fYnV0dG9uX3VuY2hlY2tlZFwifTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvZG8tZGV0YWlscyBidG4tY2lyY2xlXCIgdGl0bGU9XCJNb3JlIERldGFpbHNcIj48c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5zdW1tYXJpemU8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gICAgaXRlbS5pbm5lckhUTUwgPSBIVE1MU25pcHBldDtcclxuICAgIHJldHVybiBpdGVtO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlVG9kb0xpc3QoYXJyYXksIGluZGV4LCB0aXRsZSkge1xyXG4gICAgY29uc3QgdG9kb0xpc3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuICAgIHRvZG9MaXN0c0Rpdi5pbm5lckhUTUwgPSAnJztcclxuICAgIHRvZG9MaXN0VGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgbGV0IHRvZG9zVG9EaXNwbGF5ID0gW107XHJcbiAgICBpZihpbmRleCA9PT0gXCJhbGxMaXN0c1wiKSB7XHJcbiAgICAgICAgYXJyYXkuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdG9kb3NXaXRoSW5kaWNlcyA9IHByb2plY3QubGlzdC5tYXAoKHRvZG8sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICB7dG9kbywgaW5kZXh9XHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICB0b2Rvc1RvRGlzcGxheSA9IFsuLi50b2Rvc1RvRGlzcGxheSwgLi4udG9kb3NXaXRoSW5kaWNlc107XHJcbiAgICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9kb3NUb0Rpc3BsYXkgPSBbLi4uYXJyYXlbaW5kZXhdLmxpc3QubWFwKCh0b2RvLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICB7dG9kbywgaW5kZXh9XHJcbiAgICAgICAgKSldO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codG9kb3NUb0Rpc3BsYXkpO1xyXG5cclxuICAgIHRvZG9zVG9EaXNwbGF5LmZvckVhY2goKHt0b2RvLCBpbmRleH0pID0+IHtcclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjcmVhdGVUb2RvKHRvZG8sIGluZGV4KSk7XHJcbiAgICB9KVxyXG4gICAgdG9kb0xpc3RzRGl2LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxufVxyXG5cclxuLy8gUHJvamVjdCBET01cclxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChwcm9qZWN0LCBpbmRleCkge1xyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnbGluay1idG4nLCAncHJvamVjdC1idG4nKTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpO1xyXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBwcm9qZWN0Lm5hbWUpO1xyXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGluZGV4KTtcclxuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgIHJldHVybiB7YnV0dG9uOiBidXR0b24sIG9wdGlvbjogb3B0aW9ufTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoYXJyYXkpIHtcclxuICAgIHByb2plY3RzRGl2LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdG9kb1Byb2plY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCIwXCIgc2VsZWN0ZWQ+SG9tZTwvb3B0aW9uPic7XHJcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY3JlYXRlUHJvamVjdChhcnJheVtpXSwgaSk7XHJcbiAgICAgICAgcHJvamVjdHNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdE9iai5idXR0b24pO1xyXG4gICAgICAgIHRvZG9Qcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RPYmoub3B0aW9uKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gVG9kbyBEZXRhaWxzIFBhZ2VcclxuZnVuY3Rpb24gZGlzcGxheVRvZG9EZXRhaWxzKHRvZG8pIHtcclxuXHJcbiAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xyXG4gICAgdG9kb0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5kZXNjcmlwdGlvbjtcclxuICAgIHRvZG9EdWVkYXRlLnRleHRDb250ZW50ID0gdG9kby5kdWVEYXRlO1xyXG4gICAgdG9kb1ByaW9yaXR5LnRleHRDb250ZW50ID0gdG9kby5wcmlvcml0eTtcclxuICAgIHRvZG9Ob3Rlcy50ZXh0Q29udGVudCA9IHRvZG8ubm90ZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtjcmVhdGVUb2RvLCBjcmVhdGVQcm9qZWN0LCB1cGRhdGVUb2RvTGlzdCwgdXBkYXRlUHJvamVjdExpc3QsIGRpc3BsYXlUb2RvRGV0YWlsc307IiwiZnVuY3Rpb24gZ2V0QWxsTGlzdHMgKHByb2plY3RzKSB7XHJcbiAgICBjb25zdCBhbGxMaXN0cyA9IHByb2plY3RzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFsuLi5hY2MsIC4uLmN1cnIubGlzdF1cclxuICAgIH0sIFtdKVxyXG4gICAgcmV0dXJuIGFsbExpc3RzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb2RheUxpc3RzIChwcm9qZWN0cykge1xyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtnZXRBbGxMaXN0c307IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdE1ha2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHByaW9yaXR5KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7bmFtZSwgcHJpb3JpdHl9KTtcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIH1cclxufSIsIi8vIHNhbml0aXplciB0byB1c2UgaW5uZXJIVE1MIHdpdGhvdXQgc2VjdXJpdHkgY29uY2VyblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYW5pdGl6ZShpbnB1dCkge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYudGV4dENvbnRlbnQgPSBpbnB1dDtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59IiwiY29uc3QgdGhlbWVTd2l0Y2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPXRoZW1lLXN3aXRjaF0nKTtcclxuY29uc3Qgc2lkZWJhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLWJhci10b2dnbGUnKTtcclxuXHJcbi8vIE1hdGNoIHVzZXIgVGhlbWVcclxuaWYod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2RhcmsnKTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiTGlnaHQgTW9kZVwiKTtcclxufSBlbHNlIHtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnbGlnaHQnKTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkRhcmsgTW9kZVwiKTtcclxufVxyXG5cclxuLy8gVG9nZ2xlIFRoZW1lIG9uIENsaWNrXHJcbnRoZW1lU3dpdGNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsKGUpID0+IHtcclxuICAgIGlmKGUudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2RhcmsnKTtcclxuICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJTd2l0Y2ggdG8gTGlnaHRcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnbGlnaHQnKTtcclxuICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJTd2l0Y2ggdG8gRGFya1wiKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBUb2dnbGUgU2lkZWJhclxyXG5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZS1iYXInKTtcclxuc2lkZWJhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1zaWRlLWJhcicpO1xyXG59KSIsImZ1bmN0aW9uIGNoYW5nZVRpdGxlKHRvZG8sIG5ld1RpdGxlKSB7XHJcbiAgICB0b2RvLnRpdGxlID0gbmV3VGl0bGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZURlc2NyaXB0aW9uKHRvZG8sIG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICB0b2RvLmRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVN0YXRlICh0b2RvKSB7XHJcbiAgICB0b2RvLmRvbmUgPSB0b2RvLmRvbmUgPyBmYWxzZSA6IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5ICh0b2RvLCBuZXdQcmlvcml0eSkge1xyXG4gICAgdG9kby5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VEdWVEYXRlICh0b2RvLCBuZXdEYXRlKSB7XHJcbiAgICB0b2RvLmR1ZURhdGUgPSBuZXdEYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VOb3RlcyAodG9kbywgbmV3Tm90ZXMpIHtcclxuICAgIHRvZG8ubm90ZXMgPSBuZXdOb3RlcztcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlSXRlbSAoYXJyYXksIGluZGV4KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NoYW5nZVRpdGxlLCBjaGFuZ2VEZXNjcmlwdGlvbiwgY2hhbmdlU3RhdGUsIGNoYW5nZVByaW9yaXR5LCBjaGFuZ2VEdWVEYXRlLCBjaGFuZ2VOb3RlcywgZGVsZXRlSXRlbX07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb01ha2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3R9KTtcclxuICAgIH07XHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS9zdHlsZS5zY3NzJztcclxuaW1wb3J0ICdtYXRlcmlhbC1zeW1ib2xzL291dGxpbmVkLmNzcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL3RoZW1lJnNpZGViYXInO1xyXG5pbXBvcnQgVG9kb01ha2VyIGZyb20gJy4vbW9kdWxlcy90b2RvLW1ha2VyJztcclxuaW1wb3J0IFByb2plY3RNYWtlciBmcm9tICcuL21vZHVsZXMvcHJvamVjdC1tYWtlcic7XHJcbmltcG9ydCBUb2RvRnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy90b2RvLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBEb21GdW5jdGlvbnMgZnJvbSAnLi9tb2R1bGVzL2RvbS1mdW5jdGlvbnMnO1xyXG5pbXBvcnQgdG9kb0Z1bmN0aW9ucyBmcm9tICcuL21vZHVsZXMvdG9kby1mdW5jdGlvbnMnO1xyXG5pbXBvcnQgcHJvamVjdEZ1bmN0aW9ucyBmcm9tICcuL21vZHVsZXMvcHJvamVjdC1mdW5jdGlvbnMnO1xyXG5cclxuLy8gRE9NIEVsZW1lbnRzXHJcbmNvbnN0IHRvZG9MaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktcHJvamVjdHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IHRvZG9EZXRhaWxzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbHMtY2FyZC1jb250YWluZXInKTtcclxuY29uc3QgdG9kb0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscy1jYXJkJyk7XHJcbi8vIElucHV0c1xyXG5jb25zdCB0b2RvRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdG9kby1mb3JtJyk7XHJcbmNvbnN0IHByb2plY3RGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybS1jb250YWluZXInKTtcclxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XHJcbi8vIFRvZG8gSW5wdXRzXHJcbmNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xyXG5jb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcclxuY29uc3QgdG9kb0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xyXG5jb25zdCB0b2RvVGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lJyk7XHJcbmNvbnN0IHRvZG9Qcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpO1xyXG5jb25zdCB0b2RvTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90ZXMnKTtcclxuY29uc3QgdG9kb1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xyXG4vLyBQcm9qZWN0IElucHV0c1xyXG5jb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpO1xyXG5jb25zdCBwcm9qZWN0UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1wcmlvcml0eScpO1xyXG5cclxuLy8gQWRkIEJ1dHRvbnNcclxuY29uc3Qgb3BlblRvZG9Gb3JtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wZW4tdG9kby1mb3JtLWJ0bicpO1xyXG5jb25zdCBhZGRUb2RvQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10b2RvLWJ0bicpO1xyXG5jb25zdCBvcGVuUHJvamVjdEZvcm1CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tcHJvamVjdC1mb3JtLWJ0bicpO1xyXG5jb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ0bicpO1xyXG5cclxuLy8gUHJvamVjdCBCdXR0b25zXHJcbmNvbnN0IGhvbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJIb21lXCJdJyk7XHJcbmNvbnN0IGFsbExpc3RzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiQWxsIExpc3RzXCJdJyk7XHJcbmNvbnN0IG15UHJvamVjdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdGl0bGU9XCJNeSBQcm9qZWN0c1wiXScpO1xyXG5cclxuY29uc3QgcHJvamVjdHMgPSBbXHJcbiAgICBuZXcgUHJvamVjdE1ha2VyKFwiSG9tZVwiLCBudWxsKSxcclxuXTtcclxubGV0IGN1cnJlbnRQYWdlO1xyXG5cclxuLy8gQWRkIFRvZG8gSXRlbVxyXG5mdW5jdGlvbiBhZGRUb2RvSXRlbSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3QpIHtcclxuICAgIGNvbnN0IG5ld1RvZG8gPSBuZXcgVG9kb01ha2VyKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0KTtcclxuICAgIC8vIGNvbnN0IGluZGV4ID0gcHJvamVjdHNbcHJvamVjdF0ubGlzdC5sZW5ndGg7XHJcbiAgICBwcm9qZWN0c1twcm9qZWN0XS5saXN0LnB1c2gobmV3VG9kbyk7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3QsIHByb2plY3RzW3Byb2plY3RdLm5hbWUpO1xyXG4gICAgdG9kb0Zvcm1Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbi8vIENoYW5naW5nIHRvZG8gaXRlbVxyXG5mdW5jdGlvbiB1cGRhdGVEb25lU3RhdHVzKHByb2plY3RJbmRleCwgdG9kbykge1xyXG4gICAgVG9kb0Z1bmN0aW9ucy5jaGFuZ2VTdGF0ZShwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbdG9kb10pO1xyXG4gICAgaWYoY3VycmVudFBhZ2UgPT09IFwiYWxsTGlzdHNcIikge1xyXG4gICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgJ2FsbExpc3RzJywgJ0FsbCBMaXN0cycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3RJbmRleCwgcHJvamVjdHNbcHJvamVjdEluZGV4XS5uYW1lKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG59XHJcblxyXG4vLyBSZW1vdmUgVG9kbyBJdGVtXHJcbmZ1bmN0aW9uIHJlbW92ZVRvZG9JdGVtIChwcm9qZWN0SW5kZXgsIGluZGV4KSB7XHJcbiAgICBUb2RvRnVuY3Rpb25zLmRlbGV0ZUl0ZW0ocHJvamVjdHNbcHJvamVjdEluZGV4XS5saXN0LCBpbmRleCk7XHJcbiAgICBpZihjdXJyZW50UGFnZSA9PT0gXCJhbGxMaXN0c1wiKSB7XHJcbiAgICAgICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCAnYWxsTGlzdHMnLCAnQWxsIExpc3RzJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgcHJvamVjdEluZGV4LCBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgdG9kb0RldGFpbHNEaXYuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbi8vIEFkZCBQcm9qZWN0XHJcbmZ1bmN0aW9uIGFkZFByb2plY3QgKG5hbWUsIHByaW9yaXR5KSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3RNYWtlcihuYW1lLCBwcmlvcml0eSk7XHJcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVByb2plY3RMaXN0KHByb2plY3RzKTtcclxuICAgIC8vIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG4gICAgY29uc3QgcHJvamVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcclxuICAgIHByb2plY3RCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgICAgICBjdXJyZW50UGFnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgaW5kZXgsIHByb2plY3RzW2luZGV4XS5uYW1lKTtcclxuICAgICAgICAgICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICBwcm9qZWN0Rm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICBwcm9qZWN0c0Rpdi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3RzLmxlbmd0aCAtIDEsIHByb2plY3RzW3Byb2plY3RzLmxlbmd0aCAtMV0ubmFtZSk7XHJcbn1cclxuXHJcbi8vIFJlbW92ZSBQcm9qZWN0XHJcbmZ1bmN0aW9uIHJlbW92ZVByb2plY3QgKGluZGV4KSB7XHJcbiAgICBUb2RvRnVuY3Rpb25zLmRlbGV0ZUl0ZW0ocHJvamVjdHMsIGluZGV4KTtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgMCwgcHJvamVjdHNbMF0ubmFtZSk7XHJcbn1cclxuXHJcbi8vIEV2ZW50IExpc3RlbmVycyBUb2RvIEZvcm0gT3BlbiBVcFxyXG5vcGVuVG9kb0Zvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICB9KTtcclxufSk7XHJcbnRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG4vLyBFdmVudCBMaXN0ZW5lciBQcm9qZWN0IEZvcm0gT3BlbiBVcFxyXG5vcGVuUHJvamVjdEZvcm1CdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgcHJvamVjdEZvcm1Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIHByb2plY3RGb3JtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0Rm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSlcclxucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge2Uuc3RvcFByb3BhZ2F0aW9uKCl9KTtcclxuXHJcbi8vIEFkZCB0b2RvIGl0ZW0gb24gRm9ybSBzdWJtaXRcclxuYWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZyh0b2RvRGF0ZS52YWx1ZSk7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gdG9kb0RhdGUudmFsdWUgKyBcIlRcIiArIHRvZG9UaW1lLnZhbHVlO1xyXG4gICAgYWRkVG9kb0l0ZW0odG9kb1RpdGxlLnZhbHVlLCB0b2RvRGVzY3JpcHRpb24udmFsdWUsIGR1ZURhdGUsIHRvZG9Qcmlvcml0eS52YWx1ZSwgdG9kb05vdGVzLnZhbHVlLCBmYWxzZSwgK3RvZG9Qcm9qZWN0LnZhbHVlKTtcclxufSk7XHJcblxyXG4vLyBBZGQgcHJvamVjdCBvbiBGb3JtIHN1Ym1pdFxyXG5hZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmKHByb2plY3RUaXRsZS52YWx1ZSAmJiBwcm9qZWN0UHJpb3JpdHkudmFsdWUpIHtcclxuICAgICAgICBhZGRQcm9qZWN0KHByb2plY3RUaXRsZS52YWx1ZSwgcHJvamVjdFByaW9yaXR5LnZhbHVlKTtcclxuICAgIH1cclxufSlcclxuXHJcbi8vIE5hdmlnYXRlIFByb2plY3RzXHJcbmhvbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIDAsIHByb2plY3RzWzBdLm5hbWUpO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICBjdXJyZW50UGFnZSA9IG51bGw7XHJcbn0pO1xyXG5teVByb2plY3RzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgcHJvamVjdHNEaXYuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG59KTtcclxuYWxsTGlzdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIFwiYWxsTGlzdHNcIiwgXCJBbGwgTGlzdHNcIik7XHJcbiAgICBjdXJyZW50UGFnZSA9IFwiYWxsTGlzdHNcIjtcclxuICAgIHJlZnJlc2hFdmVudExpc3RlbmVycygpO1xyXG59KVxyXG5cclxuLy8gRGV0YWlscyBDb250YWluZXJcclxuZnVuY3Rpb24gc2hvd1RvZG9EZXRhaWxzKHByb2plY3RJbmRleCwgaW5kZXgpIHtcclxuICAgIGNvbnN0IHRvZG8gPSBwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3RbaW5kZXhdO1xyXG4gICAgRG9tRnVuY3Rpb25zLmRpc3BsYXlUb2RvRGV0YWlscyh0b2RvKTtcclxuICAgIGNvbnN0IHRvZG9FZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tZWRpdC1idG4nKTtcclxuICAgIGNvbnN0IHRvZG9EZWxldGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1kZWwtYnRuJyk7XHJcbiAgICB0b2RvRGVsZXRlQnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmVtb3ZlVG9kb0l0ZW0odG9kby5wcm9qZWN0LCBpbmRleCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRvZG9EZXRhaWxzRGl2LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIHRvZG9EZXRhaWxzRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRvZG9EZXRhaWxzRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG59O1xyXG50b2RvRGV0YWlscy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKX0pO1xyXG5cclxuLy8gUmVmcmVzaCBFdmVudCBMaXN0ZW5lcnNcclxuZnVuY3Rpb24gcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgdG9kb0RvbmVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tZG9uZScpO1xyXG4gICAgY29uc3QgdG9kb0RldGFpbHNCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tZGV0YWlscycpO1xyXG5cclxuICAgIHRvZG9Eb25lQnRucy5mb3JFYWNoKGRvbmVCdG4gPT4ge1xyXG4gICAgICAgIGRvbmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKyBkb25lQnRuLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gKyBkb25lQnRuLnBhcmVudE5vZGUucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdCcpO1xyXG4gICAgICAgICAgICB1cGRhdGVEb25lU3RhdHVzKHByb2plY3RJbmRleCwgaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICB0b2RvRGV0YWlsc0J0bnMuZm9yRWFjaChkZXRhaWxzQnRuID0+IHtcclxuICAgICAgICBkZXRhaWxzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICsgZGV0YWlsc0J0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9ICsgZGV0YWlsc0J0bi5wYXJlbnROb2RlLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnKTtcclxuICAgICAgICAgICAgc2hvd1RvZG9EZXRhaWxzKHByb2plY3RJbmRleCwgaW5kZXgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG4vLyBURVNUSU5HXHJcblxyXG5hZGRQcm9qZWN0KFwiTXkgUHJvamVjdCAxXCIsIDEpO1xyXG5hZGRQcm9qZWN0KFwiTXkgUHJvamVjdCAyXCIsIDIpO1xyXG5cclxuYWRkVG9kb0l0ZW0oXCJDb2RlXCIsIFwiPGltZyBzcmM9Jyc+XCIsIFwiMjAyNC0zLTFcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMCk7XHJcbmFkZFRvZG9JdGVtKFwiRWF0XCIsIFwiY29kaW5nIGlzIGJlYXV0aWZ1bFwiLCBcIjIwMjQtMy0xXCIsIDEsIFwiYmxhaCBibGFoIGJsYWhcIiwgZmFsc2UsIDApO1xyXG5hZGRUb2RvSXRlbShcIlNsZWVwXCIsIFwiY29kaW5nIGlzIGJlYXV0aWZ1bFwiLCBcIjIwMjQtMy0xXCIsIDEsIFwiYmxhaCBibGFoIGJsYWhcIiwgZmFsc2UsIDEpO1xyXG5hZGRUb2RvSXRlbShcIlJlcGVhdFwiLCBcImNvZGluZyBpcyBiZWF1dGlmdWxcIiwgXCIyMDI0LTMtMVwiLCAxLCBcImJsYWggYmxhaCBibGFoXCIsIGZhbHNlLCAyKTtcclxuXHJcbi8vIFN0YXJ0IGF0IEhvbWUgUGFnZSBcclxuY3VycmVudFBhZ2UgPSBudWxsO1xyXG5Eb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIDAsIHByb2plY3RzWzBdLm5hbWUpO1xyXG5yZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbmNvbnNvbGUubG9nKHByb2plY3RGdW5jdGlvbnMuZ2V0QWxsTGlzdHMocHJvamVjdHMpKTtcclxuY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCcyMDI0LTAzLTExVDEyOjAwJyk7XHJcbmNvbnN0IGRhdGUyID0gbmV3IERhdGUoJzIwMjQtMDMtMDZUMjA6MjQ6MzInKTtcclxuY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG5jb25zb2xlLmxvZyhkYXRlLmdldFRpbWUoKSA8IHRvZGF5LmdldFRpbWUoKSk7IC8vIERhdGVkIGR1ZWRcclxuY29uc29sZS5sb2coW2RhdGUuZ2V0RnVsbFllYXIoKSwgcGFkMmRpZ2l0cyhkYXRlLmdldE1vbnRoKCkrMSksIHBhZDJkaWdpdHMoZGF0ZS5nZXREYXRlKCkpXS5qb2luKCctJykpO1xyXG5cclxuY29uc29sZS5sb2coZGF0ZS5nZXREYXRlKCkgPT09IHRvZGF5LmdldERhdGUoKSk7XHJcbmNvbnNvbGUubG9nKGRhdGUyLmdldERhdGUoKSA9PT0gdG9kYXkuZ2V0RGF0ZSgpKTtcclxuXHJcbi8vIFBhZCAwcyBvbiBkYXkgJiBtb250aFxyXG5mdW5jdGlvbiBwYWQyZGlnaXRzKG51bSkge1xyXG4gICAgcmV0dXJuIFN0cmluZyhudW0pLnBhZFN0YXJ0KDIsICcwJyk7XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=