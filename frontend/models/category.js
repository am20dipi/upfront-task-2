class Category {
    static all = []

    constructor(name, id, tasks = []){
        this.name = name
        this.id = id
        this.tasks = tasks
        Category.all.push(this)
    }

    static getAll() {
        return this.all
    }

    static findByName(name) {
        return this.all.find(category => category.name === name)
    }

}