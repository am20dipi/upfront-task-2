# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create!(name: "Go to carwash", category_id: 1)
Task.create!(name: "Bring Cosmo to vet", category_id: 2)
Task.create!(name: "Go to bank", category_id: 2)
Task.create!(name: "Buy groceries", category_id: 1)
Task.create!(name: "Buy Mom flowers", category_id: 1)
Task.create!(name: "Go to office hours", category_id: 1)
Task.create!(name: "Present for father's day", category_id: 1)

Category.create!(name: "Completed")
Category.create!(name: "Priority")



