json.array! @recipes do |recipe|
    json.extract! recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
    json.photoUrl recipe.photo.attached? ? recipe.photo.url : nil

    json.ratings recipe.ratings.each do |rating|
        json.extract! rating, :comment, :rating, :user
    end
end