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

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
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



function createTodo (todo, index) {
    const item = document.createElement('div');
    item.classList.add('todo-card-container');
    item.setAttribute('data-index', index);
    
    const HTMLSnippet = `
        <h4 class="todo-title">
        ${(0,_sanitizer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(todo.title)}
        </h4>
        <p class="todo-description">
            ${(0,_sanitizer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(todo.description)}
        </p>
        <div class="done">
            <span class="material-symbols-outlined">${todo.done ? "checked_circle" : "radio_button_unchecked"}</span>
        </div>
    `;
    item.innerHTML = HTMLSnippet;
    return item;
};

function updateTodoList(array, index) {
    const todoListsDiv = document.querySelector('.todo-lists');
    todoListsDiv.innerHTML = '';
    const fragment = document.createDocumentFragment();
    console.log(array);
    console.log(index);
    for(let i = 0; i < array[index].list.length; i++) {
        fragment.appendChild(createTodo(array[index].list[i], i));
    }
    todoListsDiv.appendChild(fragment);
}

function createProject(project, index) {
    // const newProject = document.createElement('div');
    // const HTMLSnippet = `
    //     <button class="link-btn project-btn" type="button" data-index="${index}" onclick="displayTodoLists(${index})">${sanitize(project.name)}</button>
    // `;
    const button = document.createElement('button');
    button.classList.add('link-btn', 'project-btn');
    button.setAttribute('type', 'button');
    button.setAttribute('data-index', index);
    button.textContent = project.name;
    return button;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({createTodo, createProject, updateTodoList});

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

// Toggle on Click
themeSwitchButton.addEventListener('change',(e) => {
    if(e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        e.target.setAttribute('title', "Switch to Light");
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        e.target.setAttribute('title', "Switch to Dark");
    }
});

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
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
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
const linkBtns = document.querySelectorAll('.link-btn');

const projects = [
    new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"]("Home", null),
];

const currentProjectPage = 1;

// Add Todo Item
function addTodoItem (title, description, dueDate, priority, notes, done, project) {
    const newTodo = new _modules_todo_maker__WEBPACK_IMPORTED_MODULE_3__["default"](title, description, dueDate, priority, notes, done, project);
    const index = projects[project].list.length;
    projects[project].list.push(newTodo);
    todoListDiv.appendChild(_modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].createTodo(newTodo, index));
}

// Add Project
function addProject (name, priority) {
    const newProject = new _modules_project_maker__WEBPACK_IMPORTED_MODULE_4__["default"](name, priority);
    const index = projects.length;
    projects.push(newProject);
    const newProjectBtn = _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].createProject(newProject, index);
    newProjectBtn.addEventListener('click', () => {
        _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, index)
    });
    projectsDiv.appendChild(newProjectBtn);
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

// Remove Project
function removeProject (index) {
    _modules_todo_functions__WEBPACK_IMPORTED_MODULE_5__["default"].deleteItem(projects, index);
    _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0);
}

//First Project
addProject("My Project 1", 1);

// Test Adding todo
addTodoItem("Code", "<img src=''>", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Eat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 0);
addTodoItem("Sleep", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 1);
addTodoItem("Repeat", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false, 1);

console.log(projects);

// Initial display of to-do items for the first project
_modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0);

// Event Listeners
openTodoFormBtn.addEventListener('click', () => {
    todoFormContainer.classList.add('show');
    todoFormContainer.addEventListener('click', () => {
        todoFormContainer.classList.remove('show');
    });
});
todoForm.addEventListener('click', (e) => {e.stopPropagation()});

// Add todo item on form submit
addTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const dueDate = todoDate.value + "T" + todoTime.value;
    console.log(todoProject.value);
    addTodoItem(todoTitle.value, todoDescription.value, dueDate, todoPriority.value, todoNotes.value, false, +todoProject.value);
})

linkBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        navigateLists(e);
    });
});

function navigateLists(e) {
    switch(e.target.title) {
        case "Home":
            _modules_dom_functions__WEBPACK_IMPORTED_MODULE_6__["default"].updateTodoList(projects, 0);
            console.log("Home is clicked");
            break;
        case "My Projects":
            console.log("My Projects is clicked");
            projectsDiv.classList.toggle('show');
            break;
    }
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNELDJDQUEyQyxvQkFBb0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw4REFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL21hdGVyaWFsLXN5bWJvbHMvb3V0bGluZWQuY3NzPzYwZjQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHlsZS5zY3NzP2JjM2IiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QtbWFrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Nhbml0aXplci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdGhlbWUmc2lkZWJhci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kby1mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8tbWFrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgc2FuaXRpemUgZnJvbSAnLi9zYW5pdGl6ZXIuanMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvZG8gKHRvZG8sIGluZGV4KSB7XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY2FyZC1jb250YWluZXInKTtcclxuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpO1xyXG4gICAgXHJcbiAgICBjb25zdCBIVE1MU25pcHBldCA9IGBcclxuICAgICAgICA8aDQgY2xhc3M9XCJ0b2RvLXRpdGxlXCI+XHJcbiAgICAgICAgJHtzYW5pdGl6ZSh0b2RvLnRpdGxlKX1cclxuICAgICAgICA8L2g0PlxyXG4gICAgICAgIDxwIGNsYXNzPVwidG9kby1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAke3Nhbml0aXplKHRvZG8uZGVzY3JpcHRpb24pfVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG9uZVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj4ke3RvZG8uZG9uZSA/IFwiY2hlY2tlZF9jaXJjbGVcIiA6IFwicmFkaW9fYnV0dG9uX3VuY2hlY2tlZFwifTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgICBpdGVtLmlubmVySFRNTCA9IEhUTUxTbmlwcGV0O1xyXG4gICAgcmV0dXJuIGl0ZW07XHJcbn07XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUb2RvTGlzdChhcnJheSwgaW5kZXgpIHtcclxuICAgIGNvbnN0IHRvZG9MaXN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3RzJyk7XHJcbiAgICB0b2RvTGlzdHNEaXYuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgIGNvbnNvbGUubG9nKGluZGV4KTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheVtpbmRleF0ubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNyZWF0ZVRvZG8oYXJyYXlbaW5kZXhdLmxpc3RbaV0sIGkpKTtcclxuICAgIH1cclxuICAgIHRvZG9MaXN0c0Rpdi5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QocHJvamVjdCwgaW5kZXgpIHtcclxuICAgIC8vIGNvbnN0IG5ld1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIC8vIGNvbnN0IEhUTUxTbmlwcGV0ID0gYFxyXG4gICAgLy8gICAgIDxidXR0b24gY2xhc3M9XCJsaW5rLWJ0biBwcm9qZWN0LWJ0blwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIiBvbmNsaWNrPVwiZGlzcGxheVRvZG9MaXN0cygke2luZGV4fSlcIj4ke3Nhbml0aXplKHByb2plY3QubmFtZSl9PC9idXR0b24+XHJcbiAgICAvLyBgO1xyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnbGluay1idG4nLCAncHJvamVjdC1idG4nKTtcclxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpO1xyXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgcmV0dXJuIGJ1dHRvbjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NyZWF0ZVRvZG8sIGNyZWF0ZVByb2plY3QsIHVwZGF0ZVRvZG9MaXN0fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0TWFrZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgcHJpb3JpdHkpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtuYW1lLCBwcmlvcml0eX0pO1xyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2FuaXRpemUoaW5wdXQpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnRleHRDb250ZW50ID0gaW5wdXQ7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufSIsImNvbnN0IHRoZW1lU3dpdGNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT10aGVtZS1zd2l0Y2hdJyk7XHJcbmNvbnN0IHNpZGViYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZS1iYXItdG9nZ2xlJyk7XHJcblxyXG4vLyBNYXRjaCB1c2VyIFRoZW1lXHJcbmlmKHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcykge1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdkYXJrJyk7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5jaGVja2VkID0gdHJ1ZTtcclxuICAgIHRoZW1lU3dpdGNoQnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBcIkxpZ2h0IE1vZGVcIik7XHJcbn0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2xpZ2h0Jyk7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XHJcbiAgICB0aGVtZVN3aXRjaEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgXCJEYXJrIE1vZGVcIik7XHJcbn1cclxuXHJcbi8vIFRvZ2dsZSBvbiBDbGlja1xyXG50aGVtZVN3aXRjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLChlKSA9PiB7XHJcbiAgICBpZihlLnRhcmdldC5jaGVja2VkKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdkYXJrJyk7XHJcbiAgICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiU3dpdGNoIHRvIExpZ2h0XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ2xpZ2h0Jyk7XHJcbiAgICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCd0aXRsZScsIFwiU3dpdGNoIHRvIERhcmtcIik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuc2lkZWJhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwidGVzdFwiKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1zaWRlLWJhcicpO1xyXG59KSIsImZ1bmN0aW9uIGNoYW5nZVRpdGxlKHRvZG8sIG5ld1RpdGxlKSB7XHJcbiAgICB0b2RvLnRpdGxlID0gbmV3VGl0bGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZURlc2NyaXB0aW9uKHRvZG8sIG5ld0Rlc2NyaXB0aW9uKSB7XHJcbiAgICB0b2RvLmRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVN0YXRlICh0b2RvKSB7XHJcbiAgICB0b2RvLmRvbmUgPSB0b2RvLmRvbmUgPyBmYWxzZSA6IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5ICh0b2RvLCBuZXdQcmlvcml0eSkge1xyXG4gICAgdG9kby5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VEdWVEYXRlICh0b2RvLCBuZXdEYXRlKSB7XHJcbiAgICB0b2RvLmR1ZURhdGUgPSBuZXdEYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VOb3RlcyAodG9kbywgbmV3Tm90ZXMpIHtcclxuICAgIHRvZG8ubm90ZXMgPSBuZXdOb3RlcztcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlSXRlbSAoYXJyYXksIGluZGV4KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge2NoYW5nZVRpdGxlLCBjaGFuZ2VEZXNjcmlwdGlvbiwgY2hhbmdlU3RhdGUsIGNoYW5nZVByaW9yaXR5LCBjaGFuZ2VEdWVEYXRlLCBjaGFuZ2VOb3RlcywgZGVsZXRlSXRlbX07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb01ha2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLCBkb25lLCBwcm9qZWN0KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3R9KTtcclxuICAgIH07XHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcclxuaW1wb3J0ICdtYXRlcmlhbC1zeW1ib2xzL291dGxpbmVkLmNzcyc7XHJcbmltcG9ydCAnLi9tb2R1bGVzL3RoZW1lJnNpZGViYXInO1xyXG5pbXBvcnQgVG9kb01ha2VyIGZyb20gJy4vbW9kdWxlcy90b2RvLW1ha2VyJztcclxuaW1wb3J0IFByb2plY3RNYWtlciBmcm9tICcuL21vZHVsZXMvcHJvamVjdC1tYWtlcic7XHJcbmltcG9ydCBUb2RvRnVuY3Rpb25zIGZyb20gJy4vbW9kdWxlcy90b2RvLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCBEb21GdW5jdGlvbnMgZnJvbSAnLi9tb2R1bGVzL2RvbS1mdW5jdGlvbnMnO1xyXG5cclxuLy8gRE9NIEVsZW1lbnRzXHJcbmNvbnN0IHRvZG9MaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdHMnKTtcclxuY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktcHJvamVjdHMtY29udGFpbmVyJyk7XHJcblxyXG4vLyBJbnB1dHNcclxuY29uc3QgdG9kb0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1jb250YWluZXInKTtcclxuY29uc3QgdG9kb0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRvZG8tZm9ybScpO1xyXG5jb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKTtcclxuY29uc3QgdG9kb0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XHJcbmNvbnN0IHRvZG9EYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKTtcclxuY29uc3QgdG9kb1RpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZScpO1xyXG5jb25zdCB0b2RvUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKTtcclxuY29uc3QgdG9kb05vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGVzJyk7XHJcbmNvbnN0IHRvZG9Qcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcclxuXHJcbi8vIEFkZCBCdXR0b25zXHJcbmNvbnN0IG9wZW5Ub2RvRm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcGVuLXRvZG8tZm9ybS1idG4nKTtcclxuY29uc3QgYWRkVG9kb0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdG9kby1idG4nKTtcclxuXHJcbi8vIFByb2plY3QgQnV0dG9uc1xyXG5jb25zdCBsaW5rQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saW5rLWJ0bicpO1xyXG5cclxuY29uc3QgcHJvamVjdHMgPSBbXHJcbiAgICBuZXcgUHJvamVjdE1ha2VyKFwiSG9tZVwiLCBudWxsKSxcclxuXTtcclxuXHJcbmNvbnN0IGN1cnJlbnRQcm9qZWN0UGFnZSA9IDE7XHJcblxyXG4vLyBBZGQgVG9kbyBJdGVtXHJcbmZ1bmN0aW9uIGFkZFRvZG9JdGVtICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgZG9uZSwgcHJvamVjdCkge1xyXG4gICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvTWFrZXIodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgbm90ZXMsIGRvbmUsIHByb2plY3QpO1xyXG4gICAgY29uc3QgaW5kZXggPSBwcm9qZWN0c1twcm9qZWN0XS5saXN0Lmxlbmd0aDtcclxuICAgIHByb2plY3RzW3Byb2plY3RdLmxpc3QucHVzaChuZXdUb2RvKTtcclxuICAgIHRvZG9MaXN0RGl2LmFwcGVuZENoaWxkKERvbUZ1bmN0aW9ucy5jcmVhdGVUb2RvKG5ld1RvZG8sIGluZGV4KSk7XHJcbn1cclxuXHJcbi8vIEFkZCBQcm9qZWN0XHJcbmZ1bmN0aW9uIGFkZFByb2plY3QgKG5hbWUsIHByaW9yaXR5KSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3RNYWtlcihuYW1lLCBwcmlvcml0eSk7XHJcbiAgICBjb25zdCBpbmRleCA9IHByb2plY3RzLmxlbmd0aDtcclxuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0QnRuID0gRG9tRnVuY3Rpb25zLmNyZWF0ZVByb2plY3QobmV3UHJvamVjdCwgaW5kZXgpO1xyXG4gICAgbmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBEb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIGluZGV4KVxyXG4gICAgfSk7XHJcbiAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnRuKTtcclxufVxyXG5cclxuLy8gUmVtb3ZlIFRvZG8gSXRlbVxyXG5mdW5jdGlvbiByZW1vdmVUb2RvSXRlbSAocHJvamVjdEluZGV4LCBpbmRleCkge1xyXG4gICAgVG9kb0Z1bmN0aW9ucy5kZWxldGVJdGVtKHByb2plY3RzW3Byb2plY3RJbmRleF0ubGlzdCwgaW5kZXgpO1xyXG4gICAgaWYoY3VycmVudFByb2plY3RQYWdlICE9PSAwKSB7XHJcbiAgICAgICAgRG9tRnVuY3Rpb25zLnVwZGF0ZVRvZG9MaXN0KHByb2plY3RzLCBpbmRleCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFJlbW92ZSBQcm9qZWN0XHJcbmZ1bmN0aW9uIHJlbW92ZVByb2plY3QgKGluZGV4KSB7XHJcbiAgICBUb2RvRnVuY3Rpb25zLmRlbGV0ZUl0ZW0ocHJvamVjdHMsIGluZGV4KTtcclxuICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgMCk7XHJcbn1cclxuXHJcbi8vRmlyc3QgUHJvamVjdFxyXG5hZGRQcm9qZWN0KFwiTXkgUHJvamVjdCAxXCIsIDEpO1xyXG5cclxuLy8gVGVzdCBBZGRpbmcgdG9kb1xyXG5hZGRUb2RvSXRlbShcIkNvZGVcIiwgXCI8aW1nIHNyYz0nJz5cIiwgXCIyMDI0LTMtMVwiLCAxLCBcImJsYWggYmxhaCBibGFoXCIsIGZhbHNlLCAwKTtcclxuYWRkVG9kb0l0ZW0oXCJFYXRcIiwgXCJjb2RpbmcgaXMgYmVhdXRpZnVsXCIsIFwiMjAyNC0zLTFcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMCk7XHJcbmFkZFRvZG9JdGVtKFwiU2xlZXBcIiwgXCJjb2RpbmcgaXMgYmVhdXRpZnVsXCIsIFwiMjAyNC0zLTFcIiwgMSwgXCJibGFoIGJsYWggYmxhaFwiLCBmYWxzZSwgMSk7XHJcbmFkZFRvZG9JdGVtKFwiUmVwZWF0XCIsIFwiY29kaW5nIGlzIGJlYXV0aWZ1bFwiLCBcIjIwMjQtMy0xXCIsIDEsIFwiYmxhaCBibGFoIGJsYWhcIiwgZmFsc2UsIDEpO1xyXG5cclxuY29uc29sZS5sb2cocHJvamVjdHMpO1xyXG5cclxuLy8gSW5pdGlhbCBkaXNwbGF5IG9mIHRvLWRvIGl0ZW1zIGZvciB0aGUgZmlyc3QgcHJvamVjdFxyXG5Eb21GdW5jdGlvbnMudXBkYXRlVG9kb0xpc3QocHJvamVjdHMsIDApO1xyXG5cclxuLy8gRXZlbnQgTGlzdGVuZXJzXHJcbm9wZW5Ub2RvRm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIHRvZG9Gb3JtQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRvZG9Gb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG59KTtcclxudG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge2Uuc3RvcFByb3BhZ2F0aW9uKCl9KTtcclxuXHJcbi8vIEFkZCB0b2RvIGl0ZW0gb24gZm9ybSBzdWJtaXRcclxuYWRkVG9kb0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gdG9kb0RhdGUudmFsdWUgKyBcIlRcIiArIHRvZG9UaW1lLnZhbHVlO1xyXG4gICAgY29uc29sZS5sb2codG9kb1Byb2plY3QudmFsdWUpO1xyXG4gICAgYWRkVG9kb0l0ZW0odG9kb1RpdGxlLnZhbHVlLCB0b2RvRGVzY3JpcHRpb24udmFsdWUsIGR1ZURhdGUsIHRvZG9Qcmlvcml0eS52YWx1ZSwgdG9kb05vdGVzLnZhbHVlLCBmYWxzZSwgK3RvZG9Qcm9qZWN0LnZhbHVlKTtcclxufSlcclxuXHJcbmxpbmtCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgIG5hdmlnYXRlTGlzdHMoZSk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBuYXZpZ2F0ZUxpc3RzKGUpIHtcclxuICAgIHN3aXRjaChlLnRhcmdldC50aXRsZSkge1xyXG4gICAgICAgIGNhc2UgXCJIb21lXCI6XHJcbiAgICAgICAgICAgIERvbUZ1bmN0aW9ucy51cGRhdGVUb2RvTGlzdChwcm9qZWN0cywgMCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSG9tZSBpcyBjbGlja2VkXCIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiTXkgUHJvamVjdHNcIjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNeSBQcm9qZWN0cyBpcyBjbGlja2VkXCIpO1xyXG4gICAgICAgICAgICBwcm9qZWN0c0Rpdi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9