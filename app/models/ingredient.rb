# == Schema Information
#
# Table name: ingredients
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  recipe_id  :bigint           not null
#  amount     :string
#  metric     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Ingredient < ApplicationRecord

    validates :name, :recipe_id, presence: true

    belongs_to :recipe

end
