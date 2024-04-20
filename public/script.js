import { createTask, removeTask, toggleTaskCompletion, loadTasksForDay } from "./data.js";
import { signUpUser, signInUser, signOutUser, onAuthStateChanged } from "./auth.js";

const newTaskInput = document.querySelector("#task-input");
const daySelect = document.querySelector("#day-select");
const viewDaySelect = document.querySelector("#view-day-select");
const tasksDiv = document.querySelector("#tasks");
let userId;

onAuthStateChanged((user) => {
  if (user) {
    userId = user.uid;
    viewDaySelect.addEventListener("change", () => {
      const selectedDay = viewDaySelect.value;
      displayTasks(userId, selectedDay);
    });
    displayTasks(userId, viewDaySelect.value);
  } else {
    console.log("No user is signed in");
  }
});

function displayTasks(userId, day) {
  tasksDiv.innerHTML = "";
  loadTasksForDay(userId, day)
    .then(tasks => {
      tasks.forEach(task => {
        const taskDiv = createTaskDiv(task, userId, day);
        tasksDiv.appendChild(taskDiv);
      });
    })
    .catch(error => {
      console.error("Failed to load tasks: ", error);
      alert("Failed to load tasks");
    });
}

function createTaskDiv(task, userId, day) {
  const taskDiv = document.createElement("div");
  taskDiv.textContent = task.name;
  taskDiv.classList.add("task");
  if (task.completed) {
    taskDiv.classList.add("completed");
  }
  taskDiv.addEventListener("click", () => toggleTask(task.id, day, task.completed, userId));

  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", (e) => {
    e.stopPropagation();
    editTask(task.id, day, task.name, userId);
  });
  taskDiv.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTask(task.id, userId, day);
  });
  taskDiv.appendChild(deleteButton);

  return taskDiv;
}

function editTask(taskId, day, taskName, userId) {
  const updatedTaskName = prompt("Enter the updated task name:", taskName);
  if (updatedTaskName) {
    updateTask(taskId, day, updatedTaskName, userId);
  }
}

async function updateTask(taskId, day, taskName, userId) {
  try {
    await removeTask(userId, day, taskId);
    await createTask(userId, day, taskName);
    displayTasks(userId, day);
  } catch (error) {
    console.error("Failed to update task: ", error);
    alert("Failed to update task");
  }
}

async function deleteTask(taskId, userId, day) {
  try {
    await removeTask(userId, day, taskId);
    displayTasks(userId, day);
  } catch (error) {
    console.error("Failed to delete task: ", error);
    alert("Failed to delete task");
  }
}

async function toggleTask(taskId, day, completed, userId) {
  try {
    await toggleTaskCompletion(userId, day, taskId, completed);
    displayTasks(userId, day);
  } catch (error) {
    console.error("Failed to toggle task completion: ", error);
    alert("Failed to toggle task completion");
  }
}

document.querySelector("#push").addEventListener("click", async () => {
  if (newTaskInput.value.length === 0) {
    alert("Please Enter A Task");
    return;
  }

  const taskName = newTaskInput.value;
  const day = daySelect.value;

  try {
    await createTask(userId, day, taskName);
    newTaskInput.value = "";
    displayTasks(userId, day);
  } catch (error) {
    console.error("Failed to add task: ", error);
    alert("Failed to add task");
  }
});

const images = [
  'earlyMorn.png',
  'earlyMorning.png',
  'sunCloud.png',
  'sunny.png',
  'afternoon.png',
  'dusk.png',
  'purpleSky.png',
  'lateEvening.png',
  'evening.png',
  'night.jpg',
  'nightSky.jpg',
  'rain.jpg',
  'overcast.png'
];

let currentIndex = 0;

function preloadImages(urls) {
  const promises = [];
  urls.forEach(url => {
    const img = new Image();
    const promise = new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    img.src = url;
    promises.push(promise);
  });
  return Promise.all(promises);
}

function rotateBackgroundImage() {
  document.body.style.backgroundImage = `url(${images[currentIndex]})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';

  currentIndex = (currentIndex + 1) % images.length;
}

preloadImages(images).then(() => {
  console.log('All images have been preloaded.');

  rotateBackgroundImage();

  setInterval(rotateBackgroundImage, 12000);
}).catch(error => {
  console.error('Error preloading images:', error);
});

const tooltip = document.querySelector('.tooltip');
const tooltipText = document.querySelector('#tooltiptext');

function toggleTooltip() {
  tooltipText.style.display = (tooltipText.style.display === 'block') ? 'none' : 'block';
}

tooltip.addEventListener('click', toggleTooltip);
