class Api::SavedRecipesController < ApplicationController

    def index
        if current_user
            @user = User.find(current_user.id)
            render :index
        else
            render json: {}
        end
    end
    
    def create
        @saved = SavedRecipe.new(saved_params)
        if @saved.save
            render :show
        else
            render @saved.errors.full_messages
        end
    end

    def show
        @saved = SavedRecipe.find(params[:id])
        render :show
    end

    def update
        @saved = SavedRecipe.find(params[:id])
        if @saved.update(saved_params)
            render :show
        else
            render @saved.errors.full_messages
        end
    end

    def destroy
        @saved = SavedRecipe.find(params[:id])
        if !@saved.destroy
            render @saved.errors.full_messages
        end
    end

    private
    def saved_params
        params.require(:save).permit(:user_id, :recipe_id, :notes, :tag)
    end

end
