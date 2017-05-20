class LessonsController < ApplicationController
  protect_from_forgery with: :exception, with: :null_session, only: Proc.new { |c| c.request.format.json? }
  before_action :authenticate_teacher!, only: [:create]
  before_action :set_lesson, only: [:show]

  def index
    @lessons = Lesson.all
  end

  def show
  end

  def create
    @lesson = Lesson.find_or_initialize_by(teacher_id: current_teacher.id, start_time: Time.zone.parse(lesson_params[:start_time]))

    if @lesson.persisted?
      @lesson.update(canceled: lesson_params[:canceled])
    else
      @lesson.save
    end

    if @lesson.errors.empty?
      render :create
    else
      render json: @lesson.errors, status: :unprocessable_entity
    end
  end

  private
    def set_lesson
      @lesson = Lesson.find(params[:id])
    end

    def lesson_params
      params.require(:lesson).permit(:teacher_id, :start_time, :attended, :canceled, :missed)
    end
end
