// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument


const showTasksButton = () => document.querySelector(".show-tasks")
const submitButton = () => document.getElementById("submit-button")
const completedTasks = () => document.querySelector(".completed-tasks")
const activeTasks = () => document.querySelector(".active-tasks")

const taskTable = () => document.getElementById("task-table")   
const newTaskForm = () => document.querySelector("#new-task-form")
const formContainer = () => document.getElementById("form-container")
const taskName = () => document.getElementById("task-name")
const categoryId = () => document.getElementById("category-id")

// const checkBox = document.querySelector("input[name='checkbox']")