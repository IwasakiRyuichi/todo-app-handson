const STORAGE_KEY = 'todo-app-tasks';

function loadTasks() {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks(tasks) {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML =
      '<label class="task-item__label">' +
        '<span class="task-item__text">' + escapeHtml(task.text) + '</span>' +
      '</label>';

    list.appendChild(li);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// 初期表示
const tasks = loadTasks();
renderTasks(tasks);
updateFooter(tasks);

const form = document.querySelector('.task-form__inner');
const input = document.getElementById('task-input');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const tasks = loadTasks();
  tasks.push({ id: Date.now(), text: text });
  saveTasks(tasks);
  renderTasks(tasks);
  updateFooter(tasks);

  input.value = '';
});

function updateFooter(tasks) {
  const footer = document.getElementById('footer-text');
  footer.textContent = tasks.length + '件のタスク';
}
