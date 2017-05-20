class LessonsController < ApplicationController
  protect_from_forgery with: :exception, with: :null_session, only: Proc.new { |c| c.request.format.json? }
  before_action :authenticate_teacher!, only: [:create]
  before_action :set_lesson, only: [:show, :edit, :update, :destroy]

  def index
    @lessons = Lesson.all
  end

  def show
  end

  def new
    @lesson = Lesson.new
  end

  def edit
  end

  def create
    teacher = Teacher.find(1)
    @lesson = Lesson.find_or_initialize_by(teacher_id: teacher.id, start_time: Time.zone.parse(lesson_params[:start_time]))

    if @lesson.persisted?
      @lesson.update(canceled: lesson_params[:canceled])
    else
      @lesson.save
    end

    respond_to do |format|
      if @lesson.errors.empty?
        format.json { render json: @lesson }
      else
        format.json { render json: @lesson.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @lesson.update(lesson_params)
        format.html { redirect_to @lesson, notice: 'Lesson was successfully updated.' }
        format.json { render :show, status: :ok, location: @lesson }
      else
        format.html { render :edit }
        format.json { render json: @lesson.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @lesson.destroy
    respond_to do |format|
      format.html { redirect_to lessons_url, notice: 'Lesson was successfully destroyed.' }
      format.json { head :no_content }
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
