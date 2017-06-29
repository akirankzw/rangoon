class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  around_action :set_time_zone, if: :operator
  rescue_from ActionController::UnknownFormat, with: :redirect_to_dashboard

  private

  def operator
    current_user || current_teacher
  end

  def set_time_zone
    Time.use_zone(operator.timezone) { yield }
  end

  def redirect_to_dashboard
    redirect_to dashboard_admin_teachers_url if teacher_signed_in?
    redirect_to dashboard_users_url
  end
end
