json.user do
  json.extract! @user, :id, :email, :name, :saved_recipes, :created_at, :updated_at
end