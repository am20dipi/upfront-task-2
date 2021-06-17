// 2. Events
    // DOMContentLoaded => when the DOM finishes loading, listen for the specified events 

document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    // invoking showTasksButton and creating a click event listener
    // handleClick is a callback function --> we do not invoke it here. 
    submitButton().addEventListener("click", handleSubmit)
    completedTasks().addEventListener("click", handleCompletedTasks)
    activeTasks().addEventListener("click", handleActiveTasks)
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
}


const appendTask = (task) => {
    const table = document.getElementById("task-table")
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td"); 
        const td4 = document.createElement("td")   
        const row = document.createElement("tr");

        td4.innerHTML = `<input type="checkbox" name="checkbox" class="checker">`
        td1.innerHTML = `<p id="task-name">${task.name}</p>`
        td2.innerHTML  = `<button class="edit-task" data-id="${task.id}">Edit</button>`
        td3.innerHTML  = `<button class="delete-task" data-id="${task.id}">Delete</button>`
        
        row.appendChild(td4)
        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        

        table.appendChild(row)
    
    document.querySelector(`button.delete-task[data-id='${task.id}']`).addEventListener("click", handleDelete)
    document.querySelector(`button.edit-task[data-id='${task.id}']`).addEventListener("click", handleEdit)
    document.querySelector(`input[name="checkbox"]`).addEventListener("change", handleChecked)

}
 


const handleClick = () => {
    // anonymous function
    if (taskTable().children.length < 10) {
        taskTable().innerHTML = " "
        TaskApi.fetchTasks()
    } else {
        taskTable().innerHTML = " "
    }
}

const handleError = (error) => {
    console.log(error)
}


    // iterating through the array tasks
    // creating an element li for each task
    // setting the inner html of each li to the specific task's attrs.
    // appending each task to the page under the specified parent 
    // selecting the delete button of that instance and adding event listener


    // 1. fetch to specific endpoint specified by id
    // 2. remove from page
    // 3. method: DELETE, headers?
    // 4. pass in an event bc click = event, event.target == button
    //debugger
    // 5. alert message? error message?
    
const handleEdit = (e) => {
    // 1. listen/wait for click event
    // 2. render form with preexisting field input
    // 3. replace current li with new li, map values
    // 4. clear & remove form
    if (e.target.innerText == 'Edit') {
        const taskId = e.target.dataset.id
        const name = e.target.parentElement.parentElement.querySelector("#task-name").innerText 
         e.target.parentElement.parentElement.innerHTML = `
            <td><input type="checkbox" name="checkbox" data-id='${attributes.id}' class="checker"></td>
            <td><input type="text" id="task-name" name="name" value='${name}'></td>
            <td><button class="edit-task" data-id="${taskId}">Update</button></td>
            <td><button class="delete-task" data-id="${taskId}">Delete</button></td>
            `
            document.querySelector(`button.delete-task[data-id='${taskId}']`).addEventListener("click", handleDelete)
            document.querySelector(`button.edit-task[data-id='${taskId}']`).addEventListener("click", handleUpdate)
            document.querySelector(`input[name="checkbox"][data-id='${attributes.id}']`).addEventListener("change", handleChecked)
    } else {
        handleUpdate(e)
    }
}



const handleCompletedTasks = () => {
    fetch("http://localhost:3000/tasks")
    // fetch takes in an endpoint as an argument
    // fetch returns Promise objects
    .then(resp => resp.json())
    // taking the response object and parsing it to readable format
    .then(json => {
        //debugger
        taskTable().innerHTML = ""
        renderCompletedTasks(json)
    })
    .catch(handleError)
    // taking the parsed data and passing it through a function renderTasks
    // using .catch to handle errors, passing in a function I created below
}

const renderCompletedTasks = (tasks) => {
    tasks.data.forEach(({attributes}) => {
        if (attributes.category_id === 1) {
                const table = document.getElementById("task-table")
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td"); 
                const td4 = document.createElement("td")   
                const row = document.createElement("tr");
        
                td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
                td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
                td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
                td4.innerHTML = `<input type="checkbox" name="checkbox" data-id='${attributes.id}' class="checker" checked>`
        
                row.appendChild(td4)
                row.appendChild(td1)
                row.appendChild(td2)
                row.appendChild(td3)

                
        
                table.appendChild(row) 

                document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", handleDelete)
                document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", handleEdit)
                document.querySelector(`input[name="checkbox"][data-id='${attributes.id}']`).addEventListener("change", handleChecked)
        } else {
            handleError()
        }
    })
    
    
}

const handleChecked = (e) => {
        if (e.target.checked) {
            debugger
            alert("You have completed this task!")
            const catId = e.target.parentElement.parentElement.querySelector(`input[name="checkbox"]`).dataset.id
            catId.innerText === 1
        } else if (!e.target.checked) {
            alert("You have unchecked this task.")
        } else {
            handleError()
        }
}

const handleActiveTasks = () => {
    fetch("http://localhost:3000/tasks")
    .then(resp => resp.json())
    .then(json => {
        taskTable().innerHTML = ""
        renderActiveTasks(json)
    })
    .catch(handleError)
}

const renderActiveTasks = (tasks) => {
    tasks.data.forEach(({attributes}) => {
         if (attributes.category_id != 1) {
                 const table = document.getElementById("task-table")
                 const td1 = document.createElement("td");
                 const td2 = document.createElement("td");
                 const td3 = document.createElement("td"); 
                 const td4 = document.createElement("td")   
                 const row = document.createElement("tr");
         
                 td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
                 td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
                 td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
                 td4.innerHTML = `<input type="checkbox" name="checkbox" data-id='${attributes.id}' class="checker">`
         
                 row.appendChild(td4)
                 row.appendChild(td1)
                 row.appendChild(td2)
                 row.appendChild(td3)
 
                 
         
                 table.appendChild(row)
 
                 document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", handleDelete)
                 document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", handleEdit)
                 document.querySelector(`input[name="checkbox"][data-id='${attributes.id}']`).addEventListener("change", handleChecked)
         } else {
             handleError()
         }
     })

}
