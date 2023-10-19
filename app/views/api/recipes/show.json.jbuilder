json.extract! @recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :directions

ratings = @recipe.ratings.includes(:user)
json.ratings ratings.each do |rating|
    json.extract! rating, :id, :comment, :rating, :user, :updated_at
end

json.ingredients @recipe.ingredients.each do |ingredient|
    json.extract! ingredient, :name, :amount, :metric
end

json.author @recipe.user.name

json.photoUrl "https://assets.bonappetit.com/photos/62e8025f029c78e6c977d32c/1:1/w_1920,c_limit/2022-VG-BA-PASTA-Buttered-Tomatoes-12671.jpg"
# json.photoUrl @recipe.photo.attached? ? @recipe.photo.url : nil

