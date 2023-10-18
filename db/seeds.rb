# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'csv'
require 'json'
require 'open-uri'

def read_CSV(table)
  text_table = File.read(Rails.root.join('lib', 'seeds', "#{table}.csv"))
  df = CSV.parse(text_table, headers:true)
  return df
end


puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
Ingredient.destroy_all
Rating.destroy_all
SavedRecipe.destroy_all
Recipe.destroy_all
User.destroy_all

# puts "Resetting primary keys..."
# # For easy testing, so that after seeding, the first `User` has `id` of 1
# ActiveRecord::Base.connection.reset_pk_sequence!('users')
# ActiveRecord::Base.connection.reset_pk_sequence!('recipes')
# ActiveRecord::Base.connection.reset_pk_sequence!('ingredients')
# ActiveRecord::Base.connection.reset_pk_sequence!('ratings')
# ActiveRecord::Base.connection.reset_pk_sequence!('saved_recipes')
# puts "Reset all primary keys"

# Read from CSVs (reference: https://warrenniu.medium.com/how-to-seed-a-rails-database-with-a-csv-file-6ac24e2bbd90)
puts "Creating users..."
users = read_CSV('users')
users.each do |row|
  t = User.new
  t.id = row['user_id']
  t.name = row['name']
  t.email = Faker::Internet.unique.email
  t.password = 'password'
  t.save!
end

puts "Creating recipes..."
recipes = read_CSV('recipes')
recipes.each do |row|
  t = Recipe.new
  t.id = row['recipe_id']
  t.name = row['name']
  t.user_id = row['user_id']
  t.meal = row['meal']
  t.dish = row['dish']
  t.cuisine = row['cuisine']
  t.time_required = row['time_required']
  t.servings = row['servings']
  t.ingredient_list = JSON.parse(row['ingredients'])
  # additional processing needed for the combination of double quotes and single quotes
  string_representation = row['directions'].gsub(/^'|'$/, "").gsub("\\'", "'")
  directions_array = eval(string_representation)
  t.directions = directions_array
  t.save!
end

Recipe.all.each do |recipe|
  recipe.photo.attach(
    io: URI.open("https://kitchen-riffs-seeds.s3.us-west-1.amazonaws.com/recipe_#{(recipe.id).to_s}.webp"),
    filename: "recipe_#{(recipe.id).to_s}.webp"
  )
end

puts "Creating ingredients..."
ingredients = read_CSV('ingredients')
ingredients.each do |row|
  t = Ingredient.new
  t.id = row['ingredient_id']
  t.name = row['name']
  t.recipe_id = row['recipe_id']
  t.amount = row['amount']
  t.metric = row['metric']
  t.save!
end

puts "Creating ratings..."
ratings = read_CSV('ratings')
ratings.each do |row|
  t = Rating.new
  t.id = row['rating_id']
  t.user_id = row['user_id']
  t.recipe_id = row['recipe_id']
  t.comment = row['comment']
  t.rating = row['rating']
  t.save!
end

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('recipes')
ActiveRecord::Base.connection.reset_pk_sequence!('ingredients')
ActiveRecord::Base.connection.reset_pk_sequence!('ratings')
ActiveRecord::Base.connection.reset_pk_sequence!('saved_recipes')

puts "Creating demo user to sign in..."
# Create one user with an easy to remember username, email, and password:
User.create!(
  email: 'demo@user.io', 
  name: 'Demo User',
  password: 'password'
)

puts "Done!"
