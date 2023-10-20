json.extract! @saved, :id, :user_id, :notes, :tag
json.recipe do 
    json.extract! @saved.recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
    json.photoUrl "https://assets.bonappetit.com/photos/62e8025f029c78e6c977d32c/1:1/w_1920,c_limit/2022-VG-BA-PASTA-Buttered-Tomatoes-12671.jpg"
    # json.photoUrl @saved.recipe.photo.attached? ? save.recipe.photo.url : nil
end
