json.extract! @recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions

json.ingredients @recipe.ingredients.each do |ingredient|
    json.extract! ingredient, :name, :amount, :metric
end

json.author @recipe.user.name

json.photoUrl @recipe.photo.attached? ? @recipe.photo.url : nil

json.ratings @recipe.ratings