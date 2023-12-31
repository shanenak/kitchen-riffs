class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']

  def show
    if current_user
      @user = User.find(current_user.id)
      render :show
    else
      render json: {}
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password)
  end

end
