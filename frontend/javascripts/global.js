// 1. Declaring "getter" Functions
    // calling on the document object to retrieve the element classified under the specified argument


const showTasksButton = () => document.querySelector(".show-tasks")
const submitButton = () => document.getElementById("submit-button")
const completedTasks = () => document.querySelector(".completed-tasks")
const activeTasks = () => document.querySelector(".active-tasks")
const miscTasks = () => document.querySelector(".misc-tasks")
const workTasks = () => document.querySelector(".work-tasks")
const schoolTasks = () => document.querySelector(".school-tasks")

const taskTable = () => document.getElementById("task-table")   
const newTaskForm = () => document.querySelector("#new-task-form")
const formContainer = () => document.getElementById("form-container")
const taskName = () => document.getElementById("task-name")
const taskCategory = () => document.getElementById("category_id")
const taskCompleted = () => document.getElementById("task-completed")