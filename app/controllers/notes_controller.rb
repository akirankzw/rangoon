class NotesController < ApplicationController
  protect_from_forgery with: :null_session, only: proc { |c| c.request.fomat.json? }
  before_action :set_note, only: [:show, :update, :destroy]

  def index
    @notes = Note.all
  end

  def show
    render json: @note
  end

  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @note.destroy
    respond_to do |format|
      format.html { redirect_to notes_url, notice: 'Note was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_note
      @note = Note.find(params[:id])
    end

    def note_params
      params.require(:note).permit(:lesson_id, :teacher_id, :content)
    end
end
