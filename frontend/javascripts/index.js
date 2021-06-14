// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument

//Buttons
const buttonsDiv = () => document.getElementById("buttons")
const showTasksButton = () => document.querySelector(".show-tasks")
const deleteTaskButton = () => document.querySelector(".delete-task")
const editTaskButton = () => document.querySelector(".edit-task")
const submitButton = () => document.getElementById("submit-button")
const completedTasks = () => document.querySelector(".completed-tasks")
const activeTasks = () => document.querySelector(".active-tasks")
const priorityTasks = () => document.querySelector(".priority-tasks")

//Lists
const taskTable = () => document.getElementById("task-table")   

//Forms
const newTaskForm = () => document.querySelector("#new-task-form")
const formContainer = () => document.getElementById("form-container")
const taskName = () => document.getElementById("task-name")
const categoryId = () => document.getElementById("category-id")



// 2. Events
    // DOMContentLoaded => when the DOM finishes loading, listen for the specified events 

document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    // invoking showTasksButton and creating a click event listener
    // handleClick is a callback function --> we do not invoke it here. 
    submitButton().addEventListener("click", handleSubmit)
    completedTasks().addEventListener("click", displayCompletedTasks)
})

// 3. Functions

const handleSubmit = (e) => {
    // 1. prevent default
    // 2. fetch to endpoint, POST, body, headers
    // 3. collect form data & send to db
    // 4. clear form and remove form
    e.preventDefault()
    const data = {
        name: taskName().value
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
        appendTask(json)
        document.getElementById("new-task-form").reset();
    })
    debugger
}


const appendTask = (task) => {
    debugger
    const table = document.getElementById("task-table")
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td"); 
        const td4 = document.createElement("td")   
        const row = document.createElement("tr");

        td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
        td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">O</button>`
        td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">X</button>`
        td4.innerHTML = `<input type="checkbox" class="checker">`

        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        row.appendChild(td4)

        table.appendChild(row)
    
    document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", handleDelete)
    document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", handleEdit)

}
 


const handleClick = () => {
    // anonymous function
    if (taskTable().children.length < 4) {
        fetch('http://localhost:3000/tasks')
    // fetch takes in an endpoint as an argument
    // fetch returns Promise objects
    .then(resp => resp.json())
    // taking the response object and parsing it to readable format
    .then(json => renderTasks(json))
    // taking the parsed data and passing it through a function renderTasks
    .catch(handleError)
    // using .catch to handle errors, passing in a function I created below
    } else {
        taskTable().innerHTML = " "
    }
}

const handleError = (error) => {
    console.log(error)
}

const renderTasks = (tasks) => {
    tasks.data.forEach(({attributes}) => {
        //debugger
        const table = document.getElementById("task-table")
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td"); 
        const td4 = document.createElement("td")   
        const row = document.createElement("tr");

        td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
        td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
        td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
        td4.innerHTML = `<input type="checkbox" class="checker">`

        row.appendChild(td4)
        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        

        table.appendChild(row)
        document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", handleDelete)
        document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", handleEdit)

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
    // 5. alert message? error message?
    fetch(`http://localhost:3000/tasks/${e.target.dataset.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json'

        }
    })
        .then(resp => {
            //debugger
            alert("Successfully Deleted")
            e.target.parentNode.remove()
        })
    }

const handleEdit = (e) => {
    // 1. listen/wait for click event
    // 2. render form with preexisting field input
    // 3. replace current li with new li, map values
    // 4. clear & remove form
    debugger
    if (e.target.innerText === 'o') {
        const taskId = e.target.dataset.id
        const name = e.target.parentElement.querySelector("#task-name").innerText 
         e.target.parentElement.innerHTML = `
            <label for="name">Name:</label>
            <input type="text" id="task-name" name="name" value='${name}'><br>

            
            <button class="edit-task" data-id="${taskId}">Update</button>
            <button class="delete-task" data-id="${taskId}">Delete</button>
            `
            document.querySelector(`button.delete-task[data-id='${taskId}']`).addEventListener("click", handleDelete)
            document.querySelector(`button.edit-task[data-id='${taskId}']`).addEventListener("click", handleUpdate)
    } else {
        debugger
        handleUpdate(e)
    }
}

const handleUpdate = (e) => {
    const updateData = {
        name: e.target.parentElement.querySelector("#task-name").value
    }
    fetch(`http://localhost:3000/tasks/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json'

        },
        body: JSON.stringify(updateData)
            
        })
        .then(resp => resp.json())
        .then(json => {
            alert("Successfully Updated")
            replaceElement(json, e.target.parentElement)
        })
        debugger
        
}


const replaceElement = (task, li) => {
    li.innerHTML = `
    <h2 id="task-name">${task.name}</h2>
    <button class="edit-task" data-id="${task.id}">Update</button>
    <button class="delete-task" data-id="${task.id}">Delete</button>
    `
}

const displayCompletedTasks = () => {
    debugger
    fetch('http://localhost:3000/categories/1')
    // fetch takes in an endpoint as an argument
    // fetch returns Promise objects
    .then(resp => resp.json())
    // taking the response object and parsing it to readable format
    .then(json => {
            const li = createElement("li")
            li.innerHTML = `
            <h3 id="task-name">${attributes.name}</a></h3>

            <button class="delete-task" data-id="${attributes.id}" class="hidden">Delete Task</button>
            <button class="edit-task" data-id="${attributes.id}" class="hidden">Edit Task</button>

        `
        ulTaskList().appendChild(li)
        document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", handleDelete)
        document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", handleEdit)
        })
    // taking the parsed data and passing it through a function renderTasks
    // using .catch to handle errors, passing in a function I created below


}