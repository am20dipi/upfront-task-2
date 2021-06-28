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
    // ^ here we use destructuring; assigning variable names to values in a single "moment"

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
        const td5 = document.createElement("td");  
        const row = document.createElement("tr");

        td1.innerHTML = `<p id="task-name">${this.name}</p>`
        td5.innerHTML = `<p id="category-id">${this.category_id}</p>`
        td2.innerHTML  = `<button class="edit-task" data-id="${this.id}">Edit</button>`
        td3.innerHTML  = `<button class="delete-task" data-id="${this.id}">Delete</button>`
        td4.innerHTML = `<button class="complete-task" data-id="${this.id}">Done!</button>`


        row.appendChild(td1)
        //row.appendChild(td5)
        row.appendChild(td2)
        row.appendChild(td3)
        row.appendChild(td4)
        

        table.appendChild(row)

        debugger
        document.querySelector(`button.delete-task[data-id='${this.id}']`).addEventListener("click", TaskApi.handleDelete)
        document.querySelector(`button.edit-task[data-id='${this.id}']`).addEventListener("click", this.handleEdit)
        document.querySelector(`button.complete-task[data-id='${this.id}']`).addEventListener("click", this.handleComplete)
            
    }


    replaceElement(li) {
        li.innerHTML = `
                <td><p id="task-name">${this.name}</p></td>
                <td><p id="category_id">${this.category_id.name}</p></td>
                <td><button class="edit-task" data-id="${this.id}">Edit</button></td>
                <td><button class="delete-task" data-id="${this.id}">Delete</button></td>
                <td><button class="complete-task" data-id="${this.id}">Done!</button></td>
                `
    } 

    handleEdit(e) {
        if (e.target.innerText == 'Edit') {
            const taskId = e.target.dataset.id
            const name = e.target.parentElement.parentElement.querySelector("#task-name").innerText 
             e.target.parentElement.parentElement.innerHTML = `
                <td><input type="text" id="task-name" name="name" value='${name}'></td>
                <td><input type="text" id="category_id" name="task-category" value='${this.category_id.name}'></p></td>
                <td><button class="edit-task" data-id="${taskId}">Update</button></td>
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
            const taskCompleted = e.target.parentElement.parentElement.querySelector("#task-completed")
            debugger
            taskCompleted.value() === "true"
            const taskId = e.target.dataset.id
            const name = e.target.parentElement.parentElement.querySelector("#task-name").innerText
            const category = e.target.parentElement.parentElement.querySelector("#category-name").innerText 
             e.target.parentElement.parentElement.innerHTML = `
                <td><p id="task-name">${name}</p></td>
                <td><p id="category_id">${category}</p></td>
                <td><button class="edit-task" data-id="${taskId}">Edit</button></td>
                <td><button class="delete-task" data-id="${taskId}">Delete</button></td>
                <td><button class="complete-task" data-id="${taskId}" style="background-color:lightgreen">Completed</button></td>
                <p id="task-completed" class="hidden" value="true"></p>
                `
                document.querySelector(`button.delete-task[data-id='${taskId}']`).addEventListener("click", TaskApi.handleDelete)
                document.querySelector(`button.edit-task[data-id='${taskId}']`).addEventListener("click", this.handleEdit)
            
        }
    }


    

}