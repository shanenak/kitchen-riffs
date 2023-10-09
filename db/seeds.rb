# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'csv'
require 'json'

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    email: 'demo@user.io', 
    name: 'Demo User',
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      email: Faker::Internet.unique.email,
      name: Faker::Name.name,
      password: 'password'
    }) 
  end

  # Read from CSVs (reference: https://warrenniu.medium.com/how-to-seed-a-rails-database-with-a-csv-file-6ac24e2bbd90)
  recipe_text = File.read(Rails.root.join('lib', 'seeds', 'recipes.csv'))
  recipes = CSV.parse(recipe_text, headers:true, encoding:'ISO-8859-1')
  recipes.each do |row|
    puts row
    t = Recipe.new
    t.id = row['recipe_id']
    t.name = row['name']
    t.user_id = row['user_id']
    t.meal = row['meal']
    t.dish = row['dish']
    t.cuisine = row['cuisine']
    t.time_required = row['time_required']
    t.servings = row['servings']
    t.ingredients = JSON.parse(row['ingredients'])
    t.directions = row['directions']
    t.save
  end

  puts "Done!"
end