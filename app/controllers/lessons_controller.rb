class LessonsController < ApplicationController
  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
  before_action :authenticate_teacher!, only: [:create]

  def index
    @lessons = Lesson
               .left_joins(:book, book: :user)
               .includes(:book, book: :user)
               .this_week(Time.zone.now)
  end

  # TODO
  def today
    @lessons = Lesson.includes(:note, :book).today(Time.zone.now)
  end

  def create
    @lesson = Lesson.find_or_initialize_by(
      teacher_id: current_teacher.id, start_at: Time.zone.parse(lesson_params[:start_at])
    )
    # guard
    return render json: @lesson if @lesson.book.present?
    return render json: @lesson if (@lesson.start_at - 3.hours) < Time.zone.now

    # TODO
    if @lesson.persisted?
      @lesson.update(aasm_state: @lesson.opened? ? 'closed' : 'opened')
    else
      @lesson.save
    end

    if @lesson.errors.empty?
      render json: @lesson
    else
      render json: @lesson.errors, status: :unprocessable_entity
    end
  end

  private

  def set_lesson
    @lesson = Lesson.find(params[:id])
  end

  def lesson_params
    params.require(:lesson).permit(:teacher_id, :start_at, :aasm_state)
  end
end
