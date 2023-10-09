json.array! @recipes do |recipe|
    json.extract! recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions
end