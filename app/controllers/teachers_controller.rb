class TeachersController < ApplicationController
  before_action :set_teacher, only: [:show, :edit, :update]

  def index
    @teachers = Teacher.all
  end

  def show
  end

  def edit
  end

  def update
    respond_to do |format|
      if @teacher.update(teacher_params)
        format.html { redirect_to @teacher, notice: 'Teacher was successfully updated.' }
        format.json { render :show, status: :ok, location: @teacher }
      else
        format.html { render :edit }
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_teacher
    @teacher = Teacher.find(params[:id])
  end

  def teacher_params
    params.require(:teacher).permit(:given_name, :family_name, :birth_date, :gender, :nationality, :comment, :avatar)
  end
end
