// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument

//Buttons
const buttonsDiv = () => document.getElementById("buttons")
const showTasksButton = () => document.getElementById("show-tasks")
const addTaskButton = () => document.getElementById("add-task")
const deleteTaskButton = () => document.getElementById("delete-task")
const editTaskButton = () => document.getElementById("edit-task")
const submitButton = () => document.getElementById("submit-button")

//Lists
const listDiv = () => document.getElementById("list")
const ulTaskList = () => document.getElementById("task-list")
   

//Forms
const newTaskForm = () => document.querySelector("#new-task-form")
const formContainer = () => document.querySelector("#form-container")
const taskName = () => document.getElementById("#task-name")
const taskDueDate = () => document.getElementById("#task-due-date")
const taskCompleted = () => document.getElementById("#task-completed")
const taskNotes = () => document.getElementById("#task-notes")

// 2. Events
    // DOMContentLoaded => when the DOM finishes loading, listen for the specified events 

document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    // invoking showTasksButton and creating a click event listener
    // handleClick is a callback function --> we do not invoke it here. 
    
    addTaskButton().addEventListener("click", displayNewForm)
})

// 3. Functions

const displayNewForm = () => {
    // 1. HTML to show the form
    // 2. insert onto page
    // 3. submit button / event listener
    //debugger
    const form = newTaskForm().style.display= 'block';
    form.innerHTML += `
        <label for="name">Name:</label>
        <input type="text" id="task-name" name="name"><br>

        <label for="due_date">Date: </label>
        <input type="text" id="task-due-date" name="due_date"><br>

        <label for="completed">Completed: </label>
        <label>Yes</label><input type="checkbox" id="task-completed" name="completed" value ="true">
        <label>No</label><input type="checkbox" id="task-completed" name="completed" value="false"><br>

        <label for="task_notes">Notes: </label>
        <textarea id="task-notes" name="task_notes"></textarea><br><br>
        
        <input type="submit" value="Create Task" id="submit-button">
        `
    //formContainer().appendChild(form)
    submitButton().addEventListener("click", handleSubmit)

}

const handleSubmit = (e) => {
    // 1. prevent default
    // 2. fetch to endpoint, POST, body, headers
    // 3. create the new task 
    // 4. collect form data & send to db
    e.preventDefault()
    const data = {
        name: taskName().value,
        due_date: taskDueDate().value,
        completed: taskCompleted().value,
        task_notes: taskNotes().value

    }
    // setting object "data" to the values of each input field
    // creating an object with keyvalue pairs

    debugger
     fetch('http://localhost:3000/tasks', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
            // headers point to a nested object with keyvalue pairs
            // content-type => the type of data sent & received
         body: JSON.stringify(data)
         // the data being sent back 
         // data object must be stringified, so I use JSON.stringify
     })
     .then(resp =>resp(json))
     .then(json => renderTask(json))
}


const renderTask = (task) => {
    debugger
    
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
            <h2 id="task-name">${task.name}</h2>
            <p id="task-due-date">${task.due_date}</p>
            <p id="task-completed">${task.completed}</p>
        `
        ulTaskList().appendChild(li)
    })
    // iterating through the array tasks
    // creating an element li for each task
    // setting the inner html of each li to the specific task's attrs.
    // appending each task to the page under the specified div


}

