class RemoveIndexFromIngredients < ActiveRecord::Migration[7.0]
  def change
    remove_index "ingredients", column: [:name]
  end
end
