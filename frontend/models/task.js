// model files -- render to the frontend?


class Task {
    static all = []

    constructor({name, id, category_id}) {
        this.name = name
        this.id = id
        this.category_id = category_id
        Task.all.push(this)
    }
    // ^ here we use destructuring; assigning variable names to values in a single "moment"

    static getAll() {
        return this.all
    }

    static findById(id){
        return this.getAll().find(task => task.id === id)
    }
    // static methods are "utility" methods; helper methods
    // defined on a class, but not apart of the instantiated object
    // call static methods directly on the class, NOT on an instance of a class
    // static keyword makes a function a class function

    render() {
        // 1. for each instance, render data
        const table = document.getElementById("task-table")
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td"); 
        const td4 = document.createElement("td")  
        const row = document.createElement("tr");

        td1.innerHTML = `<p id="task-name">${this.name}</p>`
        td2.innerHTML  = `<button class="edit-task" data-id="${this.id}">Edit</button>`
        td3.innerHTML  = `<button class="delete-task" data-id="${this.id}">Delete</button>`
        if (this.category_id === 1){
            td4.innerHTML = `<input type="checkbox" name="checkbox" data-id='${this.id}' class="checker" autocomplete="on" checked>`
        } else {
            td4.innerHTML = `<input type="checkbox" name="checkbox" data-id='${this.id}' class="checker" autocomplete="on">`
        }
        

        row.appendChild(td4)
        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        

        table.appendChild(row)
        document.querySelector(`button.delete-task[data-id='${this.id}']`).addEventListener("click", TaskApi.handleDelete)
        document.querySelector(`button.edit-task[data-id='${this.id}']`).addEventListener("click", this.handleEdit)
        document.querySelector(`input[name="checkbox"][data-id='${this.id}']`).addEventListener("change", this.handleChecked)
            
    }


    replaceElement(li) {
        li.innerHTML = `
                <td><input type="checkbox" name="checkbox" data-id='${this.id}' class="checker" autocomplete="on"></td>
                <td><p id="task-name">${this.name}</p></td>
                <td><button class="edit-task" data-id="${this.id}">Edit</button></td>
                <td><button class="delete-task" data-id="${this.id}">Delete</button></td>
        `
    } 

    handleEdit(e) {
        // 1. listen/wait for click event
        // 2. render form with preexisting field input
        // 3. replace current li with new li, map values
        // 4. clear & remove form
        if (e.target.innerText == 'Edit') {
            const taskId = e.target.dataset.id
            const name = e.target.parentElement.parentElement.querySelector("#task-name").innerText 
             e.target.parentElement.parentElement.innerHTML = `
                <td><input type="checkbox" name="checkbox" data-id='${this.id}' class="checker" autocomplete="on"></td>
                <td><input type="text" id="task-name" name="name" value='${name}'></td>
                <td><button class="edit-task" data-id="${taskId}">Update</button></td>
                <td><button class="delete-task" data-id="${taskId}">Delete</button></td>
                `
                document.querySelector(`button.delete-task[data-id='${taskId}']`).addEventListener("click", TaskApi.handleDelete)
                document.querySelector(`button.edit-task[data-id='${taskId}']`).addEventListener("click", TaskApi.handleUpdate)
                document.querySelector(`input[name="checkbox"][data-id='${this.id}']`).addEventListener("change", TaskApi.handleChecked)
        } else {
            TaskApi.handleUpdate(e)
        }
    }

    update(task) {
        this.name = task.name 
        return this
    }

    handleChecked(e) {
        if (e.target.checked) {
            alert("You have completed this task!")
            e.target.checked
        } else if (!e.target.checked) {
            alert("You have unchecked this task.")
        } else {
            handleError()
        }
    }

    


    

    

}