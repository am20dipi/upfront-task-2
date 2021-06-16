class TaskApi {
    static fetchTasks() {
        // 1. fetch from handleClick in index.js
        // 2. change secondary .then() to iterate through each json instance
        // 3. render ?
        fetch('http://localhost:3000/tasks')
        .then(resp => resp.json())
        .then(json => renderTasks(json))
        .catch(handleError)
        // fetch takes in an endpoint as an argument
        // fetch returns Promise objects
        // taking the response object and parsing it to readable format
        
    }

    static handleError(error) {
        console.log(error)
    }
}


//json.forEach(taskObject => new Task(taskObject))