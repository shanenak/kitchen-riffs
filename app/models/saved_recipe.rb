# == Schema Information
#
# Table name: saved_recipes
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  recipe_id  :bigint           not null
#  notes      :text
#  tag        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class SavedRecipe < ApplicationRecord

    validates :user_id, :recipe_id, presence: true

    belongs_to :user
    belongs_to :recipe
end
