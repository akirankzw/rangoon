class UsersController < ApplicationController
  before_action :set_user, only: [:update]
  before_action :authenticate_user!

  def index
  end

  def show
    @user = User.joins(:registration).find(current_user.id)
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to dashboard_users_path, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_user
    @user = User.find(current_user.id)
  end

  def user_params
    params.require(:user).permit(:given_name, :family_name, :birthdate, :sex, :avatar)
  end
end
