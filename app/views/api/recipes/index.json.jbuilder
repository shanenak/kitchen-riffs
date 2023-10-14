
json.array! @recipes do |recipe|
    json.extract! recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
    json.photoUrl recipe.photo.attached? ? recipe.photo.url : nil
    
    ratings = recipe.ratings.includes(:user)
    json.ratings ratings.each do |rating|
        json.extract! rating, :id, :comment, :rating, :user, :updated_at
    end
end