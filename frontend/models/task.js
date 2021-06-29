// model files -- render to the frontend?
class Task {
    static all = []

    constructor({name, id, category_id, completed}) {
        this.name = name
        this.id = id
        this.category_id = category_id
        this.completed = completed
        Task.all.push(this)
    }

    static getAll() {
        return this.all
    }

    static findById(id){
        return this.getAll().find(task => task.id === id)
    }

    render() {
        const table = document.getElementById("task-table")
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");   
        const td4 = document.createElement("td");
        const p = document.createElement("p");
        const row = document.createElement("tr");

        td1.innerHTML = `<p id="task-name">${this.name}</p>`
        td2.innerHTML  = `<button class="edit-task" data-id="${this.id}">Edit</button>`
        td3.innerHTML  = `<button class="delete-task" data-id="${this.id}">Delete</button>`
        td4.innerHTML = `<button class="complete-task" data-id="${this.id}">Done!</button>`
        p.innerHTML = `<p id="task-completed" class="hidden"></p>`

        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        row.appendChild(td4)
        row.appendChild(p)
        table.appendChild(row)

        document.querySelector(`button.delete-task[data-id='${this.id}']`).addEventListener("click", TaskApi.handleDelete)
        document.querySelector(`button.edit-task[data-id='${this.id}']`).addEventListener("click", this.handleEdit)
        document.querySelector(`button.complete-task[data-id='${this.id}']`).addEventListener("click", this.handleComplete)
            
    }


    replaceElement(li) {
        li.innerHTML = `
                <td><p id="task-name">${this.name}</p></td>
                <td><button class="edit-task" data-id="${this.id}">Edit</button></td>
                <td><button class="delete-task" data-id="${this.id}">Delete</button></td>
                <td><button class="complete-task" data-id="${this.id}">Done!</button></td>
                <p id="task-completed" class="hidden"></p>
                `
    } 

    handleEdit(e) {
        if (e.target.innerText == 'Edit') {
            const taskId = e.target.dataset.id
            const name = e.target.parentElement.parentElement.querySelector("#task-name").innerText 
             e.target.parentElement.parentElement.innerHTML = `
                <td><input type="text" id="task-name" name="name" value='${name}'></td>
                <td><button class="edit-task" data-id="${taskId}">Update</button></td>
                <p id="task-completed" class="hidden"></p>
                `
                document.querySelector(`button.edit-task[data-id='${taskId}']`).addEventListener("click", TaskApi.handleUpdate)
        } else {
            TaskApi.handleUpdate(e)
        }
    }

    update(task) {
        this.name = task.name 
        return this
    }

    handleComplete(e){
        if (e.target.innerText === 'Done!') {
            const taskId = e.target.dataset.id
            const name = e.target.parentElement.parentElement.querySelector("#task-name").innerText
             e.target.parentElement.parentElement.innerHTML = `
                <td><p id="task-name">${name}</p></td>
                <td><button class="edit-task" data-id="${taskId}">Edit</button></td>
                <td><button class="delete-task" data-id="${taskId}">Delete</button></td>
                <td><button class="complete-task" data-id="${taskId}" style="background-color:lightgreen">Completed</button></td>
                <p id="task-completed" class="hidden" value="true"></p>
                `
                document.querySelector(`button.delete-task[data-id='${taskId}']`).addEventListener("click", TaskApi.handleDelete)
                document.querySelector(`button.edit-task[data-id='${taskId}']`).addEventListener("click", this.handleEdit)

        }    
    }

    static renderCompletedTasks(tasks){
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

    static renderActiveTasks(tasks){
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

    static renderMiscTasks(tasks){
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

    static renderWorkTasks(tasks){
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

    static renderSchoolTasks(tasks){
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

}