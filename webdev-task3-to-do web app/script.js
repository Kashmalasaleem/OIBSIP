const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// AFTER ENTERING TASK AND CLICKING ADD BUTTON THE FOLLOWING THINGS MUST HAPPEN
////////////////////
addTask.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const task = document.createElement("p");
  task.classList.add("task-text");
  task.textContent = taskText;

  const time = document.createElement("small");
  time.textContent = new Date().toLocaleString();

  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete";
  ////////////////////

  // IF THE CHECKBOX INN PENDING BECOMES CHECK THEN TASK IS COMPLETED ELSE PENDING
  ///////////////////////////////////////////////////////////////////
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      task.classList.add("completed");
      completedTasks.appendChild(taskItem);
    } else {
      task.classList.remove("completed");

      pendingTasks.appendChild(taskItem);
    }
    checkEmptyLists();

    pendingCount.textContent = `${pendingTasks.querySelectorAll(".task-item").length} pending`;

    completedCount.textContent = `${completedTasks.querySelectorAll(".task-item").length} completed`;
  });
  ///////////////////////////////////////////////////////////////////

  // MAKING THE DELETE BUTTON TO WORK
  //////////////////////////////////
  deleteButton.addEventListener("click", function () {
    taskItem.remove();
    saveTasks();
    checkEmptyLists();
    completedCount.textContent = `${completedTasks.querySelectorAll(".task-item").length} completed`;
    pendingCount.textContent = `${pendingTasks.querySelectorAll(".task-item").length} pending`;
  });
  //////////////////////////////////

  // MAKING THE EDIT BUTTON TO WORK AND EDIT THE TESK
  ///////////////////////////////////////////////////
  editButton.addEventListener("click", function () {
    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.value = task.textContent;
    editInput.classList.add("edit-input");

    const saveButton = document.createElement("button");

    saveButton.textContent = "Save";
    saveButton.classList.add("edit");

    task.replaceWith(editInput);
    editButton.replaceWith(saveButton);

    saveButton.addEventListener("click", function () {
      const newTaskText = editInput.value.trim();

      if (newTaskText === "") {
        return;
      }

      task.textContent = newTaskText;

      editInput.replaceWith(task);
      saveButton.replaceWith(editButton);
      saveTasks();
      checkEmptyLists();
    });
  });

  ///////////////////////////////////////////////////

  // ADDING THE TASKITEM ON CLICKING ADD BUTTON
  taskItem.append(checkbox, task, time, editButton, deleteButton);
  pendingTasks.appendChild(taskItem);
  pendingCount.textContent = `${pendingTasks.querySelectorAll(".task-item").length} pending`;

  taskInput.value = "";
  saveTasks();
  checkEmptyLists();
});
///////////////////////////////////////////////////////////////////

// SAVING OUR TASK EVEN AFTER REFRESHING THE PAGE
////////////////////////////////////////////////
function saveTasks() {
  const tasks = [];

  document.querySelectorAll(".task-item").forEach(function (taskItem) {
    const task = taskItem.querySelector(".task-text");
    const time = taskItem.querySelector("small");

    tasks.push({
      text: task.textContent,
      time: time.textContent,
      completed: taskItem.parentElement === completedTasks,
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
////////////////////////////////////////////////

// LOADING THE SAVED TASKS NOW WHEN I OPEN THE PAGE
//////////////////////////////////////////////////
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(function (savedTask) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = savedTask.completed;

    const task = document.createElement("p");
    task.classList.add("task-text");
    task.textContent = savedTask.text;

    const time = document.createElement("small");

    time.textContent = savedTask.time;

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";

    if (savedTask.completed) {
      task.classList.add("completed");
      completedTasks.appendChild(taskItem);
    } else {
      pendingTasks.appendChild(taskItem);
    }

    taskItem.append(checkbox, task, editButton, deleteButton);

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        task.classList.add("completed");
        completedTasks.appendChild(taskItem);
      } else {
        task.classList.remove("completed");
        pendingTasks.appendChild(taskItem);
      }

      pendingCount.textContent = `${pendingTasks.querySelectorAll(".task-item").length} pending`;

      completedCount.textContent = `${completedTasks.querySelectorAll(".task-item").length} completed`;

      saveTasks();
    });

    deleteButton.addEventListener("click", function () {
      taskItem.remove();

      pendingCount.textContent = `${pendingTasks.querySelectorAll(".task-item").length} pending`;

      completedCount.textContent = `${completedTasks.querySelectorAll(".task-item").length} completed`;

      saveTasks();
    });

    editButton.addEventListener("click", function () {
      const editInput = document.createElement("input");

      editInput.type = "text";
      editInput.value = task.textContent;
      editInput.classList.add("edit-input");

      const saveButton = document.createElement("button");

      saveButton.textContent = "Save";
      saveButton.classList.add("edit");

      task.replaceWith(editInput);
      editButton.replaceWith(saveButton);

      saveButton.addEventListener("click", function () {
        const newTaskText = editInput.value.trim();

        if (newTaskText === "") {
          return;
        }

        task.textContent = newTaskText;

        editInput.replaceWith(task);
        saveButton.replaceWith(editButton);

        saveTasks();
      });
    });
  });

  pendingCount.textContent = `${pendingTasks.querySelectorAll(".task-item").length} pending`;

  completedCount.textContent = `${completedTasks.querySelectorAll(".task-item").length} completed`;
}

//////////////////////////////////////////////////

// ADDING A MESSAGE IF THE TASKS ARE EMPTY BOTH PENDING AND COMPLETED
////////////////////////////////////////////////////////

function checkEmptyLists() {
  if (pendingTasks.querySelectorAll(".task-item").length === 0) {
    pendingTasks.innerHTML = "<p class='empty-message'>No tasks yet!</p>";
  } else {
    const message = pendingTasks.querySelector(".empty-message");

    if (message) {
      message.remove();
    }
  }

  if (completedTasks.querySelectorAll(".task-item").length === 0) {
    completedTasks.innerHTML =
      "<p class='empty-message'>No completed tasks yet!</p>";
  } else {
    const message = completedTasks.querySelector(".empty-message");

    if (message) {
      message.remove();
    }
  }
}

loadTasks();
checkEmptyLists();
///////////////////////////////////////////
