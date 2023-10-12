class Api::RatingsController < ApplicationController
    wrap_parameters include: Rating.attribute_names + ['ratingId']
    
    def create
        @rating = Rating.new(rating_params)
        puts @rating
        if @rating.save
            response = {}
            response[:comment] = @rating.comment
            response[:rating] = @rating.rating
            response[:user] = @rating.user
            response[:recipe_id] = @rating.recipe_id
            render json: response
        else
            render @rating.errors.full_messages
        end
    end

    def update
        @rating = Rating.find(params[:id])

        @rating.transaction do
            @rating.update!(rating_params)
            render json: @rating
        end
    rescue
        render json: { errors: @rating.errors.full_messages }, status: :unprocessable_entity
    end

    def destroy
        id = params[:id]
        Rating.destroy(id)
        render json: { id: id.to_i }
    end

    private
    def rating_params
        params.require(:rating).permit(:user_id, :recipe_id, :comment, :rating, :ratingId)
    end

end
