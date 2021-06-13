// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument

//Buttons
const buttonsDiv = () => document.getElementById("buttons")
const showTasksButton = () => document.querySelector(".show-tasks")
const addTaskButton = () => document.querySelector(".add-task")
const deleteTaskButton = () => document.querySelector(".delete-task")
const editTaskButton = () => document.querySelector(".edit-task")
const submitButton = () => document.getElementById("submit-button")
//const addNoteButton = () => document.querySelector(".add-note")

//Lists
const listDiv = () => document.getElementById("list")
const ulTaskList = () => document.getElementById("task-list")   
const ulIndividualTask = () => document.querySelector("#individual-task-list")

//Forms
const newTaskForm = () => document.querySelector("#new-task-form")
const formContainer = () => document.getElementById("form-container")
const taskName = () => document.getElementById("task-name")
//const taskDueDate = () => document.getElementById("task-due-date")
//const taskCompleted = () => document.getElementById("task-completed")
//const taskNotes = () => document.getElementById("task-note-id")


// 2. Events
    // DOMContentLoaded => when the DOM finishes loading, listen for the specified events 

document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    // invoking showTasksButton and creating a click event listener
    // handleClick is a callback function --> we do not invoke it here. 
})

// 3. Functions

const handleSubmit = (e) => {
    // 1. prevent default
    // 2. fetch to endpoint, POST, body, headers
    // 3. collect form data & send to db
    // 4. clear form and remove form
    e.preventDefault()
    const data = {
        name: taskName().value/* ,
        due_date: taskDueDate().value,
        completed: taskCompleted().value,
        task_notes: taskNotes().value */

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
        document.getElementById("new-task-form").remove();
    })
}


const renderTask = (task) => {
    debugger
    const li = document.createElement("li")
    li.innerHTML = `
        <h2 id="task-name"><a href="#" id="task-${task.id}">${task.name}</a></h2>
        
        <button class="delete-task" data-id="${task.id}">Delete Task</button>
        <button class="edit-task" data-id="${task.id}">Edit Task</button>
        
        `
    ulTaskList().appendChild(li) 
}
 


const handleClick = () => {

    // anonymous function
    if (ulTaskList().children.length < 1) {
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
        ulTaskList().innerHTML = ""
    }
    
}

const handleError = (error) => {
    console.log(error)
}

const renderTasks = (tasks) => {
    debugger
    const header = document.createElement("h1")
    header.innerText = 'Tasks'
    ulTaskList().appendChild(header)

    tasks.data.forEach(({attributes}) => {
        //debugger
        const li = document.createElement("li")
        li.innerHTML = `
            <h2 id="task-name"><a href="#" id="task-${attributes.id}">${attributes.name}</a></h2>
    

            <button class="delete-task" data-id="${attributes.id}">Delete Task</button>
            <button class="edit-task" data-id="${attributes.id}">Edit Task</button>

        `
       // debugger
        ulTaskList().appendChild(li)

        document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", handleDelete)
        /* document.querySelector(`#task-${attributes.id}`).addEventListener("click", () => {
                const task = document.querySelector(`#task-${attributes.id}-notes`)
                task.innerText=""
                attributes.task_notes.forEach(task_note => {
                    const li = document.createElement("li")
                    li.innerText = task_note.content

                    task.appendChild(li)
                })
                task.classList.toggle("hidden")
        }) */
        document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", handleEdit)
        //document.querySelector(`button.add-note[data-id='${attributes.id}']`).addEventListener("click", addNote)
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
        //.catch(handleError)
    }

const handleEdit = (e) => {
    // 1. listen/wait for click event
    // 2. render form with preexisting field input
    // 3. replace current li with new li, map values
    // 4. clear & remove form
    debugger
    if (e.target.innerText === 'Edit Task') {
        const taskId = e.target.dataset.id
        const name = e.target.parentElement.querySelector("#task-name").innerText 
        /* const dueDate = e.target.parentElement.querySelector("#task-due-date").innerText
        const completed = e.target.parentElement.querySelector("#task-completed").innerText
        const notes = e.target.parentElement.querySelector(`#task-${taskId}-notes`).innerText */
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
        name: e.target.parentElement.querySelector("#task-name").value/* , 
        due_date: e.target.parentElement.querySelector("#task-due-date").innerText,
        completed: e.target.parentElement.querySelector("#task-completed").innerText,
        task_notes: e.target.parentElement.querySelector(`#task-${taskId}-notes`).innerText */

    }
    fetch(`http://localhost:3000/tasks/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json'

        },
        body: JSON.stringify(updateData)
            
        })
        .then(resp => resp.json())
            //debugger
        .then(json => {
            alert("Successfully Updated")
            e.target.parentNode.remove()
        })
        .then(json => replaceElement(json, e.target.parentElement))
        debugger
        
}


const replaceElement = (task, li) => {
    li.innerHTML = `
    <h2 id="task-name"><a href="#" id="task-${task.id}">${task.name}</a></h2>
    `
}

/* const displayNoteField = () => {
    debugger
    
    const note_field = document.getElementById("task-notes")
    ulIndividualTask().appendChild(note_field)
    addNoteButton().addEventListener("click", handleNote)

}

const handleNote = (e) => {
    debugger
    const noteData = {
        task_notes: taskNotes().value
    }
    fetch(`http://localhost:3000/tasks/${e.target.dataset.id}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'

        },
        body: JSON.stringify(noteData)
            
        })
        .then(resp => {
            //debugger
            alert("Successfully Added")
            const li = noteData
            taskNotes().appendChild(li)
        })
}
 */