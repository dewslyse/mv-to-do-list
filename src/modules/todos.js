export default class Todos {
  // Retrieve tasks from localStorage
  static retrieveTask = () => {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
  }

  // Add a to-do
  static addTask = (todo) => {
    const todos = Todos.retrieveTask();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Delete a to-do
  static removeTask = (id) => {
    const todos = Todos.retrieveTask();
    todos.forEach((todo, index) => {
      if (todo.index === id) {
        todos.splice(index, 1);
      }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Update to-do index
  static updateIndex = () => {
    const todos = Todos.retrieveTask();
    let i = 0;
    for (let j = 0; j < todos.length; j += 1) {
      i += 1;
      todos[j].index = i;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Update to-do description
  static updateTodo = (value, todo) => {
    const todos = Todos.retrieveTask();
    todos[todo.index - 1].description = value;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Update completion status
  static updateStatus = (value, todo) => {
    const todos = Todos.retrieveTask();
    todos[todo.index - 1].completed = value;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Reset todo list
  static resetAll = () => {
    localStorage.clear();
  }

  // Clear completed
  static removeCompleted = () => {
    let todos = Todos.retrieveTask();
    todos.forEach(() => {
      todos = todos.filter((todo) => todo.completed !== true);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    Todos.updateIndex();
  }
}