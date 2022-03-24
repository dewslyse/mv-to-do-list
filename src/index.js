import './style.scss';

const lists = document.querySelector('.lists');

//Create a task class
class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

class Todos {
  // Retrieve tasks from localStorage
  static retrieveTask() {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    }
    else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
  }

  //Add a to-do
  static addTask(todo) {
    const todos = Todos.retrieveTask();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  //Delete a to-do
  static removeTask(id) {
    const todos = Todos.retrieveTask();
    todos.forEach((todo, index) => {
      if (todo.index === id) {
        todos.splice(index, 1);
      }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
  }

  //Update to-do index
  static updateIndex() {
    const todos = Todos.retrieveTask();
    let i = 0;
    for (let j = 0; j < todos.length; j++) {
      i += 1;
      todos[j].index = i;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

class Actions {
  //Display task on page
  static displayTask() {
    const todos = Todos.retrieveTask();

    todos.forEach((todo) => {
      Actions.addNewTask(todo);
    });
  }

  //Add and new Task
  static addNewTask(todo) {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    listItem.innerHTML = `
        <p class="desc" id="${todo.index}">
          <input type="checkbox" class="todo" name="todo" aria-label="Enter task">
          ${todo.description}
        </p>
    `;

    // const btnElements = document.createElement('div');
    const rmBtn = document.createElement('button');
    rmBtn.classList.add('rm-btn');
    rmBtn.setAttribute('aria-label', 'Delete task');
    rmBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    const span = document.createElement('span');
    span.classList.add('move');
    span.innerHTML = `<i class="fas fa-ellipsis-v">`;

    listItem.appendChild(rmBtn);
    listItem.appendChild(span);

    lists.appendChild(listItem);

    //Remove a task
    rmBtn.addEventListener('click', (e) => {
      Todos.removeTask(todo.index);
      Todos.updateIndex();
      location.reload();
    });
  }

  static resetInput() {
    document.querySelector('#add-item').value = '';
  }
}

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