const addButton = document.getElementById('criar-tarefa');
const clearButton = document.getElementById('apaga-tudo');
const clearCompletedButton = document.getElementById('remover-finalizados');
const inputTasks = document.getElementById('texto-tarefa');
const listTasks = document.getElementById('lista-tarefas');
const saveButton = document.getElementById('salvar-tarefas');
const upButton = document.getElementById('mover-cima');
const downButton = document.getElementById('mover-baixo');
const deletButton = document.getElementById('remover-selecionado');

function AddSelectedClassToListItem(event) {
  const task = event.target;
  const className = 'task-selected';
  const lastTask = document.getElementsByClassName(className);
  if (lastTask[0]) {
    lastTask[0].classList.remove(className);
  }
  task.classList.add(className);
}

function addRemoveCompletedClassToListItem(event) {
  const task = event.target;
  if (task.className.match(/completed/) !== null) {
    task.classList.remove('completed');
  } else {
    task.classList.add('completed');
  }
}

function addEventToList(listElement) {
  listElement.addEventListener('click', AddSelectedClassToListItem);
  listElement.addEventListener('dblclick', addRemoveCompletedClassToListItem);
}

function addTask() {
  if (inputTasks.value) {
    const taskToList = document.createElement('li');
    addEventToList(taskToList);
    taskToList.innerText = inputTasks.value;
    listTasks.appendChild(taskToList);
    inputTasks.value = '';
  } else {
    alert('Digite uma tarefa antes de adicionar');
  }
}

addButton.addEventListener('click', addTask);

function clearTasks() {
  const tasks = listTasks.children;
  for (let index = tasks.length - 1; index > -1; index -= 1) {
    const task = tasks[index];
    task.parentNode.removeChild(task);
  }
}

clearButton.addEventListener('click', clearTasks);

function clearComplete() {
  const tasks = document.getElementsByClassName('completed');
  for (let index = tasks.length - 1; index > -1; index -= 1) {
    const task = tasks[index];
    task.parentNode.removeChild(task);
  }
}

clearCompletedButton.addEventListener('click', clearComplete);

function getSelectedTask() {
  const selectedTask = document.querySelector('.task-selected');
  return selectedTask;
}

function moveTaskUp() {
  const currentTask = getSelectedTask();
  const tasks = listTasks.children;
  for (let index = 1; index < tasks.length; index += 1) {
    if (tasks[index] === currentTask) {
      listTasks.insertBefore(currentTask, tasks[index - 1]);
      break;
    }
  }
}

upButton.addEventListener('click', moveTaskUp);

function moveTaskDown() {
  const currentTask = getSelectedTask();
  const tasks = listTasks.children;
  for (let index = 0; index < tasks.length - 1; index += 1) {
    if (tasks[index] === currentTask) {
      listTasks.insertBefore(currentTask, tasks[index + 2]);
      break;
    }
  }
}

downButton.addEventListener('click', moveTaskDown);

function deletSelectedTask() {
  const selected = getSelectedTask();
  if (selected !== null) {
    selected.parentNode.removeChild(selected);
  }
}

deletButton.addEventListener('click', deletSelectedTask);

function removeSave() {
  localStorage.tasks = '';
  localStorage.finishedTasks = '';
}

function saveTasks() {
  removeSave()
  let tasks = listTasks.children;
  let allTasks = []
  let finishedTasks = []
  for (let index = 0; index < tasks.length; index += 1) {
    let task = tasks[index]
    if (/completed/.test(task.className)) {
      finishedTasks.push(task.innerText)
    } else {
      finishedTasks.push('')
    }
    allTasks.push(task.innerText)
  }
  localStorage.tasks = allTasks;
  localStorage.finishedTasks = finishedTasks;
}

saveButton.addEventListener('click', saveTasks);

function loadTaskList() {
  if (localStorage.tasks != '') {
    const tasks = localStorage.tasks.split(',');
    tasks.forEach(element => {
      const listItem = document.createElement('li');
      listItem.innerText = element;
      addEventToList(listItem);
      listTasks.appendChild(listItem);
    });
  }
}

function loadCompletedTasks() {
  const completedTasks = localStorage.finishedTasks.split(',');
  const tasks = listTasks.children;
  for (let index = 0; index < tasks.length; index += 1) {
    if (completedTasks[index] != '') {
      const listItem = tasks[index];
      listItem.classList.add('completed');
    }
  }
}

function load() {
  loadTaskList();
  loadCompletedTasks();
}

window.onload = load;

function chosePerson() {
  let task = document.querySelectorAll('.task-selected')[0]
  if (task) {
    task.classList.remove('task-selected')
  }
  let people = listTasks.children
  if (people.length > 0) {
    let index = Math.trunc(Math.random() * (people.length + 0.9 - 1))
    people[index].classList.add('task-selected')
  }
}

function lotteryMode() {
  let btnSortear = document.createElement('button')
  clearTasks()
  let buttons = document.querySelector('#buttons');
  buttons.innerHTML = ''
  btnSortear.innerText = 'sortear'
  buttons.appendChild(btnSortear)
  buttons.addEventListener('click', chosePerson);
}
