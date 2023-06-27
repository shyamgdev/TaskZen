const __taskForm__title = document.querySelector('#taskForm-title');
const __taskForm__description = document.querySelector("#taskForm-description");
const __taskForm__error = document.querySelector("#taskForm span");
const __taskForm__btn = document.querySelector("#taskForm-btn");
const __tasks = document.querySelector("#tasks");
const __modal = document.querySelector("#modal");
const __updateTaskSection = document.querySelector("#updateTaskSection");
const __updateTaskSection__title = document.querySelector("#updateTaskSection-title");
const __updateTaskSection__description = document.querySelector("#updateTaskSection-description");

let tasks = [];
let getTasks = localStorage.getItem("Tasks");
if (getTasks != null) {
  tasks = JSON.parse(getTasks);
}

__modal.onclick = () => {
  __updateTaskSection.classList.add("sr-only");
  __modal.classList.add("sr-only");
};

__taskForm__title.onclick = () => {
  __taskForm__error.classList.add("sr-only");
};

__taskForm__description.onclick = () => {
  __taskForm__error.classList.add("sr-only");
};

const displayTasks = () => {
  let data = "";
  tasks.forEach((task, i) => {
    data += `
      <div class="taskCard group shadow-xl p-6 rounded-3xl cursor-pointer hover:shadow w-full sm:max-w-[calc(100%/2-1.25rem)] md:max-w-[calc(100%/3-1.25rem)] xl:max-w-[calc(100%/4-1.25rem)] 2xl:max-w-[calc(100%/4-1.25rem)] h-28">
        <h1 class="taskCard-title truncate" onclick="viewTask(${i})">${task.title}</h1>
        <p class="taskCard-description truncate" onclick="viewTask(${i})">${task.description}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" sr-only group-hover:not-sr-only group-hover:w-6 group-hover:h-6 group-hover:ml-auto" onclick="deleteTask(${i})">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </div>
    `;
  });
  __tasks.innerHTML = data;
};

displayTasks();

function addTask() {
  if (__taskForm__title.value == "" && __taskForm__description.value == "") {
    __taskForm__error.classList.remove("sr-only");
  }
  else {
    tasks.push({ title: __taskForm__title.value, description: __taskForm__description.value });
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    displayTasks();
    __taskForm__title.value = "";
    __taskForm__description.value = "";
  }
};

function viewTask(id) {
  __updateTaskSection.classList.remove("sr-only");
  __modal.classList.remove("sr-only");
  __updateTaskSection__title.innerText = tasks[id].title;
  __updateTaskSection__description.innerText = tasks[id].description;
}

function updateTask(id) {
  tasks.splice(id, 1, { title: __updateTaskSection__title.innerText, description: __updateTaskSection__description.innerText });
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  displayTasks();
}

function deleteTask(id) {
  tasks.splice(id, 1);
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  displayTasks();
  __updateTaskSection.classList.add("sr-only");
  __modal.classList.add("sr-only");
}