class RatingsController < ApplicationController
    wrap_parameters include: Item.attribute_names + ['photoUrl', 'ratingId']

    def create
        @rating = Rating.new(rating_params)

        @rating.transaction do
            @rating.save!
            render :show
        end
    rescue
        render json: { errors: @rating.error_messages }, status: :unprocessable_entity
    end

    def update
        @rating = Rating.find(params[:id])

        @rating.transaction do
            @rating.update!(rating_params)
            render :show
        end
    rescue
        render json: { errors: @rating.error_messages }, status: :unprocessable_entity
    end

    def destroy
        id = params[:id]
        Rating.destroy(id)
        render json: { id: id.to_i }
    end

    private
    def rating_params
        params.require(:rating).permit(:user_id, :recipe_id, :comment, :rating, :photoUrl, :ratingId)
    end

end
