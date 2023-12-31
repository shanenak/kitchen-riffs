saved_recipes = @user.saved_recipes.includes(:recipe)

saved_recipes.each do |save|
    json.set! save.id do
        json.extract! save, :id, :user_id, :notes, :tag
        json.recipe do 
            json.extract! save.recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
            json.photoUrl save.recipe.photo.attached? ? save.recipe.photo.url : nil
        end
    end
end
