
recipes = @recipes.includes(:ingredients)

json.array! recipes do |recipe|
    json.extract! recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :ingredients
    json.photoUrl recipe.photo.attached? ? recipe.photo.url : nil
end