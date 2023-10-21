saved_recipes = @user.saved_recipes.includes(:recipe)

saved_recipes.each do |save|
    json.set! save.id do
    json.extract! save, :id, :user_id, :notes, :tag
    json.recipe do 
        json.extract! save.recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
        # json.photoUrl save.recipe.photo.attached? ? save.recipe.photo.url : nil
        json.photoUrl "https://assets.bonappetit.com/photos/601887f44f4390f3e650dec0/1:1/w_2240,c_limit/Musang-Pancit-Canton.jpg"

    end
    end
end
