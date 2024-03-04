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


const projectsDiv = document.querySelector('.my-projects-container');
const todoProject = document.querySelector('#project');
const todoListTitle = document.querySelector('.todo-list-title');

// Todo DOM
function createTodo (todo, index) {
    const item = document.createElement('div');
    item.classList.add('todo-card-container');
    item.setAttribute('data-index', index);   
    const HTMLSnippet = `
        <h4 class="todo-title">
        ${(0,_sanitizer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(todo.title)}
        </h4>
        <div class="todo-btns-container">
            <button class="todo-done btn-circle"><span class="material-symbols-outlined">${todo.done ? "check_circle" : "radio_button_unchecked"}</span></button>
            <button class="todo-details btn-circle"><span class="material-symbols-outlined">summarize</span></button>
        </div>
        <div class="description-container">
            <p class="todo-description">
                ${(0,_sanitizer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(todo.description)}
            </p>
        </div>
    `;
    item.innerHTML = HTMLSnippet;
    return item;
};

function updateTodoList(array, index) {
    todoListTitle.textContent = array[index].name;
    const todoListsDiv = document.querySelector('.todo-lists');
    todoListsDiv.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < array[index].list.length; i++) {
        fragment.appendChild(createTodo(array[index].list[i], i));
    }
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({createTodo, createProject, updateTodoList, updateProjectList});

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








// DOM Elements
const todoListDiv = document.querySelector('.todo-lists');
const projectsDiv = document.querySelector('.my-projects-container');
// Inputs
const todoFormContainer = document.querySelector('.form-container');
const todoForm = document.querySelector('.new-todo-form');
const todoTitle = document.querySelector('#title');
const todoDescription = document.querySelector('#description');
const todoDate = document.querySelector('#date');
const todoTime = document.querySelector('#time');
const todoPriority = document.querySelector('#priority');
const todoNotes = document.querySelector('#notes');
const todoProject = document.querySelector('#project');
// Add Buttons
const openTodoFormBtn = document.querySelector('.open-todo-form-btn');
const addTodoBtn = document.querySelector('#add-todo-btn');
// Project Buttons
const homeBtn = document.querySelector('button[title="Home"]');
const myProjectsBtn = document.querySelector('button[title="My Projects"]');

const projects = [
    new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"]("Home", null),
];

// Current Page
let currentProjectPage = 0;

// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new _modules_todo_maker__WEBPACK_IMPORTED_MODULE_3__["default"](title, description, dueDate, priority, notes, done, project);
    // const index = projects[project].list.length;
    projects[project].list.push(newTodo);
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, project);
    currentProjectPage = project;
    refreshEventListeners();
}

// Changing todo item
function updateDoneStatus(project, todo) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].changeState(projects[project].list[todo]);
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, project);
    refreshEventListeners();
}

// Remove Todo Item
function removeTodoItem (projectIndex, index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects[projectIndex].list, index);
    if(currentProjectPage !== 0) {
        _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, index);
    } else {
        _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0);
    }
}

// Add Project
function addProject (name, priority) {
    const newProject = new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"](name, priority);
    projects.push(newProject);
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateProjectList(projects);
    refreshEventListeners();
}

// Remove Project
function removeProject (index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects, index);
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0);
}

// Event Listeners Form Open Up
openTodoFormBtn.addEventListener('click', () => {
    todoFormContainer.classList.add('show');
    todoFormContainer.addEventListener('click', () => {
        todoFormContainer.classList.remove('show');
    });
});
todoForm.addEventListener('click', (e) => {e.stopPropagation()});

// Add todo item on Form submit
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const dueDate = todoDate.value + "T" + todoTime.value;
    addTodoItem(todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, false, +todoProject.value);
});

// Navigate Projects
homeBtn.addEventListener('click', () => {
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0);
    currentProjectPage = 0;
    refreshEventListeners();
});
myProjectsBtn.addEventListener('click', () => {
    projectsDiv.classList.toggle('show');
});

// Refresh Event Listeners
function refreshEventListeners() {
    const todoDoneBtns = document.querySelectorAll('.todo-done');
    const projectBtns = document.querySelectorAll('.project-btn');

    projectBtns.forEach((btn,index) => {
        btn.addEventListener('click', () => {
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, index + 1);
            currentProjectPage = index + 1;
            refreshEventListeners();
        });
    })

    todoDoneBtns.forEach(doneBtn => {
        doneBtn.addEventListener('click', () => {
            const index = + doneBtn.parentNode.parentNode.getAttribute('data-index');
            console.log(index);
            updateDoneStatus(currentProjectPage, index);
            console.log(projects);
        });
    });
}


// TESTING

addProject("My Project 1", 1);
addProject("My Project 2", 2);

addTodoItem("Code", "<img src=''>", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Eat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Sleep", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 1);
addTodoItem("Repeat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 2);

// Start at Home Page 
currentProjectPage = 0;
_modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0);
refreshEventListeners();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUNBLElBQUksOERBQVk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksK0RBQWE7QUFDakIsSUFBSSw4REFBWTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0QsMkNBQTJDLG9CQUFvQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsSUFBSSw4REFBWTtBQUNoQjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksOERBQVk7QUFDeEI7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUFZO0FBQ1osd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLXN5bWJvbHMvb3V0bGluZWQuY3NzPzYwZjQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHlsZS9zdHlsZS5zY3NzPzQ1NmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QtbWFrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Nhbml0aXplci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdGhlbWUmc2lkZWJhci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8tbWFrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgc2FuaXRpemUgZnJvbSAnLi9zYW5pdGl6ZXIuanMnO1xyXG5cclxuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktcHJvamVjdHMtY29udGFpbmVyJyk7XHJcbmNvbnN0IHRvZG9Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcclxuY29uc3QgdG9kb0xpc3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QtdGl0bGUnKTtcclxuXHJcbi8vIFRvZG8gRE9NXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvZG8gKHRvZG8sIGluZGV4KSB7XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY2FyZC1jb250YWluZXInKTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpOyAgIFxyXG4gICAgY29uc3QgSFRNTFNuaXBwZXQgPSBgXHJcbiAgICAgICAgPGg0IGNsYXNzPVwidG9kby10aXRsZVwiPlxyXG4gICAgICAgICR7c2FuaXRpemUodG9kby50aXRsZSl9XHJcbiAgICAgICAgPC9oND5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1idG5zLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9kby1kb25lIGJ0bi1jaXJjbGVcIj48c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj4ke3RvZG8uZG9uZSA/IFwiY2hlY2tfY2lyY2xlXCIgOiBcInJhZGlvX2J1dHRvbl91bmNoZWNrZWRcIn08L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b2RvLWRldGFpbHMgYnRuLWNpcmNsZVwiPjxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPnN1bW1hcml6ZTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwidG9kby1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgJHtzYW5pdGl6ZSh0b2RvLmRlc2NyaXB0aW9uKX1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICAgIGl0ZW0uaW5uZXJIVE1MID0gSFRNTFNuaXBwZXQ7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRvZG9MaXN0KGFycmF5LCBpbmRleCkge1xyXG4gICAgdG9kb0xpc3RUaXRsZS50ZXh0Q29udGVudCA9IGFycmF5W2luZGV4XS5uYW1lO1xyXG4gICAgY29uc3QgdG9kb0xpc3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuICAgIHRvZG9MaXN0c0Rpdi5pbm5lckhUTUwgPSAnJztcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5W2luZGV4XS5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlVG9kbyhhcnJheVtpbmRleF0ubGlzdFtpXSwgaSkpO1xyXG4gICAgfVxyXG4gICAgdG9kb0xpc3RzRGl2LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxufVxyXG5cclxuLy8gUHJvamVjdCBET01cclxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChwcm9qZWN0LCBpbmRleCkge1xyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnbGluay1idG4nLCAncHJvamVjdC1idG4nKTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpO1xyXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBwcm9qZWN0Lm5hbWUpO1xyXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGluZGV4KTtcclxuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgIHJldHVybiB7YnV0dG9uOiBidXR0b24sIG9wdGlvbjogb3B0aW9ufTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoYXJyYXkpIHtcclxuICAgIHByb2plY3RzRGl2LmlubmVySFRNTCA9ICcnO1xyXG4gICAgdG9kb1Byb2plY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCIwXCIgc2VsZWN0ZWQ+SG9tZTwvb3B0aW9uPic7XHJcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0T2JqID0gY3JlYXRlUHJvamVjdChhcnJheVtpXSwgaSk7XHJcbiAgICAgICAgcHJvamVjdHNEaXYuYXBwZW5kQ2hpbGQocHJvamVjdE9iai5idXR0b24pO1xyXG4gICAgICAgIHRvZG9Qcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RPYmoub3B0aW9uKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NyZWF0ZVRvZG8sIGNyZWF0ZVByb2plY3QsIHVwZGF0ZVRvZG9MaXN0LCB1cGRhdGVQcm9qZWN0TGlzdH07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdE1ha2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHByaW9yaXR5KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7bmFtZSwgcHJpb3JpdHl9KTtcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgIH1cclxufSIsIi8vIHNhbml0aXplciB0byB1c2UgaW5uZXJIVE1MIHdpdGhvdXQgc2VjdXJpdHkgY29uY2VyblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYW5pdGl6ZShpbnB1dCkge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYudGV4dENvbnRlbnQgPSBpbnB1dDtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59IiwiY29uc3QgdGhlbWVTd2l0Y2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPXRoZW1lLXN3aXRjaF0nKTtcclxuY29uc3Qgc2lkZWJhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLWJhci10b2dnbGUnKTtcclxuXHJcbi8vIE1hdGNoIHVzZXIgVGhlbWVcclxuaWYod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2RhcmsnKTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgdGhlbWVTd2l0Y2hCdXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiTGlnaHQgTW9kZVwiKTtcclxufSBlbHNlIHtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnbGlnaHQnKTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkRhcmsgTW9kZVwiKTtcclxufVxyXG5cclxuLy8gVG9nZ2xlIFRoZW1lIG9uIENsaWNrXHJcbnRoZW1lU3dpdGNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsKGUpID0+IHtcclxuICAgIGlmKGUudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2RhcmsnKTtcclxuICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJTd2l0Y2ggdG8gTGlnaHRcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnbGlnaHQnKTtcclxuICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJTd2l0Y2ggdG8gRGFya1wiKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBUb2dnbGUgU2lkZWJhclxyXG5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2lkZS1iYXInKTtcclxuc2lkZWJhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1zaWRlLWJhcicpO1xyXG59KSIsImZ1bmN0aW9uIGNoYW5nZVRpdGxlKHRvZG8sIG5ld1RpdGxlKSB7XHJcbiAgICB0b2RvLnRpdGxlID0gbmV3VGl0bGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZURlc2NyaXB0aW9uKHRvZG8sIG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICB0b2RvLmRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVN0YXRlICh0b2RvKSB7XHJcbiAgICB0b2RvLmRvbmUgPSB0b2RvLmRvbmUgPyBmYWxzZSA6IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5ICh0b2RvLCBuZXdQcmlvcml0eSkge1xyXG4gICAgdG9kby5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VEdWVEYXRlICh0b2RvLCBuZXdEYXRlKSB7XHJcbiAgICB0b2RvLmR1ZURhdGUgPSBuZXdEYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VOb3RlcyAodG9kbywgbmV3Tm90ZXMpIHtcclxuICAgIHRvZG8ubm90ZXMgPSBuZXdOb3RlcztcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlSXRlbSAoYXJyYXksIGluZGV4KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NoYW5nZVRpdGxlLCBjaGFuZ2VEZXNjcmlwdGlvbiwgY2hhbmdlU3RhdGUsIGNoYW5nZVByaW9yaXR5LCBjaGFuZ2VEdWVEYXRlLCBjaGFuZ2VOb3RlcywgZGVsZXRlSXRlbX07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb01ha2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3R9KTtcclxuICAgIH07XHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS9zdHlsZS5zY3NzJztcclxuaW1wb3J0ICdtYXRlcmlhbC1zeW1ib2xzL291dGxpbmVkLmNzcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL3RoZW1lJnNpZGViYXInO1xyXG5pbXBvcnQgVG9kb01ha2VyIGZyb20gJy4vbW9kdWxlcy90b2RvLW1ha2VyJztcclxuaW1wb3J0IFByb2plY3RNYWtlciBmcm9tICcuL21vZHVsZXMvcHJvamVjdC1tYWtlcic7XHJcbmltcG9ydCBUb2RvRnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy90b2RvLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBEb21GdW5jdGlvbnMgZnJvbSAnLi9tb2R1bGVzL2RvbS1mdW5jdGlvbnMnO1xyXG5cclxuLy8gRE9NIEVsZW1lbnRzXHJcbmNvbnN0IHRvZG9MaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktcHJvamVjdHMtY29udGFpbmVyJyk7XHJcbi8vIElucHV0c1xyXG5jb25zdCB0b2RvRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRhaW5lcicpO1xyXG5jb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdG9kby1mb3JtJyk7XHJcbmNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xyXG5jb25zdCB0b2RvRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcclxuY29uc3QgdG9kb0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xyXG5jb25zdCB0b2RvVGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lJyk7XHJcbmNvbnN0IHRvZG9Qcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpO1xyXG5jb25zdCB0b2RvTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90ZXMnKTtcclxuY29uc3QgdG9kb1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xyXG4vLyBBZGQgQnV0dG9uc1xyXG5jb25zdCBvcGVuVG9kb0Zvcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3Blbi10b2RvLWZvcm0tYnRuJyk7XHJcbmNvbnN0IGFkZFRvZG9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRvZG8tYnRuJyk7XHJcbi8vIFByb2plY3QgQnV0dG9uc1xyXG5jb25zdCBob21lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiSG9tZVwiXScpO1xyXG5jb25zdCBteVByb2plY3RzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3RpdGxlPVwiTXkgUHJvamVjdHNcIl0nKTtcclxuXHJcbmNvbnN0IHByb2plY3RzID0gW1xyXG4gICAgbmV3IFByb2plY3RNYWtlcihcIkhvbWVcIiwgbnVsbCksXHJcbl07XHJcblxyXG4vLyBDdXJyZW50IFBhZ2VcclxubGV0IGN1cnJlbnRQcm9qZWN0UGFnZSA9IDA7XHJcblxyXG4vLyBBZGQgVG9kbyBJdGVtXHJcbmZ1bmN0aW9uIGFkZFRvZG9JdGVtICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCkge1xyXG4gICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvTWFrZXIodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3QpO1xyXG4gICAgLy8gY29uc3QgaW5kZXggPSBwcm9qZWN0c1twcm9qZWN0XS5saXN0Lmxlbmd0aDtcclxuICAgIHByb2plY3RzW3Byb2plY3RdLmxpc3QucHVzaChuZXdUb2RvKTtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgcHJvamVjdCk7XHJcbiAgICBjdXJyZW50UHJvamVjdFBhZ2UgPSBwcm9qZWN0O1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbi8vIENoYW5naW5nIHRvZG8gaXRlbVxyXG5mdW5jdGlvbiB1cGRhdGVEb25lU3RhdHVzKHByb2plY3QsIHRvZG8pIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuY2hhbmdlU3RhdGUocHJvamVjdHNbcHJvamVjdF0ubGlzdFt0b2RvXSk7XHJcbiAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIHByb2plY3QpO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn1cclxuXHJcbi8vIFJlbW92ZSBUb2RvIEl0ZW1cclxuZnVuY3Rpb24gcmVtb3ZlVG9kb0l0ZW0gKHByb2plY3RJbmRleCwgaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0c1twcm9qZWN0SW5kZXhdLmxpc3QsIGluZGV4KTtcclxuICAgIGlmKGN1cnJlbnRQcm9qZWN0UGFnZSAhPT0gMCkge1xyXG4gICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgaW5kZXgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIDApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBBZGQgUHJvamVjdFxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0IChuYW1lLCBwcmlvcml0eSkge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0TWFrZXIobmFtZSwgcHJpb3JpdHkpO1xyXG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVQcm9qZWN0TGlzdChwcm9qZWN0cyk7XHJcbiAgICByZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTtcclxufVxyXG5cclxuLy8gUmVtb3ZlIFByb2plY3RcclxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdCAoaW5kZXgpIHtcclxuICAgIFRvZG9GdW5jdGlvbnMuZGVsZXRlSXRlbShwcm9qZWN0cywgaW5kZXgpO1xyXG4gICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCAwKTtcclxufVxyXG5cclxuLy8gRXZlbnQgTGlzdGVuZXJzIEZvcm0gT3BlbiBVcFxyXG5vcGVuVG9kb0Zvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICB0b2RvRm9ybUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0b2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICB9KTtcclxufSk7XHJcbnRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpfSk7XHJcblxyXG4vLyBBZGQgdG9kbyBpdGVtIG9uIEZvcm0gc3VibWl0XHJcbmFkZFRvZG9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IHRvZG9EYXRlLnZhbHVlICsgXCJUXCIgKyB0b2RvVGltZS52YWx1ZTtcclxuICAgIGFkZFRvZG9JdGVtKHRvZG9UaXRsZS52YWx1ZSwgdG9kb0Rlc2NyaXB0aW9uLnZhbHVlLCBkdWVEYXRlLCB0b2RvUHJpb3JpdHkudmFsdWUsIHRvZG9Ob3Rlcy52YWx1ZSwgZmFsc2UsICt0b2RvUHJvamVjdC52YWx1ZSk7XHJcbn0pO1xyXG5cclxuLy8gTmF2aWdhdGUgUHJvamVjdHNcclxuaG9tZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgMCk7XHJcbiAgICBjdXJyZW50UHJvamVjdFBhZ2UgPSAwO1xyXG4gICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbn0pO1xyXG5teVByb2plY3RzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgcHJvamVjdHNEaXYuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG59KTtcclxuXHJcbi8vIFJlZnJlc2ggRXZlbnQgTGlzdGVuZXJzXHJcbmZ1bmN0aW9uIHJlZnJlc2hFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHRvZG9Eb25lQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWRvbmUnKTtcclxuICAgIGNvbnN0IHByb2plY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtYnRuJyk7XHJcblxyXG4gICAgcHJvamVjdEJ0bnMuZm9yRWFjaCgoYnRuLGluZGV4KSA9PiB7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0UGFnZSA9IGluZGV4ICsgMTtcclxuICAgICAgICAgICAgcmVmcmVzaEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIHRvZG9Eb25lQnRucy5mb3JFYWNoKGRvbmVCdG4gPT4ge1xyXG4gICAgICAgIGRvbmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKyBkb25lQnRuLnBhcmVudE5vZGUucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xyXG4gICAgICAgICAgICB1cGRhdGVEb25lU3RhdHVzKGN1cnJlbnRQcm9qZWN0UGFnZSwgaW5kZXgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbi8vIFRFU1RJTkdcclxuXHJcbmFkZFByb2plY3QoXCJNeSBQcm9qZWN0IDFcIiwgMSk7XHJcbmFkZFByb2plY3QoXCJNeSBQcm9qZWN0IDJcIiwgMik7XHJcblxyXG5hZGRUb2RvSXRlbShcIkNvZGVcIiwgXCI8aW1nIHNyYz0nJz5cIiwgXCIyMDI0LTMtMVwiLCAxLCBcImJsYWggYmxhaCBibGFoXCIsIGZhbHNlLCAwKTtcclxuYWRkVG9kb0l0ZW0oXCJFYXRcIiwgXCJjb2RpbmcgaXMgYmVhdXRpZnVsXCIsIFwiMjAyNC0zLTFcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMCk7XHJcbmFkZFRvZG9JdGVtKFwiU2xlZXBcIiwgXCJjb2RpbmcgaXMgYmVhdXRpZnVsXCIsIFwiMjAyNC0zLTFcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMSk7XHJcbmFkZFRvZG9JdGVtKFwiUmVwZWF0XCIsIFwiY29kaW5nIGlzIGJlYXV0aWZ1bFwiLCBcIjIwMjQtMy0xXCIsIDEsIFwiYmxhaCBibGFoIGJsYWhcIiwgZmFsc2UsIDIpO1xyXG5cclxuLy8gU3RhcnQgYXQgSG9tZSBQYWdlIFxyXG5jdXJyZW50UHJvamVjdFBhZ2UgPSAwO1xyXG5Eb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIDApO1xyXG5yZWZyZXNoRXZlbnRMaXN0ZW5lcnMoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=