# == Schema Information
#
# Table name: recipes
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  user_id         :bigint
#  meal            :string
#  dish            :string
#  cuisine         :string
#  time_required   :string           not null
#  servings        :string           not null
#  ingredient_list :text             default([]), not null, is an Array
#  directions      :text             default([]), not null, is an Array
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Recipe < ApplicationRecord

    validates :name, :time_required, :servings, :ingredient_list, :directions, presence: true

    has_many :ingredients,
    class_name: :Ingredient,
    dependent: :destroy

    has_many :ratings, 
    dependent: :destroy

    belongs_to :user,
    dependent: :destroy

    has_one_attached :photo

    has_many :saved_by,
    dependent: :destroy,
    class_name: :SavedRecipe,
    foreign_key: :recipe_id

end
