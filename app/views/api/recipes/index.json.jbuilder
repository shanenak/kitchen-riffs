
recipes = @recipes.includes(:ingredients)

json.array! recipes do |recipe|
    json.extract! recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :ingredients
    json.photoUrl "https://assets.bonappetit.com/photos/62e8025f029c78e6c977d32c/1:1/w_1920,c_limit/2022-VG-BA-PASTA-Buttered-Tomatoes-12671.jpg"
    # json.photoUrl recipe.photo.attached? ? recipe.photo.url : nil
end