document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    submitButton().addEventListener("click", handleSubmit)
    completedTasks().addEventListener("click", handleCompletedTasks)
    activeTasks().addEventListener("click", handleActiveTasks)
})

const myTasks = () => {
    const table = document.getElementById("task-table")
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td"); 
                const td4 = document.createElement("td");
                const td5= document.createElement("td");    
                const row = document.createElement("tr");
        
                td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
                td5.innerHTML = `<p id="category-name">${attributes.category_id.name}</p>`
                td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
                td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
                td4.innerHTML = `<button class="complete-task" data-id="${attributes.id}">Done!</button>`
                row.appendChild(td1)
                row.appendChild(td5)
                row.appendChild(td2)
                row.appendChild(td3)
                row.appendChild(td4)
            
                table.appendChild(row) 

                document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", TaskApi.handleDelete)
                document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleEdit)
                document.querySelector(`button.complete-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleComplete)
}

const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
        name: taskName().value,
        category_id: categoryId().value
    }
     fetch('http://localhost:3000/tasks', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
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
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const row = document.createElement("tr");
        td1.innerHTML = `<p id="task-name">${task.name}</p>`
        td5.innerHTML = `<p id="category-name">${task.category_id.name}</p>`
        td2.innerHTML  = `<button class="edit-task" data-id="${task.id}">Edit</button>`
        td3.innerHTML  = `<button class="delete-task" data-id="${task.id}">Delete</button>`
        td4.innerHTML  = `<button class="complete-task" data-id="${task.id}">Done!</button>`

        row.appendChild(td1)
        row.appendChild(td5)
        row.appendChild(td2)
        row.appendChild(td3)
        row.appendChild(td4)
        
        table.prepend(row)
    document.querySelector(`button.delete-task[data-id='${task.id}']`).addEventListener("click", TaskApi.handleDelete)
    document.querySelector(`button.edit-task[data-id='${task.id}']`).addEventListener("click", Task.handleEdit)
    document.querySelector(`button.complete-task[data-id='${task.id}']`).addEventListener("click", Task.handleComplete)
}
 


const handleClick = () => {
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
    .then(resp => resp.json())
    .then(json => {
        taskTable().innerHTML = ""
        renderCompletedTasks(json)
    })
    .catch(handleError)
}

const renderCompletedTasks = (tasks) => {
    tasks.data.forEach(({attributes}) => {
        if (attributes.completed === true) {
            myTasks()
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
    debugger
    tasks.data.forEach(({attributes}) => {
         if (attributes.completed == false) {
            myTasks()
         } else {
             handleError()
         }
     })
}