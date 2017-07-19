class Users::NotesController < ApplicationController
  before_action :set_note
  before_action :authenticate_user!

  def show
    render json: @note
  end

  private
    def set_note
      @note = Note.find(params[:id])
    end
end
