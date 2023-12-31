class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.references :user, foreign_key: true
      t.string :meal
      t.string :dish
      t.string :cuisine
      t.string :time_required, null: false
      t.string :servings, null: false
      t.text :ingredient_list, array: true, default: [], null: false
      t.text :directions, array: true, default: [], null: false

      t.timestamps
    end
  end
end
