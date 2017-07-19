class Admin::TeachersController < ApplicationController
  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
  before_action :set_teacher, only: [:show, :update]
  before_action :authenticate_teacher!

  def index
  end

  def show
  end

  def update
    respond_to do |format|
      if @teacher.update(teacher_params)
        format.html { redirect_to dashboard_admin_teachers_url } # TODO
        format.json { render json: { status: :ok } }
      else
        format.html { redirect_to dashboard_admin_teachers_url } # TODO
        format.json { render json: { status: :unprocessable_entity } }
      end
    end
  end

  private

  def set_teacher
    @teacher = Teacher.find(current_teacher.id)
  end

  def teacher_params
    params.require(:teacher).permit(:given_name, :family_name, :birthdate, :skype_name, :gender, :avatar, :timezone, :comment)
  end
end
