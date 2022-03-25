import './style.scss';
import Task from './modules/task';
import Actions from './modules/actions';
import Todos from './modules/todos';

//Display tasks from localStorage
document.addEventListener('DOMContentLoaded', Actions.displayTask);

//Add a new task from input form
const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const todos = Todos.retrieveTask();
  const todoText = document.querySelector('#add-item').value;
  const completed = false;
  const index = todos.length + 1;

  if (todoText.trim() === '') {
    alert('Please add a task');
  }
  else {
    const todo = new Task(todoText, completed, index);

    Actions.addNewTask(todo);
    Todos.addTask(todo);
    Actions.resetInput();
  }
});

//Remove all todos from page
const resetBtn = document.querySelector('.fa-sync-alt')
resetBtn.addEventListener('click', () => {
  Todos.resetAll();
  location.reload();
});