class CategoryApi {
    static url = `${baseUrl}/categories`

    static fetchCategories() {
        fetch(this.url)
        .then(resp => resp.json())
        .then(json => json.forEach(catObj => {
            let cat = Category.findOrCreateBy(catObj)
            cat.addToDropDown()
            cat.render()
        }))
        // .then(() => Category.render())
        .catch(this.handleError)
    }

}