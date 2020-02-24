const form = document.querySelector('#task-form');
const taskInput  = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-tasks');


// Load Event Listeners function
function loadEventListener() {
  // dom content loaded get task
  document.addEventListener('DOMContentLoaded',getTaskFromLs);
  // Add Task
  form.addEventListener('submit',addTask);

  // remove Task
  taskList.addEventListener('click',removeTask);

  // clear Tasks
  clearTask.addEventListener('click',clearTasks);

  // filter
  filter.addEventListener('keyup',taskFilter);
}

function addTask(e) {
 if(taskInput.value === '' || taskInput.value === null) {
   alert("You did not add any Task");
 } else {
  //  create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';

  // create text node and append ul
  li.appendChild(document.createTextNode(taskInput.value));

  // create link
  const link = document.createElement('a');
  // add class 
  link.className = 'delete-item secondary-content';
  // add html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // append link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // sotre on ls
  storeOnLs(taskInput.value);
  // clear input field when Task Added on collection
  taskInput.value = '';
 }
  
  // stop default behavior
  e.preventDefault();
}

// store on ls
function storeOnLs(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  // set Item in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// get Task From LS
function getTaskFromLs() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
      //  create li element
      const li = document.createElement('li');
      // add class
      li.className = 'collection-item';

      // create text node and append ul
      li.appendChild(document.createTextNode(task));

      // create link
      const link = document.createElement('a');
      // add class 
      link.className = 'delete-item secondary-content';
      // add html
      link.innerHTML = '<i class="fa fa-remove"></i>';

      // append link to li
      li.appendChild(link);

      // append li to ul
      taskList.appendChild(li);
  });
}

// remove Task from Task list
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();

    // remove task from ls
    removeTaskFromLS(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLS(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task) {
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// cleat Tasks
function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear from ls
  clearTaskFromLS();
}
// clear task ls function
function clearTaskFromLS() {
  localStorage.clear();
}



function taskFilter(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
// load Event listenrs execute
loadEventListener();