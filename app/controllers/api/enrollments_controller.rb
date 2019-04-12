class Api::EnrollmentsController < ApplicationController
  before_action :set_enrollment, only: [:update, :destroy]

  # def index
  # end

  # def show
  # end

  def create
    enrollment = Enrollment.new(enrollment_params)
    duplicate = Course.find(params[:course_id]).enrollments.select() {|old_enrollment| 
        enrollment.user_id === old_enrollment.id 
    }

    if(duplicate.length == 0 && enrollment.save)
      enrollment.create_attendances()
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
    @enrollment.destroy()
    render( json: "Data Deleted" )
  end

  private
  def enrollment_params
    params.require(:enrollment).permit(:role, :user_id, :course_id)
  end

  def set_enrollment
    @enrollment = Enrollment.find_by_user_and_course(params[:user_id], params[:course_id])
  end
end
