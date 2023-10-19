class Api::RatingsController < ApplicationController
    wrap_parameters include: Rating.attribute_names + ['ratingId']
    
    def create
        @rating = Rating.new(rating_params)
        if @rating.save
            @recipe = @rating.recipe
            render 'api/recipes/show'
        else
            render @rating.errors.full_messages
        end
    end

    def update
        @rating = Rating.find(params[:id])

        @rating.transaction do
            @rating.update!(rating_params)
            @recipe = @rating.recipe
            render 'api/recipes/show'
        end
    rescue
        render json: { errors: @rating.errors.full_messages }, status: :unprocessable_entity
    end

    def destroy
        @rating = Rating.find(params[:id])
        @recipe = @rating.recipe
        @rating.destroy
        render 'api/recipes/show'
    end

    private
    def rating_params
        params.require(:rating).permit(:user_id, :recipe_id, :comment, :rating, :ratingId)
    end

end
