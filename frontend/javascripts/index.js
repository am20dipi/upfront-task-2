// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument

//Buttons
const buttonsDiv = () => document.getElementById("buttons")
const showTasksButton = () => document.querySelector(".show-tasks")
const addTaskButton = () => document.querySelector(".add-task")
const deleteTaskButton = () => document.querySelector(".delete-task")
const editTaskButton = () => document.querySelector(".edit-task")
const submitButton = () => document.getElementById("submit-button")

//Lists
const listDiv = () => document.getElementById("list")
const ulTaskList = () => document.getElementById("task-list")
const taskContainer = () => document.getElementById("task-container")   

//Forms
const newTaskForm = () => document.querySelector("#new-task-form")
const formContainer = () => document.querySelector("#form-container")
const taskName = () => document.getElementById("task-name")
const taskDueDate = () => document.getElementById("task-due-date")
const taskCompleted = () => document.getElementById("task-completed")
const taskNotes = () => document.getElementById("task-notes")

// 2. Events
    // DOMContentLoaded => when the DOM finishes loading, listen for the specified events 

document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    // invoking showTasksButton and creating a click event listener
    // handleClick is a callback function --> we do not invoke it here. 
    
    addTaskButton().addEventListener("click", displayNewForm)
    
    //editTaskButton().addEventListener("click", handleEdit)
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
        <input type="text" id="task-name" name="task-name"><br>

        <label for="due_date">Date: </label>
        <input type="text" id="task-due-date" name="due-date"><br>

        <label for="completed">Completed: </label>
        <label>Yes</label><input type="checkbox" id="task-completed" name="completed" value ="true">
        <label>No</label><input type="checkbox" id="task-completed" name="completed" value="false"><br>

        <label for="task_notes">Notes: </label>
        <textarea id="task-notes" name="task-notes"></textarea><br><br>
        
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
     .then(resp => resp.json())
     .then(json => {
        renderTask(json)
        document.getElementById("new-task-form").reset();
        })
}


const renderTask = (task) => {
    //debugger
    let p = document.createElement("p")
    p.innerHTML += `
        <div data-id="${task.id}">
            <h2>${task.name}</h2>
            <li>When: ${task.due_date}</li>
            <li>Completed? ${task.completed}</li>
            <li>Notes: ${task.task_notes}</li>
        </div>
    `
    taskContainer().appendChild(p) 
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
            <ol>
                <p id="task-due-date">When: ${task.due_date}</p>
                <p id="task-completed">Completed? ${task.completed}</p>
            </ol>
            <button class="delete-task" data-id="${task.id}">Delete Task</button>
            <button class="edit-task" data-id="${task.id}">Edit Task</button>

        `
        ulTaskList().appendChild(li)
        document.querySelector(`button.delete-task[data-id='${task.id}']`).addEventListener("click", handleDelete)
        
    })
    
    // iterating through the array tasks
    // creating an element li for each task
    // setting the inner html of each li to the specific task's attrs.
    // appending each task to the page under the specified parent 
    // selecting the delete button of that instance and adding event listener

}


const handleDelete = (e) => {
    // 1. fetch to specific endpoint specified by id
    // 2. remove from page
    // 3. method: DELETE, headers?
    // 4. pass in an event bc click = event, event.target == button
    //debugger
    fetch(`http://localhost:3000/tasks/${e.target.dataset.id}`, {
        method: 'DELETE',
    })
        .then(resp => resp.json())
        .then(json => {
            alert(json.message)
            e.parentNode.remove()
            renderTasks()
        })
        .catch(handleError)
    }


function handleEdit() {
    // 1. 
}

