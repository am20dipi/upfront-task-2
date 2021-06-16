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

    static displayTasks() {

    }
}