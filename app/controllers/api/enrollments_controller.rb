class Api::EnrollmentsController < ApplicationController
  before_action :set_enrollment, only: [:update, :destroy]

  # def index
  # end

  # def show
  # end

  def create
    enrollment = Enrollment.new(enrollment_params)
    if enrollment.save
      render json: enrollment
    else
      render json: enrollment.errors, status: 422
    end
  end

  def update
    if @enrollment.update
      render json: @enrollment
    else
      render json: @enrollment.errors, status: 422
    end
  end

  def destroy
    @enrollment.delete
  end

  private
  def enrollment_params
    params.require(:enrollment).permit(:role, :user_id, :course_id)
  end
end
