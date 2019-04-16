class Api::AssignmentSubmissionsController < ApplicationController
  before_action :set_assignment
  before_action :set_enrollment, only: [:create]
  before_action :set_assignment_submission, only: [:show, :update, :destroy, :find_user]

  def index
    render json: @assignment.assignment_submissions
  end

  def find_user
    render json: @assignment_submission.enrollment.user
  end

  def show
    render json: @assignment_submission 
  end

  def create
    assignment_submission = @assignment.assignment_submissions.new(
      url: params[:url],
      body: params[:body],
      code: params[:code],
      enrollment_id: @enrollment.id
    )

    if assignment_submission.save 
      render json: assignment_submission
    else
      render json: assignment_submission.errors, status: 422
    end 
  end

  def update
    if @assignment_submission.update(assignment_submission_params)
      render json: @assignment_submission
    else
      render json: @assignment_submission.errors, status: 422
    end
  end

  def destroy
    @assignment_submission.destroy
  end

  private
  def set_assignment
    @assignment = Assignment.find(params[:assignment_id])
  end

  def set_enrollment
    @enrollment = Enrollment.find_by_user_and_course(current_user.id, params[:course_id])
  end

  def set_assignment_submission
    @assignment_submission = @assignment.assignment_submissions.find(params[:id])
  end

  def assignment_submission_params
    params.require(:assignment_submission).permit(:grade, :url, :body, :code)
  end
end
