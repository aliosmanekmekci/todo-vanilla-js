// Define the initial tasks
let myTasks = [
  { done: false, title: "TODO odevini bitir" },
  { done: false, title: "kod yaz" },
  { done: true, title: "yemek ye" },
];

// Get the necessary elements from the DOM
const addButton = document.getElementById("add-button");
const newTaskInput = document.getElementById("new-task");
const incompleteTasks = document.getElementById("incomplete-tasks");
const completedTasks = document.getElementById("completed-tasks");

function createTodoElement(todoItem) {
  const listItem = document.createElement("li");
  const itemInput = document.createElement("input");
  itemInput.type = "checkbox";

  const itemLabel = document.createElement("label");
  itemLabel.innerText = todoItem.title;

  const editInput = document.createElement("input");
  editInput.type = "text";

  const editButton = createButton("Edit");
  editButton.addEventListener("click", editButtonEventHandler);

  const deleteButton = createButton("Delete");
  deleteButton.addEventListener("click", deleteButtonEventHandler);

  // Append elements to the list item
  if (!todoItem.done) {
    listItem.appendChild(itemInput);
  }
  listItem.appendChild(itemLabel);
  listItem.appendChild(editInput);
  if (!todoItem.done) {
    listItem.appendChild(editButton);
  }
  listItem.appendChild(deleteButton);

  return listItem;
}

// Function to create a button with given text
function createButton(text) {
  const button = document.createElement("button");
  button.innerText = text;
  return button;
}

function checkboxEventHandler(event) {
  const listItem = event.target.parentNode;
  const itemLabel = listItem.querySelector("label");
  const taskIndex = myTasks.findIndex((task) => task.title === itemLabel.innerText);

  if (taskIndex !== -1) {
    myTasks[taskIndex].done = event.target.checked;
  }

  renderTodoList(myTasks);
}

function editButtonEventHandler(event) {
  const listItemElement = event.target.parentNode;
  const input = listItemElement.querySelector('input[type="text"]');
  const todoItem = listItemElement.querySelector("label");
  const currentTodoValue = todoItem.innerText;
  const hasEditModeClass = listItemElement.classList.contains("editMode");
  listItemElement.classList.toggle("editMode");

  if (hasEditModeClass) {
    const todoIndex = myTasks.findIndex((value) => value.title === currentTodoValue);
    myTasks[todoIndex].title = input.value;
    renderTodoList(myTasks);
    event.target.innerText = "Edit";
  } else {
    input.value = currentTodoValue;
    event.target.innerText = "Save";
  }
}

function deleteButtonEventHandler(event) {
  const listItemElement = event.target.parentNode;
  const todoItem = listItemElement.querySelector("label");
  const currentTodoValue = todoItem.innerText;
  const todoIndex = myTasks.findIndex((value) => value.title === currentTodoValue);

  if (todoIndex !== -1) {
    myTasks.splice(todoIndex, 1);
  }

  listItemElement.remove(); // Remove the list item from the DOM
  renderTodoList(myTasks);
}

function flushTodoList() {
  incompleteTasks.innerHTML = "";
  completedTasks.innerHTML = "";
}

function renderTodoList(todoList) {
  flushTodoList();

  for (const currentTodoItem of todoList) {
    const todoElement = createTodoElement(currentTodoItem);

    if (currentTodoItem.done === false) {
      incompleteTasks.appendChild(todoElement);
    } else if (currentTodoItem.done === true) {
      completedTasks.appendChild(todoElement);
    }
  }
}

function addNewTodoItem(title) {
  myTasks.push({ title, done: false });
}

function addEventHandler() {
  const newTaskValue = newTaskInput.value.trim();
  if (!newTaskValue) {
    console.log("give me an input");
    return;
  }
  addNewTodoItem(newTaskValue);
  newTaskInput.value = "";
  renderTodoList(myTasks);
}

function init() {
  addButton.addEventListener("click", addEventHandler);
  newTaskInput.addEventListener("change", addEventHandler);

  incompleteTasks.addEventListener("click", function (event) {
    if (event.target.type === "checkbox") {
      checkboxEventHandler(event);
    }
  });

  renderTodoList(myTasks);
}

// Initialize the todo list
init();
