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

        td4.innerHTML = `<input type="checkbox" name="checkbox" class="checker" autocomplete="on">`
        td1.innerHTML = `<p id="task-name">${task.name}</p>`
        td2.innerHTML  = `<button class="edit-task" data-id="${task.id}">Edit</button>`
        td3.innerHTML  = `<button class="delete-task" data-id="${task.id}">Delete</button>`
        td5.innerHTML = `<p id="category-id" class="hidden">${task.category_id}</p>`
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
                const td4 = document.createElement("td");      
                const row = document.createElement("tr");
        
                td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
                td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
                td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
                td4.innerHTML = `<input type="checkbox" name="checkbox" data-id='${attributes.id}' class="checker" autocomplete="on" checked>`
                
        
                row.appendChild(td4)
                row.appendChild(td1)
                row.appendChild(td2)
                row.appendChild(td3)
                

                
        
                table.appendChild(row) 

                document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", TaskApi.handleDelete)
                document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleEdit)
                document.querySelector(`input[name="checkbox"][data-id='${attributes.id}']`).addEventListener("change", Task.handleChecked)
        } else {
            handleError()
        }
    })
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
        debugger
         if (attributes.category_id != 1) {
                 const table = document.getElementById("task-table")
                 const td1 = document.createElement("td");
                 const td2 = document.createElement("td");
                 const td3 = document.createElement("td"); 
                 const td4 = document.createElement("td");  
                 const row = document.createElement("tr");
         
                 td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
                 td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
                 td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
                 td4.innerHTML = `<input type="checkbox" name="checkbox" data-id='${attributes.id}' class="checker" autocomplete="on">`
                 
         
                 row.appendChild(td4)
                 row.appendChild(td1)
                 row.appendChild(td2)
                 row.appendChild(td3)
                 
 
                 
         
                 table.appendChild(row)
 
                 document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", TaskApi.handleDelete)
                 document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", handleEdit)
                 document.querySelector(`input[name="checkbox"][data-id='${attributes.id}']`).addEventListener("change", handleChecked)
         } else {
             handleError()
         }
     })

     



}