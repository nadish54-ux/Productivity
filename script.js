// Live Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("clock").textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// To-Do List
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const tasks = getTasksFromStorage();
  tasks.push({ text: taskText, completed: false });
  saveTasksToStorage(tasks);
  renderTasks();
  input.value = "";
}

function toggleComplete(span) {
  const index = span.parentElement.dataset.index;
  const tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  renderTasks();
}

function deleteTask(button) {
  const index = button.parentElement.dataset.index;
  const tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
  renderTasks();
}

function getTasksFromStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasksFromStorage();
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleComplete(this)">${task.text}</span>
      <button onclick="deleteTask(this)">❌</button>
    `;

    taskList.appendChild(li);
  });
}

// Call render on page load
window.onload = function () {
  // Load saved notes
  const savedNote = localStorage.getItem("note");
  if (savedNote) {
    document.getElementById("noteArea").value = savedNote;
  }

  // Load tasks
  renderTasks();
};

// Notes App
function saveNote() {
  const note = document.getElementById("noteArea").value;
  if (note === "") {
    alert("Please write something before saving!");
    return;
  }
  localStorage.setItem("note", note);
  alert("Note saved!");
}

// Load saved note on start
window.onload = function () {
  const savedNote = localStorage.getItem("note");
  if (savedNote) {
    document.getElementById("noteArea").value = savedNote;
  }
}

// Theme Switcher
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};
