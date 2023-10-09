class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
    render :index
  end

  def show
    @recipe = Recipe.find_by(id: params[:id])
    if @recipe
      render :show
    else
      render json: "Recipe not found", status: :not_found
    end
  end
end
