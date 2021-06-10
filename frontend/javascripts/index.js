// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument

//Buttons
const buttonsDiv = () => document.getElementById("buttons")
const showTasksButton = () => document.getElementById("show-tasks")
const addTaskButton = () => document.getElementById("add-task")
const deleteTaskButton = () => document.getElementById("delete-task")
const editTaskButton = () => document.getElementById("edit-task")

//Lists
const listDiv = () => document.getElementById("list")
const ulTaskList = () => document.getElementById("task-list")    



// 2. Events
    // DOMContentLoaded => when the DOM finishes loading, listen for the specified events 

document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    // handClick is a callback function --> we do not invoke it here. 
})

const handleClick = () => {
    fetch('http://localhost:3000/tasks')
    .then(resp => resp.json())
    .then(json => renderTasks(json))
    .catch(handleError)
    //{debugger}
}

const handleError = (error) => {
    console.log(error)
}

const renderTasks = (tasks) => {
    tasks.forEach(task => {
        const li = document.createElement("li")
        li.innerHTML = `
            <h2 class="task-name">${task.name}</h2
        `
        ulTaskList.appendChild(li)
    })
}

