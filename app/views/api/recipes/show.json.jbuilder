ratings = @recipe.ratings.includes(:user)


json.extract! @recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
json.ratings ratings.each do |rating|
    json.extract! rating, :id, :comment, :rating, :user, :updated_at
end


json.ingredients @recipe.ingredients.each do |ingredient|
    json.extract! ingredient, :name, :amount, :metric
end

json.author @recipe.user.name

json.photoUrl @recipe.photo.attached? ? @recipe.photo.url : nil

