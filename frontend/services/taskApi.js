// services -- connection to the backend
class TaskApi {
    static fetchTasks() {
        fetch('http://localhost:3000/tasks')
        .then(resp => resp.json())
        .then(json => {
            json.data.forEach(({attributes}) => {
                const task = new Task(attributes)
                task.render()
            })
        })
        .catch(handleError)
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
            alert("Successfully Deleted")
            e.target.parentElement.parentElement.remove()
        })
        .catch(handleError)
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
        .catch(handleError)
    }

    static handleActiveTasks(){
        fetch("http://localhost:3000/tasks")
        .then(resp => resp.json())
        .then(json => {
            taskTable().innerHTML = ""
            Task.renderActiveTasks(json)
        })
        .catch(handleError)
    }

    static handleCompletedTasks() {
        fetch("http://localhost:3000/tasks")
        .then(resp => resp.json())
        .then(json => {
            taskTable().innerHTML = ""
            Task.renderCompletedTasks(json)
        })
        .catch(handleError)
    }

    static handleMiscTasks(){
        fetch("http://localhost:3000/tasks")
        .then(resp => resp.json())
        .then(json => {
            taskTable().innerHTML = ""
            Task.renderMiscTasks(json)
        })
        .catch(handleError)
    }

    static handleWorkTasks(){
        fetch("http://localhost:3000/tasks")
        .then(resp => resp.json())
        .then(json => {
            taskTable().innerHTML = ""
            Task.renderWorkTasks(json)
        })
        .catch(handleError)
    }

    static handleSchoolTasks() {
        fetch("http://localhost:3000/tasks")
        .then(resp => resp.json())
        .then(json => {
            taskTable().innerHTML = ""
            Task.renderSchoolTasks(json)
        })
        .catch(handleError)
    }

}
