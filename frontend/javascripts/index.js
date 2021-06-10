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

//Forms
const newTaskForm = () => document.querySelector("#new-task-form")
const formContainer = () => document.querySelector("#form-container")


// 2. Events
    // DOMContentLoaded => when the DOM finishes loading, listen for the specified events 

document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    // invoking showTasksButton and creating a click event listener
    // handleClick is a callback function --> we do not invoke it here. 
    
    addTaskButton().addEventListener("click", displayNewForm)
})



const displayNewForm = () => {
    // 1. HTML to show the form
    // 2. insert onto page?
    // 3. submit button / event listener
    debugger
    const form = document.querySelector("#new-task-form")
    form.innerHTML = `
    <label for="name">Task:</label>
    <input type="text" id="name" name="name"><br>
    <label for="due_date">Due Date:</label>
    <input type="text" id="due_date" name="due_date"><br>
    <label for="completed">Completed?:</label>
    <label>Yes</label><input type="checkbox" id="done" name="completed" value ="done">
    <label>No</label><input type="checkbox" id="not done" name="completed" value="not done"><br>
    <label for="task_notes">Notes:</label>
    <textarea id="task_notes" name="task_notes"></textarea><br><br>
    <input type="submit" value="Create Task">
    `
    formContainer().appendChild(form)
    newTaskForm().addEventListener("submit", handleSubmit)

}

const handleSubmit = () => {
    // 1. prevent default
    // 2. fetch to endpoint, POST, body, headers
    // 3. create the new task 
    // 4. send data
    e.preventDefault()
    const formData = {
        name: taskName().value,
        due_date: taskDueDate().value,
        completed: taskCompleted().value
    }
     fetch('http://localhost:3000/tasks', {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
             "Accept": "application/json"
         },
         body: JSON.stringify(formData)
     })
     .then(resp =>resp(json))
     .then(json => createTask(json))
     .catch(handleError)
    
}



const handleClick = () => {
    // anonymous function
    fetch('http://localhost:3000/tasks')
    // fetch takes in an endpoint as an argument
    // fetch returns Promise objects
    .then(resp => resp.json())
    // taking the response object and parsing it to readable format
    .then(json => renderTasks(json))
    // taking the parsed data and passing it through a function renderTasks
    .catch(handleError)
    // using .catch to handle errors, passing in a function I created below
    //{debugger}
}

const handleError = (error) => {
    console.log(error)
}

const renderTasks = (tasks) => {
    tasks.forEach(task => {
        const li = document.createElement("li")
        li.innerHTML = `
            <h2 class="task-name">${task.name}</h2>
            <p class="task-duedate">${task.due_date}</p>
            <p class="task-completed">${task.completed}</p>
        `
        ulTaskList().appendChild(li)
    })
    // iterating through the array tasks
    // creating an element li for each task
    // setting the inner html of each li to the specific task's attrs.
    // appending each task to the page under the specified div


}

