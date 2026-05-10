let todos = [];
let nextId = 1;

const taskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const clearAllBtn = document.getElementById("clear-all-btn");

function renderTasks() {

  taskList.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {

    const task = todos[i];

    const listItem = document.createElement("li");
    listItem.className = "task-item";

    if (task.completed) {
      listItem.classList.add("completed");
    }

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.className = "complete-btn";

    completeBtn.addEventListener("click", function () {
      toggleComplete(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    listItem.appendChild(taskText);
    listItem.appendChild(completeBtn);
    listItem.appendChild(deleteBtn);

    taskList.appendChild(listItem);
  }
}

function addTask() {

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    taskInput.focus();
    return;
  }

  const newTask = {
    id: nextId++,
    text: taskText,
    completed: false
  };

  todos.push(newTask);

  taskInput.value = "";

  renderTasks();
}

function deleteTask(id) {

  todos = todos.filter(function (task) {
    return task.id !== id;
  });

  renderTasks();
}

function toggleComplete(id) {

  for (let i = 0; i < todos.length; i++) {

    if (todos[i].id === id) {

      todos[i].completed = !todos[i].completed;
      break;
    }
  }

  renderTasks();
}

function clearAll() {

  if (todos.length === 0) {
    return;
  }

  todos = [];

  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {

  if (e.key === "Enter") {
    addTask();
  }
});

clearAllBtn.addEventListener("click", clearAll);

renderTasks();