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
require "test_helper"

class SavedRecipeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
