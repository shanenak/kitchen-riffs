
recipes = @recipes.includes(:ingredients)

json.array! recipes do |recipe|
    json.extract! recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :ingredients
    json.photoUrl "https://assets.bonappetit.com/photos/601887f44f4390f3e650dec0/1:1/w_2240,c_limit/Musang-Pancit-Canton.jpg"
    # json.photoUrl recipe.photo.attached? ? recipe.photo.url : nil
end