
function Task(description) {
    this.description = description;
    this.completed = false;
}
  
function getTasksFromStorage() {
  const tasksJSON = localStorage.getItem('tasks');
  if (tasksJSON) {
    return JSON.parse(tasksJSON);
  }
    return [];
}
  
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
  

function displayTasks() {
  const tasks = getTasksFromStorage();
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // Clear existing list
  
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasksToStorage(tasks);
      displayTasks();
    });
  
    const label = document.createElement('label');
    label.textContent = task.description;
  
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    todoList.appendChild(listItem);
  
    if (task.completed) {
      listItem.classList.add('completed');
    }
  });
}
  
const addTaskButton = document.getElementById('add-task');
addTaskButton.addEventListener('click', () => {
  const newTaskInput = document.getElementById('new-task');
  const newTaskDescription = newTaskInput.value.trim();
  
  if (newTaskDescription) {
    const tasks = getTasksFromStorage();
    tasks.push(new Task(newTaskDescription));
    saveTasksToStorage(tasks);
    displayTasks();
    newTaskInput.value = ''; 
  }
});
  
 displayTasks();
  