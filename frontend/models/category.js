class Category {
    static all = []

    constructor(name, id, tasks = []){
        this.name = name
        this.id = id
        this.tasks = tasks
        Category.all.push(this)
    }
    // "this" keyword refers to the new instance we instantiated out of a class

    static getAll() {
        return this.all
    }

    static findByName(name) {
        // receive name as arg
        // return the whole category object
        // find the specific category by name and set name attribute
        return this.all.find(category => category.name === name)
    }

}