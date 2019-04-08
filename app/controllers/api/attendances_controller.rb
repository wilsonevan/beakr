class Api::AttendancesController < ApplicationController
  before_action :set_course, only: [:admin_index, :create, :update]

  def index
    render json: current_user.attendances.all 
  end

  # def admin_index
  #   render json: @course.attendances.all
  # end

  def create
  end

  def update
  end

  private

  # def set_course
  #   @course = Course.find(params[:id])
  # end
end
