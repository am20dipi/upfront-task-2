document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    submitButton().addEventListener("click", handleSubmit)
    completedTasks().addEventListener("click", handleCompletedTasks)
    activeTasks().addEventListener("click", handleActiveTasks)
    miscTasks().addEventListener("click", handleMiscTasks)
    schoolTasks().addEventListener("click", handleSchoolTasks)
    workTasks().addEventListener("click", handleWorkTasks)
    dropDown().addEventListener("click", fetchCategoriesForSelect)
})


const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
        name: taskName().value,
        category_id: taskCategory().value
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
    const p = document.createElement("p");
    const row = document.createElement("tr");

    row.appendChild(td1)
    row.appendChild(td2)
    row.appendChild(td3)
    row.appendChild(td4)
    row.appendChild(p)
    table.prepend(row)

    td1.innerHTML = `<p id="task-name">${task.name}</p>`
    td2.innerHTML  = `<button class="edit-task" data-id="${task.id}">Edit</button>`
    td3.innerHTML  = `<button class="delete-task" data-id="${task.id}">Delete</button>`
    td4.innerHTML  = `<button class="complete-task" data-id="${task.id}">Done!</button>`
    p.innerHTML = `<p id="task-completed" data-id="${task.id}" value="${task.category_id}" class="hidden"></p>`
    document.querySelector(`button.delete-task[data-id='${task.id}']`).addEventListener("click", TaskApi.handleDelete)
    document.querySelector(`button.edit-task[data-id='${task.id}']`).addEventListener("click", Task.handleEdit)
    document.querySelector(`button.complete-task[data-id='${task.id}']`).addEventListener("click", Task.handleComplete)
}

const fetchCategoriesForSelect = (e) => {
    if (e.target.matches('.dropdown')) {
        fetch('http://localhost:3000/categories')
            .then(resp => resp.json())
            .then(json => json.data.map(({attributes}) => `<option value="${attributes.id}">${attributes.name}</option>`))
            .then(collection => document.querySelector("select#category_id").innerHTML = collection.join(" "))
    }
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
            const table = document.getElementById("task-table")
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");   
            const td4 = document.createElement("td");
            const p = document.createElement("p");
            const row = document.createElement("tr");
        
            row.appendChild(td1)
            row.appendChild(td2)
            row.appendChild(td3)
            row.appendChild(td4)
            row.appendChild(p)
            table.prepend(row)
                
            td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
            td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
            td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
            td4.innerHTML = `<button class="complete-task" data-id="${attributes.id}" style="background-color:lightgreen">Completed</button>`
            p.innerHTML = `<p id="task-completed" data-id="${attributes.id}" class="hidden"></p>`
        
            document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", TaskApi.handleDelete)
            document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleEdit)
            document.querySelector(`button.complete-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleComplete)
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
         if (attributes.completed === false) {
            const table = document.getElementById("task-table")
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");   
            const td4 = document.createElement("td");
            const p = document.createElement("p");
            const row = document.createElement("tr");
        
            row.appendChild(td1)
            row.appendChild(td2)
            row.appendChild(td3)
            row.appendChild(td4)
            row.appendChild(p)
            table.prepend(row)
                
            td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
            td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
            td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
            td4.innerHTML = `<button class="complete-task" data-id="${attributes.id}">Done!</button>`
            p.innerHTML = `<p id="task-completed" data-id="${attributes.id}" class="hidden"></p>`
        
            document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", TaskApi.handleDelete)
            document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleEdit)
            document.querySelector(`button.complete-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleComplete)
         } else {
             handleError()
         }
     })
}

const handleMiscTasks = () => {
    fetch("http://localhost:3000/tasks")
    .then(resp => resp.json())
    .then(json => {
        taskTable().innerHTML = ""
        renderMiscTasks(json)
    })
    .catch(handleError)
}

const renderMiscTasks = (tasks) => {
    tasks.data.forEach(({attributes}) => {
         if (attributes.category_id === 1) {
            const table = document.getElementById("task-table")
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");   
            const td4 = document.createElement("td");
            const p = document.createElement("p");
            const row = document.createElement("tr");

            row.appendChild(td1)
            row.appendChild(td2)
            row.appendChild(td3)
            row.appendChild(td4)
            row.appendChild(p)
            table.prepend(row)
                
            td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
            td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
            td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
            td4.innerHTML = `<button class="complete-task" data-id="${attributes.id}">Done!</button>`
            p.innerHTML = `<p id="task-completed" data-id="${attributes.id}" class="hidden"></p>`

            document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", TaskApi.handleDelete)
            document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleEdit)
            document.querySelector(`button.complete-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleComplete)
         } else {
             handleError()
         }
     })
}

const handleWorkTasks = () => {
    fetch("http://localhost:3000/tasks")
    .then(resp => resp.json())
    .then(json => {
        taskTable().innerHTML = ""
        renderWorkTasks(json)
    })
    .catch(handleError)
}

const renderWorkTasks = (tasks) => {
    tasks.data.forEach(({attributes}) => {
         if (attributes.category_id === 2) {
            const table = document.getElementById("task-table")
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");   
            const td4 = document.createElement("td");
            const p = document.createElement("p");
            const row = document.createElement("tr");
        
            row.appendChild(td1)
            row.appendChild(td2)
            row.appendChild(td3)
            row.appendChild(td4)
            row.appendChild(p)
            table.prepend(row)
                
            td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
            td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
            td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
            td4.innerHTML = `<button class="complete-task" data-id="${attributes.id}">Done!</button>`
            p.innerHTML = `<p id="task-completed" data-id="${attributes.id}" class="hidden"></p>`
        
            document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", TaskApi.handleDelete)
            document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleEdit)
            document.querySelector(`button.complete-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleComplete)
         } else {
             handleError()
         }
     })
}

const handleSchoolTasks = () => {
    fetch("http://localhost:3000/tasks")
    .then(resp => resp.json())
    .then(json => {
        taskTable().innerHTML = ""
        renderSchoolTasks(json)
    })
    .catch(handleError)
}

const renderSchoolTasks = (tasks) => {
    tasks.data.forEach(({attributes}) => {
         if (attributes.category_id === 3) {
            const table = document.getElementById("task-table")
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");   
            const td4 = document.createElement("td");
            const p = document.createElement("p");
            const row = document.createElement("tr");
        
            row.appendChild(td1)
            row.appendChild(td2)
            row.appendChild(td3)
            row.appendChild(td4)
            row.appendChild(p)
            table.prepend(row)
                
            td1.innerHTML = `<p id="task-name">${attributes.name}</p>`
            td2.innerHTML  = `<button class="edit-task" data-id="${attributes.id}">Edit</button>`
            td3.innerHTML  = `<button class="delete-task" data-id="${attributes.id}">Delete</button>`
            td4.innerHTML = `<button class="complete-task" data-id="${attributes.id}">Done!</button>`
            p.innerHTML = `<p id="task-completed" data-id="${attributes.id}" class="hidden"></p>`
        
            document.querySelector(`button.delete-task[data-id='${attributes.id}']`).addEventListener("click", TaskApi.handleDelete)
            document.querySelector(`button.edit-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleEdit)
            document.querySelector(`button.complete-task[data-id='${attributes.id}']`).addEventListener("click", Task.handleComplete)
         } else {
             handleError()
         }
     })
}