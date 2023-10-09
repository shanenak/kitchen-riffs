# == Schema Information
#
# Table name: recipes
#
#  id            :bigint           not null, primary key
#  name          :string           not null
#  user_id       :bigint
#  meal          :string
#  dish          :string
#  cuisine       :string
#  time_required :string           not null
#  servings      :string           not null
#  ingredients   :text             default([]), not null, is an Array
#  directions    :text             default([]), not null, is an Array
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require "test_helper"

class RecipeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
