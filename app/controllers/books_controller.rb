class BooksController < ApplicationController
  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
  before_action :authenticate_user!
  before_action :registered?, only: [:create]

  def index
    @lessons = Lesson.joins(:book, :teacher).includes(:book, :teacher).where(Book.arel_table[:user_id].eq(current_user.id))
  end

  def show
  end

  def create
    lesson = Lesson.find(book_params[:lesson_id])
    return render json: { status: :no_lesson_found, message: 'レッスンが見つかりませんでした' } if lesson.nil?
    @book = Book.find_or_initialize_by(lesson_id: book_params[:lesson_id])

    if Book.over_booking(@book, current_user.id).count != 0
      return render json: { status: :no_lesson_found, message: 'すでに他の時間帯でレッスンを予約済みです' }
    end

    if !@book.user_id.nil? && @book.canceled == false
      return render json: { status: :booked, message: 'このレッスンはすでに予約されています' }
    end
    @book.update_attributes(user_id: current_user.id, comment: book_params[:comment])

    if @book.errors.empty?
      render json: { status: :ok, user_id: @book.user_id, message: 'レッスンを予約しました' }
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.require(:book).permit(:lesson_id, :comment)
  end

  def registered?
    return render json: { status: :not_registered, message: 'お申し込みの確認できませんでした' } if current_user.subscription.end_date.nil?
    return render json: { status: :expired, message: 'お申し込み更新の確認できませんでした' } if current_user.subscription.end_date < Time.zone.now
  end
end
