class UsersController < ApplicationController
  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
  before_action :set_user, only: [:update]
  before_action :authenticate_user!

  def index
  end

  def show
    @user = User.joins(:subscription, :account_setting).find(current_user.id)
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to dashboard_users_url } # TODO
        format.json { render json: { status: :ok } }
      else
        format.html { redirect_to dashboard_users_url } # TODO
        format.json { render json: { status: :unprocessable_entity } }
      end
    end
  end

  private

  def set_user
    @user = User.find(current_user.id)
  end

  def user_params
    params.require(:user).permit(:given_name, :family_name, :birthdate, :skype_name, :gender, :avatar, :timezone)
  end
end
