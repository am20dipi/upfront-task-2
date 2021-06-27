// services -- connection to the backend


class TaskApi {
    static fetchTasks() {
        // 1. fetch from handleClick in index.js
        // 2. change secondary .then() to iterate through each json instance
        // 3. render ?
        fetch('http://localhost:3000/tasks')
        .then(resp => resp.json())
        .then(json => {
            json.data.forEach(({attributes}) => {
                const task = new Task(attributes)

                task.render()
            })
        })
        .catch(handleError)
        // fetch takes in an endpoint as an argument
        // fetch returns Promise objects
        // taking the response object and parsing it to readable format
        
    }

    static handleError(error) {
        console.log(error)
    }

    static handleDelete(e) {
        fetch(`http://localhost:3000/tasks/${e.target.dataset.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json'

        }
        })
        .then(resp => {
            //debugger
            alert("Successfully Deleted")
            e.target.parentElement.parentElement.remove()
        })
    }


    static handleUpdate(e) {
        const updateData = {
            name: e.target.parentElement.parentElement.querySelector("#task-name").value
        }
        fetch(`http://localhost:3000/tasks/${e.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
    
            },
            body: JSON.stringify(updateData)
                
            })
            .then(resp => resp.json())
            .then(json => {
                alert("Successfully Updated")
                const task = Task.findById(json.id)
                task.update(json)
                task.replaceElement(e.target.parentElement.parentElement)
            })
        }

}
