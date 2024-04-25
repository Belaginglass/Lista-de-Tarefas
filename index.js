const inputNewTask = document.querySelector('.input-new-task')
const buttonAddTask = document.querySelector('.btn-add-task')
const tasks = document.querySelector('.tasks')

function createTask(){
    const task = document.createElement('li')
    return task
}

inputNewTask.addEventListener('keypress', function(event){
    if(event.key === "Enter") {
        if (!inputNewTask.value) return;
        addNewTask(inputNewTask.value)
    }
})

function cleanInput(){
    inputNewTask.value = ''
    inputNewTask.focus()
}


function createBtnDelete(task){
    task.innerText += ' '
    const btnDelete = document.createElement('button')
    btnDelete.innerText = 'Delete Task'
    task.appendChild(btnDelete)
    btnDelete.setAttribute('class', 'btn-delete')
}

function addNewTask(textInput){
    const task = createTask()
    task.innerText = textInput
    tasks.appendChild(task)
    cleanInput()
    createBtnDelete(task)
    saveTasks()
}



buttonAddTask.addEventListener('click', function () {
    if (!inputNewTask.value) return;
    addNewTask(inputNewTask.value)
})


document.addEventListener('click', function(event){
    const element = event.target
    if(element.classList.contains('btn-delete')){
        element.parentElement.remove()
        saveTasks()
    }
})


function saveTasks(){
    const allTasks = tasks.querySelectorAll('li')
    const listTasks = []

    for(let taskList of allTasks){
        let textTask = taskList.innerText
        textTask = textTask.replace('Delete Task', '').trim()
        listTasks.push(textTask)
    }

    const tasksJSON = JSON.stringify(listTasks)
    localStorage.setItem('tasks', tasksJSON)
}

function addSaveTasks(){
    const tasks = localStorage.getItem('tasks')
    const listTasks = JSON.parse(tasks)

    for(let savedTask of listTasks){ 
        addNewTask(savedTask)
    }
}

addSaveTasks()
