class CreateIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|
      t.string :name, null: false, index: {unique: true}
      t.references :recipe, null: false, foreign_key: true
      t.string :amount
      t.string :metric

      t.timestamps
    end
  end
end
