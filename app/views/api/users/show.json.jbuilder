saved_recipes = @user.saved_recipes.includes(:recipe)

json.user do
  json.extract! @user, :id, :email, :name,:created_at, :updated_at

  json.saved_recipes do 
    saved_recipes.each do |save|
      json.set! save.id do
        json.extract! save, :recipe_id, :user_id, :notes, :tag
      end
    end
  end
  
end


