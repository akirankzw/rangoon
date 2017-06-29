# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Teacher.create(
  email: "nakazawa.akira@gmail.com",
  password: 'password',
  comment: <<HEREDOC
Lorem ipsum dolor sit amet, pede a libero aenean phasellus, lectus metus sint ut risus,
fusce vel in pellentesque. Nisl rutrum etiam morbi consectetuer tempor magna, aenean nullam
nunc id, neque vivamus interdum sociis nulla scelerisque sem, dolor id wisi turpis magna
aliquam magna. Risus accumsan hac eget etiam donec sed, senectus erat mattis quam, tempor
vel urna occaecat cras, metus urna augue nec at. Et morbi amet dui praesent, nec eu at,
ligula ipsum dui sollicitudin, quis nisl massa viverra ligula, mauris fermentum orci arcu
enim fringilla. Arcu erat nulla in aenean lacinia ullamcorper, urna ante nam et sagittis,
tristique vehicula nibh ipsum vivamus, proin proin. Porta commodo nibh quis libero amet.
Taciti dui, sapien consectetuer.
HEREDOC
)
User.create(email: "user@example.com", password: 'password')
Plan.create(title: "mo1", description: "1日1回 (週5回/月)", price: 5000)
