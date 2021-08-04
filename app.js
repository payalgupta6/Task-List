// Defining UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const card = document.querySelector('.card');

  
// Load all event listeners
loadEventListener();

// Load all event listeners
function loadEventListener(){
    //mousemove
    card.addEventListener('mousemove' , runevent);
    // DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);
    // Add task event
    form.addEventListener('submit',addTask);
    // remove task Event
    taskList.addEventListener('click',removeTask);
    //clear task event
    clearBtn.addEventListener('click',clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup',filterTasks);
}

function runevent(e){
    document.body.style.backgroundColor = `rgb(${e.offsetX},${e.offsetY},80)`;
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class = "fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);
    })
}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add Task');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class = "fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);

    //store in ls
    storeTaskInLs(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}

function storeTaskInLs(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task) => {
        if(taskItem.textContent ===task){
            task.splice(index,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
    // taskList.innerHTML = '';

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    clearTasksFromLS();
}

function clearTasksFromLS(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}
