document.addEventListener("DOMContentLoaded", () => {
    showTasksButton().addEventListener("click", handleClick)
    submitButton().addEventListener("click", handleSubmit)
    completedTasks().addEventListener("click", TaskApi.handleCompletedTasks)
    activeTasks().addEventListener("click", TaskApi.handleActiveTasks)
    miscTasks().addEventListener("click", TaskApi.handleMiscTasks)
    schoolTasks().addEventListener("click", TaskApi.handleSchoolTasks)
    workTasks().addEventListener("click", TaskApi.handleWorkTasks)
    dropDown().addEventListener("click", CategoryApi.fetchCategoriesForSelect)
    changeBackground().addEventListener("click", renderNewBackground)
})

const renderNewBackground = () => {
    document.body.style.background = (document.body.style.background === 'black') ? 'white' : 'black'
    changeBackground.clicked = !changeBackground.clicked
    // Using a Ternary => if the condition is truthful
    // If it is true, upon clicking, turn it white
    // If it is false, upon clicking, turn it black

    // Bang Operator: convert to opposite boolean val. 
    // the button clicked is what you previously clicked 
    // If the first result happened, then the second result can happen upon clicking
}


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


const handleClick = () => {
    if (taskTable().children.length < 4) {
        taskTable().innerHTML = " "
        TaskApi.fetchTasks()
    } else {
        taskTable().innerHTML = " "
    }
}

const handleError = (error) => {
    console.log(error)
}
