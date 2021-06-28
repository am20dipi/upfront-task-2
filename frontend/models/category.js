class Category {
    static all = []
    static dropDownOptions = []

    constructor({name, id, products = []}){
        this.name = name
        this.id = id
        // this.products = products
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

    addToDropDown() {
        const option = document.createElement("option")
        option.value = this.id
        option.innerText = this.name
        productSelectCategory().append(option)
    }

    render() {
        const h4 = document.createElement("h4")
        const a = document.createElement("a")
        a.id = `category-${this.id}`
        a.innerText = this.name
        a.href = "####"
        a.addEventListener("click", this.render)
        h4.appendChild(a)
        categoriesSection().appendChild(h4)
    }

 


}