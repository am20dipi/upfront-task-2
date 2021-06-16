class Task {
    static all = []

    constructor(name, id, category_id) {
        this.name = name
        this.id = id
        this.category_id = category_id
        Task.all.push(this)
    }
    // ^ here we use destructuring; assigning variable names to values in a single "moment"

    static getAll() {
        return this.all
    }
    // static methods are "utility" methods; helper methods
    // defined on a class, but not apart of the instantiated object
    // call static methods directly on the class, NOT on an instance of a class
    // static keyword makes a function a class function

    static render() {
        // 1. for each instance, render data
        {debugger}
            const table = document.getElementById("task-table")
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td"); 
            const td4 = document.createElement("td")   
            const row = document.createElement("tr");

            td1.innerHTML = `<p id="task-name">${this.name}</p>`
            td2.innerHTML  = `<button class="edit-task" data-id="${this.id}">Edit</button>`
            td3.innerHTML  = `<button class="delete-task" data-id="${this.id}">Delete</button>`
            td4.innerHTML = `<input type="checkbox" name="checkbox" data-id='${this.id}' class="checker">`

            row.appendChild(td4)
            row.appendChild(td1)
            row.appendChild(td2)
            row.appendChild(td3)
            

            table.appendChild(row)
            document.querySelector(`button.delete-task[data-id='${this.id}']`).addEventListener("click", handleDelete)
            document.querySelector(`button.edit-task[data-id='${this.id}']`).addEventListener("click", handleEdit)
            document.querySelector(`input[name="checkbox"][data-id='${this.id}']`).addEventListener("change", handleChecked)
    }
}