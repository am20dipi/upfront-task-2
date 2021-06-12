# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create!(name: "Go to carwash", due_date: "", completed: true)
Task.create!(name: "Bring Cosmo to vet", due_date: "Monday July 12 at 12:30pm", completed: false)
Task.create!(name: "Go to bank", due_date: "Tuesday", completed: false)
Task.create!(name: "Buy groceries", due_date: "", completed: false)
Task.create!(name: "Buy Mom flowers", due_date: "", completed: false)
Task.create!(name: "Go to office hours", due_date: "Friday 6pm-8pm", completed: false)
Task.create!(name: "Present for father's day", due_date: "Sunday June 20th", completed: false)



TaskNote.create!(content: "Auto Shine is having a sale on full carwashes.", task_id: 1)
TaskNote.create!(content: "Bring cash for tip!", task_id: 1)
TaskNote.create!(content: "Vet located @ 111 Terry Rd., Bring vaccination records.", task_id: 2)
TaskNote.create!(content: "Get cash for bills", task_id: 3)
TaskNote.create!(content: "Oatmilk, bread, strawberries", task_id: 4)
TaskNote.create!(content: "Also bananas and coffee", task_id: 4)
TaskNote.create!(content: "Mom loves lilacs & tulips", task_id: 5)
TaskNote.create!(content: "Ask about destructuring", task_id: 6)
TaskNote.create!(content: "Maybe a new fishing pole?", task_id: 7)