class UsersController < ApplicationController
  protect_from_forgery only: proc { |c| c.request.format.json? }
  before_action :set_user, only: [:update]
  before_action :authenticate_user!

  def index
  end

  def show
    @user = User.joins(:subscription).find(current_user.id)
  end

  def update
    if @user.update(user_params)
      render json: { status: :ok }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(current_user.id)
  end

  def user_params
    params.require(:user).permit(:given_name, :family_name, :birthdate, :gender, :avatar)
  end
end
