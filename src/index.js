import './style.scss';
import 'material-symbols/outlined.css';
import './theme';
import TodoMaker from './todo-maker';
import TodoFunctions from './todo-functions';
import DomFunctions from './dom-functions';

const todoListsContainer = document.querySelector('.todo-lists');

const todoList = [];

const todoListDiv = document.querySelector('.todo-lists');



function addTodoItem (title, description, dueDate, priority, notes, done) {
    const newTodo = new TodoMaker(title, description, dueDate, priority, notes, done);
    const index = todoList.length;
    todoList.push(newTodo);
    todoListDiv.appendChild(DomFunctions.createTodo(newTodo, index));
}

addTodoItem("Code", "coding is beautiful", "2024-3-1", 1, "blah blah blah", false);


