class Api::SavedRecipesController < ApplicationController

    def index
        @saved = SavedRecipe.all 
        render :index
    end
    
    def create
        @saved = SavedRecipe.new(saved_params)
        if @saved.save
            render json: @saved
        else
            render @saved.errors.full_messages
        end
    end

    def show
        @saved = SavedRecipe.find(params[:id])
        render json: @saved
    end

    def update
        @saved = SavedRecipe.find(params[:id])
        if @saved.update(saved_params)
            render json: @saved
        else
            render @saved.errors.full_messages
        end
    end

    def destroy
        @saved = SavedRecipe.find(params[:id])
        if @saved.destroy
            render json: {id: @saved.id}
        else
            render @saved.errors.full_messages
        end
    end

    private
    def saved_params
        params.require(:save).permit(:user_id, :recipe_id, :notes, :tag)
    end

end
