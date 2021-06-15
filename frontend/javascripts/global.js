// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument

//Buttons
const buttonsDiv = () => document.getElementById("buttons")
const showTasksButton = () => document.querySelector(".show-tasks")
const deleteTaskButton = () => document.querySelector(".delete-task")
const editTaskButton = () => document.querySelector(".edit-task")
const submitButton = () => document.getElementById("submit-button")
const completedTasks = () => document.querySelector(".completed-tasks")
const activeTasks = () => document.querySelector(".active-tasks")
const priorityTasks = () => document.querySelector(".priority-tasks")

//Lists
const taskTable = () => document.getElementById("task-table")   

//Forms
const newTaskForm = () => document.querySelector("#new-task-form")
const formContainer = () => document.getElementById("form-container")
const taskName = () => document.getElementById("task-name")
const categoryId = () => document.getElementById("category-id")