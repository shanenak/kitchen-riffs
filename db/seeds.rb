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

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('recipes')
ActiveRecord::Base.connection.reset_pk_sequence!('ingredients')
ActiveRecord::Base.connection.reset_pk_sequence!('ratings')
ActiveRecord::Base.connection.reset_pk_sequence!('saved_recipes')
puts "Reset all primary keys"

# Read from CSVs (reference: https://warrenniu.medium.com/how-to-seed-a-rails-database-with-a-csv-file-6ac24e2bbd90)
puts "Creating users and recipes..."
users = read_CSV('users')
recipes = read_CSV('recipes')
ingredients = read_CSV('ingredients')

users.each do |user_row|
  puts user_row['name']
  user_information = {
    # id: user_row['user_id'],
    name: user_row['name'],
    email: Faker::Internet.unique.email,
    password: 'password'
  }
  new_user = User.create(user_information)

  recipes.each do |recipe_row|

    if recipe_row['user_id'] == user_row['user_id']
      
      # clean directions 
      string_representation = recipe_row['directions'].gsub(/^'|'$/, "").gsub("\\'", "'")
      directions_array = eval(string_representation)

      recipe_information = {
        name: recipe_row['name'],
        user_id: new_user.id,
        meal: recipe_row['meal'],
        dish: recipe_row['dish'],
        cuisine: recipe_row['cuisine'],
        time_required: recipe_row['time_required'],
        servings: recipe_row['servings'],
        directions: directions_array,
      }
      new_recipe = Recipe.create(recipe_information)

      if new_recipe.name == "Vibrant Green Detox Smoothie"
        puts recipe_row
      end

      # new_recipe.photo.attach(
      #   io: URI.open("https://kitchen-riffs-seeds.s3.us-west-1.amazonaws.com/recipe_#{(recipe_row['recipe_id']).to_s}.webp"),
      #   filename: "recipe_#{(recipe_row['recipe_id']).to_s}.webp"
      # )

      ingredients.each do |ingredient_row|
        if ingredient_row['recipe_id'] == recipe_row['recipe_id']
          ingredient_information = {
            name: ingredient_row['name'],
            recipe_id: new_recipe.id,
            amount: ingredient_row['amount'],
            metric: ingredient_row['metric'],
          }
          new_ingredient = Ingredient.create(ingredient_information)
        end
      end
    end
  end
end


puts "Creating ratings..."
ratings = read_CSV('ratings')

recipes.each do |recipe_row|
  ratings.each do |rating_row|
    if recipe_row['recipe_id'] == rating_row['recipe_id']
      rating_information = {
        user_id: rand(1..User.count),
        recipe_id: Recipe.find_by(name: recipe_row['name']).id,
        comment: rating_row['comment'],
        rating: rating_row['rating']
      }
    end
    new_rating = Rating.create(rating_information)
  end
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
