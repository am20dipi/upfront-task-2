class Category {
   static all = []
    

    constructor({name, id, tasks = []}){
        this.name = name
        this.id = id
        Category.all.push(this)
    }

    static getAll() {
        return this.all
    }

    static findByName(name) {
        return this.all.find(function(category) { category.name === name})
    }
 
     static findById(id) {
         return this.all.find(category => category.id === id)
    }

    /* addToDropDown() {
        const option = document.createElement("option")
        option.value = this.id
        option.innerText = this.name
        taskCategory().append(option)
    }

    render() {
        const h4 = document.createElement("h4")
        const a = document.createElement("a")
        a.id = `category-${this.id}`
        a.innerText = this.name
        h4.appendChild(a)
        taskCategory().appendChild(h4)
    }  */

 


}