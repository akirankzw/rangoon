class Admin::UsersController < ApplicationController
  before_action :authenticate_teacher!

  def index
    @users = User.includes(:subscription)
  end
end
