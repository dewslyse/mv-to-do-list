import './style.scss';

const todos = [
  {
    description: 'Create To Do project',
    completed: true,
    index: '1',
  },
  {
    description: 'Set up GitHub Actions',
    completed: true,
    index: '2',
  },
  {
    description: 'Set up webpack',
    completed: true,
    index: '3',
  },
  {
    description: 'Complete milestone 1 of To Do project',
    completed: false,
    index: '4',
  },
];

// Add Todos to page
const item = (todo) => `
    <div class="list-item">
      <div class="todo-item">
          <input type="checkbox" id="todo" class="todo" name="todo">
          <label class="desc" for="todo">${todo.description}</label>
      </div>
      <span><i class="fas fa-ellipsis-v"></i></span>
    </div>
  `;

const lists = document.querySelector('.lists');

lists.innerHTML = `
  ${todos.map(item).join('')}
`;