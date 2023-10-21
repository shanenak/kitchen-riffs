json.extract! @recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :directions

ratings = @recipe.ratings.includes(:user)
json.ratings ratings.each do |rating|
    json.extract! rating, :id, :comment, :rating, :user, :updated_at
end

json.ingredients @recipe.ingredients.each do |ingredient|
    json.extract! ingredient, :name, :amount, :metric
end

json.author @recipe.user.name

json.photoUrl "https://assets.bonappetit.com/photos/601887f44f4390f3e650dec0/1:1/w_2240,c_limit/Musang-Pancit-Canton.jpg"
# json.photoUrl @recipe.photo.attached? ? @recipe.photo.url : nil

