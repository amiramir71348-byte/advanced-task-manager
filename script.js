if(localStorage.getItem("loggedIn") !== "true"){
  window.location.href = "login.html";
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const darkBtn = document.getElementById("darkBtn");

function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}

function renderTasks(){

  taskList.innerHTML = "";

  let completed = 0;

  tasks.forEach((task,index)=>{

    if(task.completed){
      completed++;
    }

    let li = document.createElement("li");

    li.innerHTML = `

      <div>

        <h3 class="${
          task.completed ? "completed" : ""
        }">

          ${task.text}

        </h3>

        <br>

        <small>
          📅 Added:
          ${task.addedDate}
        </small>

        <br>

        <small>
          ✅ Completed:
          ${
            task.completedDate
            ? task.completedDate
            : "Not Completed"
          }
        </small>

      </div>

      <div>

        <button onclick="toggleTask(${index})">
          ✔
        </button>

        <button onclick="deleteTask(${index})">
          ❌
        </button>

      </div>

    `;

    taskList.appendChild(li);

  });

  totalTasks.innerText = tasks.length;

  completedTasks.innerText = completed;

  pendingTasks.innerText =
    tasks.length - completed;

}

function addTask(){

  let text = taskInput.value.trim();

  if(text === ""){

    alert("Enter Task");

    return;
  }

  let today =
    new Date().toLocaleString();

  tasks.push({

    text:text,

    completed:false,

    addedDate: today,

    completedDate: ""

  });

  saveTasks();

  renderTasks();

  taskInput.value = "";

}

function toggleTask(index){

  tasks[index].completed =
    !tasks[index].completed;

  if(tasks[index].completed){

    tasks[index].completedDate =
      new Date().toLocaleString();

  } else {

    tasks[index].completedDate = "";

  }

  saveTasks();

  renderTasks();

}

function deleteTask(index){

  tasks.splice(index,1);

  saveTasks();

  renderTasks();

}

addBtn.addEventListener(
  "click",
  addTask
);

darkBtn.addEventListener(
  "click",
  ()=>{

    document.body.classList.toggle("dark");

  }
);

renderTasks();          