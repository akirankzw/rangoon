class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  around_action :set_time_zone, if: :operator

  private

  def operator
    current_user || current_teacher
  end

  def set_time_zone
    Time.use_zone(operator.timezone) { yield }
  end
end
