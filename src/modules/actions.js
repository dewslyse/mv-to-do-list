import Todos from './todos.js';

const lists = document.querySelector('.lists');
const form = document.querySelector('.form');
const container = document.querySelector('.container');

export default class Actions {
  // Display task on page
  static displayTask = () => {
    const todos = Todos.retrieveTask();

    todos.forEach((todo) => {
      Actions.addNewTask(todo);
    });
  }

  // Add and new Task
  static addNewTask = (todo) => {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');

    const p = document.createElement('p');
    p.classList.add('desc');
    p.id = `${todo.index}`;

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('checkbox');
    check.setAttribute('aria-label', 'Mark as done');
    check.checked = todo.completed;

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('editable');
    taskDescription.innerText = `${todo.description}`;
    taskDescription.setAttribute('contenteditable', 'true');

    const rmBtn = document.createElement('button');
    rmBtn.classList.add('rm-btn');
    rmBtn.classList.add('hidden');
    rmBtn.setAttribute('aria-label', 'Delete task');
    rmBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    const mvbtn = document.createElement('span');
    mvbtn.classList.add('move');
    mvbtn.innerHTML = '<i class="fas fa-ellipsis-v">';

    p.appendChild(check);
    p.appendChild(taskDescription);

    listItem.appendChild(p);
    listItem.appendChild(rmBtn);
    listItem.appendChild(mvbtn);

    lists.appendChild(listItem);

    // Remove a task
    rmBtn.addEventListener('click', () => {
      Todos.removeTask(todo.index);
      Todos.updateIndex();
      window.location.reload();
    });

    // Update todo text
    taskDescription.addEventListener('click', () => {
      listItem.classList.toggle('edit');
      rmBtn.classList.toggle('hidden');
    });

    taskDescription.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        listItem.classList.toggle('edit');
        rmBtn.classList.toggle('hidden');
        const item = e.target.innerText;
        Todos.updateTodo(item, todo);
        taskDescription.blur();
      }
    });

    // Change the status of a task
    check.addEventListener('change', (e) => {
      let state;
      if (e.target.checked) {
        state = true;
        Todos.updateStatus(state, todo);
      } else {
        state = false;
        Todos.updateStatus(state, todo);
      }
    });
  }

  // Show alerts
  static alerts(msg, className) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${className}`;
    const alertMsg = document.createTextNode(msg);
    alertBox.appendChild(alertMsg);
    container.insertBefore(alertBox, form);
    setTimeout(() => alertBox.remove(), 1750);
  }

  // Clear input fields
  static resetInput = () => {
    document.querySelector('#add-item').value = '';
  }
}