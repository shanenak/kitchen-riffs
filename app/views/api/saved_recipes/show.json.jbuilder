json.extract! @saved, :id, :user_id, :notes, :tag
json.recipe do 
    json.extract! @saved.recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
    json.photoUrl @saved.recipe.photo.attached? ? @saved.recipe.photo.url : nil
end
