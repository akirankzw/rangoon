class AccountSettingsController < ApplicationController
  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
  before_action :set_account_setting, only: [:update]
  before_action :authenticate_user!

  def update
    if @as.update(email_notification: !@as.email_notification)
      render json: @as
    else
      render json: { status: :unprocessable_entity }
    end
  end

  private

  def set_account_setting
    @as = current_user.account_setting
  end
  def account_setting_params
    params.require(:account_setting).permit(:email_notification)
  end
end
