class Task {
    static all = []

    constructor(name, id, category_id) {
        this.name = name
        this.id = id
        this.category_id = category_id
        Task.all.push(this)
    }

    static getAll() {
        return this.all
    }
}