# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Teacher.create(email: "nakazawa.akira@gmail.com", password: 'password')
User.create(email: "user@example.com", password: 'password')
Plan.create(title: "mo1", description: "1日1回 (週5回/月)", price: 5000)
