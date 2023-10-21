json.extract! @saved, :id, :user_id, :notes, :tag
json.recipe do 
    json.extract! @saved.recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
    # json.photoUrl @saved.recipe.photo.attached? ? save.recipe.photo.url : nil
    json.photoUrl "https://assets.bonappetit.com/photos/601887f44f4390f3e650dec0/1:1/w_2240,c_limit/Musang-Pancit-Canton.jpg"

end
