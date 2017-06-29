class NotesController < ApplicationController
  protect_from_forgery with: :null_session, only: proc { |c| c.request.fomat.json? }
  before_action :set_note, only: [:show, :update, :destroy]

  def show
    render json: @note
  end

  def update
    @note.lesson.aasm_finish do
      Note.transaction do
        # if @note.update(note_params)
        if @note.update_attributes(teacher_id: current_teacher.id, content: note_params[:content])
          render json: { aasm_state: @note.lesson.aasm_state }
        else
          render json: @note.errors, status: :unprocessable_entity
        end
      end
      @note.lesson.update({})
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
