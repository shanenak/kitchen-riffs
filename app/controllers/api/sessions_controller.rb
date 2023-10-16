class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = User.find(current_user.id)
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_email(params[:email], params[:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.']}, status: 422
    end
  end

  def destroy
    logout! if current_user
    render json: { message: 'success' }
  end
end
