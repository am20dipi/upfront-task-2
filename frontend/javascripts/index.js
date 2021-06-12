// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument

//Buttons
const buttonsDiv = () => document.getElementById("buttons")
const showTasksButton = () => document.querySelector(".show-tasks")
const addTaskButton = () => document.querySelector(".add-task")
const deleteTaskButton = () => document.querySelector(".delete-task")
const editTaskButton = () => document.querySelector(".edit-task")
const submitButton = () => document.getElementById("submit-button")
const addNoteButton = () => document.querySelector(".add-note")

//Lists
const listDiv = () => document.getElementById("list")
const ulTaskList = () => document.getElementById("task-list")   
const ulIndividualTask = () => document.querySelector(".individual-task-list")

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
})

// 3. Functions

const displayNewForm = () => {
    // 1. HTML to show the form
    // 2. insert onto page
    // 3. submit button / event listener
    // 4. need to insert toggle function

    const form = newTaskForm().style.display= 'block';
    form.innerHTML += `
        <label for="name">Name:</label>
        <input type="text" id="task-name" name="tname"><br>

        <label for="due_date">Date: </label>
        <input type="text" id="task-due-date" name="due_date"><br>

        <label>Completed: </label>
        <label for="completed">Yes</label><input type="checkbox" id="task-completed" name="completed" value="true">
        <label for="not completed">No</label><input type="checkbox" id="task-completed" name="not completed" value="false"><br>

        <label for="task[task_notes]">Notes: </label>
        <textarea id="task-notes" name="task[task_notes]"></textarea><br><br>
        
        <input type="submit" value="Create Task" id="submit-button">
        `
    submitButton().addEventListener("click", handleSubmit)
}

const handleSubmit = (e) => {
    // 1. prevent default
    // 2. fetch to endpoint, POST, body, headers
    // 3. collect form data & send to db
    // 4. clear form and remove form
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
        document.getElementById("new-task-form").remove();
    })
}


const renderTask = (task) => {
    //debugger
    const li = document.createElement("li")
    li.innerHTML += `
        <div data-id="${task.id}">
            <h2>${task.name}</h2>
            <li>When: ${task.due_date}</li>
            <li>Completed? ${task.completed}</li>
            <li>Notes: ${task.task_notes}</li>
        </div>
    `
    ulTaskList().appendChild(li) 
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
}

const handleError = (error) => {
    console.log(error)
}

const renderTasks = (tasks) => {
    
    // need to ensure that you cannot click render tasks twice and see it twice
    tasks.data.forEach(({attributes}) => {
        //debugger
        const li = document.createElement("li")
        li.innerHTML = `
            <h2 id="task-name"><a href="#" id="task-${attributes.id}">${attributes.name}</a></h2>
            <ul class="individual-task-list">
                <li id="task-due-date">When: ${attributes.due_date}</li>
                <li id="task-completed">Completed? ${attributes.completed}</li>
            </ul>
            <div id="task-${attributes.id}-notes" class="hidden">
                <legend><strong>Notes</strong></legend>
            </div>

            <button class="delete-task" data-id="${attributes.id}">Delete Task</button>
            <button class="edit-task" data-id="${attributes.id}">Edit Task</button>
            <button class="add-note" onclick="displayNoteField()" data-id="${attributes.id}">Add Note</button>

        `
       // debugger
        ulTaskList().appendChild(li)


        document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", handleDelete)
        document.querySelector(`#task-${attributes.id}`).addEventListener("click", () => {
                const task = document.querySelector(`#task-${attributes.id}-notes`)
                task.innerText=""
                attributes.task_notes.forEach(task_note => {
                    const li = document.createElement("li")
                    li.innerText = task_note.content

                    task.appendChild(li)
                })
                task.classList.toggle("hidden")
        })
        document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", handleUpdate)
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


const handleEdit = () => {
    
}

const handleUpdate = (e) => {
    // 1. listen/wait for click event
    // 2. render form with preexisting field input
    // 3. replace current li with new li 
    // 4. clear & remove form
    console.log(e)
}


const displayNoteField = () => {
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
