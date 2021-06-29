class CategoryApi {
    static fetchCategoriesForSelect(e) {
        if (e.target.matches('.dropdown')) {
            fetch('http://localhost:3000/categories')
                .then(resp => resp.json())
                .then(json => json.data.map(({attributes}) => `<option value="${attributes.id}">${attributes.name}</option>`))
                .then(collection => document.querySelector("select#category_id").innerHTML = collection.join(" "))
        }
    }


}