class TaskApi {
    static fetchTasks() {
        // 1. fetch from handleClick in index.js
        // 2. change secondary .then() to iterate through each json instance
        // 3. 
        //  (json => json.forEach(taskObj => new Task(taskObj)))
    }

    static handleError(error) {
        console.log(error)
    }
}