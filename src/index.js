import './style.scss';
import Task from './modules/task.js';
import Actions from './modules/actions.js';
import Todos from './modules/todos.js';

// Display tasks from localStorage
document.addEventListener('DOMContentLoaded', Actions.displayTask);

// Add a new task from input form
const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const todos = Todos.retrieveTask();
  const todoText = document.querySelector('#add-item').value;
  const completed = false;
  const index = todos.length + 1;

  if (todoText.trim() === '') {
    alert('Please add a task');
  } else {
    const todo = new Task(todoText, completed, index);

    Actions.addNewTask(todo);
    Todos.addTask(todo);
    Actions.resetInput();
  }
});

// Remove all todos from page
const resetBtn = document.querySelector('.fa-sync-alt');
resetBtn.addEventListener('click', () => {
  Todos.resetAll();
  window.location.reload();
});

const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => {
  Todos.removeCompleted();
  window.location.reload();
});