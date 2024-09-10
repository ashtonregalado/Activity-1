interface Task {
  text: string;
  date: string;
  time: string;
  completed: boolean;
}

let originalTasks: Task[] = [];


function saveTasksToLocalStorage(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage(): Task[] {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}


function renderTask(taskData: Task) {
  let view = document.getElementById("view");
  if (!view) return;

  let space = document.createElement("br")

  let task = document.createElement("li");
  task.style.marginBottom = "5px";
  task.style.listStyleType = "none";

  let task_container = document.createElement("div");
  task_container.classList.add("task_container_style");

  let date_time_container = document.createElement("div")
  date_time_container.classList.add("date_time_container_style")


  let node = document.createTextNode(taskData.text);
  let node_container = document.createElement("div");
  node_container.classList.add("node_container_style");

  let date_node = document.createElement("span");
  date_node.textContent = taskData.date;
  date_node.classList.add("task_date");

  let time_node = document.createElement("span");
  time_node.textContent = taskData.time;
  time_node.classList.add("task_time");

  let reminder = document.createElement("p");
  reminder.classList.add("p_style");
  reminder.textContent = "Task Due:";

  let doneButton = document.createElement("input");
  doneButton.type = "checkbox";
  doneButton.style.marginLeft = "10px";
  doneButton.style.marginRight = "10px";
  doneButton.checked = taskData.completed;

  
  function updateCheckboxColor() {
    if (doneButton.checked) {
      doneButton.style.accentColor = "cadetblue"
    } else {
      doneButton.style.accentColor = "white"
    }
  }

  updateCheckboxColor()


  function updateTaskStyle () {
    if (taskData.completed) {
      task_container.style.backgroundColor = "lightgray"
    } else if (new Date(`${taskData.date} ${taskData.time} `) < new Date() ) {
      task_container.style.backgroundColor = "lightgray"
    }else {
      task_container.style.backgroundColor = "white"
    }

  }


  updateTaskStyle()


  
  doneButton.addEventListener("change", () => {
    const taskIndex = originalTasks.findIndex(t => t.text === taskData.text);
    if (taskIndex !== -1) {
      originalTasks[taskIndex].completed = doneButton.checked;
      
      saveTasksToLocalStorage(originalTasks);
      taskData.completed = doneButton.checked;
      updateTaskStyle(); 
      updateCheckboxColor()
    }
  });


  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.style.marginLeft = "10px";

  removeButton.addEventListener("click", () => {
    view.removeChild(task);
    originalTasks = originalTasks.filter(t => t.text !== taskData.text);
    saveTasksToLocalStorage(originalTasks);
  });

  node_container.appendChild(node)
  date_time_container.appendChild(date_node)
  date_time_container.appendChild(space)
  date_time_container.appendChild(time_node)
  task_container.appendChild(doneButton)
  task_container.appendChild(node_container);
  task_container.appendChild(reminder)
  task_container.appendChild(date_time_container);
  task_container.appendChild(removeButton);
  task.appendChild(task_container);
  view.appendChild(task);
}


function handle_function() {
  let inputText = (document.getElementById("myText") as HTMLInputElement).value;
  if (!inputText.trim()) return;

  let dateText = (document.getElementById("setDate") as HTMLInputElement).value;
  let timeText = (document.getElementById("setTime") as HTMLInputElement).value;
  let formattedDate = "";
  let formattedTime = "";

  if (dateText) {
    let date = new Date(dateText);
    formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  if (timeText) {
    let [hours, minutes] = timeText.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  let newTask: Task = { text: inputText, date: formattedDate, time: formattedTime, completed: false };
  originalTasks.push(newTask);
  saveTasksToLocalStorage(originalTasks);
  renderTask(newTask);

  
  (document.getElementById("myText") as HTMLInputElement).value = "";
  (document.getElementById("setDate") as HTMLInputElement).value = "";
  (document.getElementById("setTime") as HTMLInputElement).value = "";
}


function sortTasks() {
  let view = document.getElementById("view");
  if (!view) return;

  let tasks = Array.from(view.getElementsByTagName("li"));

  tasks.sort((a, b) => {
    let dateA = a.querySelector(".task_date")?.textContent || '';
    let dateB = b.querySelector(".task_date")?.textContent || '';

    let timeA = a.querySelector(".task_time")?.textContent || '';
    let timeB = b.querySelector(".task_time")?.textContent || '';

    let dateTimeA = new Date(`${dateA} ${timeA}`);
    let dateTimeB = new Date(`${dateB} ${timeB}`);

    return dateTimeB.getTime() - dateTimeA.getTime(); 
  });

  tasks.forEach(task => view.appendChild(task));
}


function resetSort() {
  let view = document.getElementById("view");
  if (!view) return;

  view.innerHTML = "";
  originalTasks.forEach(task => renderTask(task));
}


window.onload = () => {
  originalTasks = loadTasksFromLocalStorage();
  originalTasks.forEach(task => renderTask(task));
};

document.getElementById("sort")?.addEventListener("click", sortTasks);
document.getElementById("reset")?.addEventListener("click", resetSort);

(window as any).handle_function = handle_function;




