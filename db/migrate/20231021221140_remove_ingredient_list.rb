class RemoveIngredientList < ActiveRecord::Migration[7.0]
  def change
    remove_column :recipes, :ingredient_list
  end
end
