// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument

const buttonsDiv = () => document.getElementById("buttons")
const showTasksButton = () => document.getElementById("show-tasks")
const addTaskButton = () => document.getElementById("add-task")
const deleteTaskButton = () => document.getElementById("delete-task")
const editTaskButton = () => document.getElementById("edit-task")


const listDiv = () => document.getElementById("list")
const ulTaskList = () => document.getElementById("task-list")    