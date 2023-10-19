saved_recipes = @user.saved_recipes.includes(:recipe)

json.user do
  json.extract! @user, :id, :email, :name,:created_at, :updated_at

  json.saved_recipes do 
    saved_recipes.each do |save|
      json.set! save.id do
        json.extract! save, :id, :user_id, :notes, :tag
        json.recipe do 
          json.extract! save.recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
          json.photoUrl "https://assets.bonappetit.com/photos/62e8025f029c78e6c977d32c/1:1/w_1920,c_limit/2022-VG-BA-PASTA-Buttered-Tomatoes-12671.jpg"
          # json.photoUrl save.recipe.photo.attached? ? save.recipe.photo.url : nil
        end
      end
    end
  end

end


