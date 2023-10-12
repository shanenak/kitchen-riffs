json.ratings recipe.ratings.each do |rating|
    json.extract! rating, :comment, :rating, :user
end