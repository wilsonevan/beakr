class Api::AssignmentSubmissionsController < ApplicationController
  before_action :set_assignment
  before_action :set_assignment_submission, only: [:show, :update, :destroy]

  def index
    render json: @assignment.assignment_submissions
  end

  def show
    render json: @assignment_submission 
  end

  def create
    assignment_submission = @assignment.assignment_submissions.new(assignment_submission_params)

    if assignment_submission.save 
      render json: assignment_submission
    else
      render json: assignment_submission.errors, status: 422
    end 
  end

  def update
    if @assignment_submission(assignment_submission_params).update
      render json: assignment_submission
    else
      render json: assignment_submission.errors, status: 422
    end
  end

  def destroy
    @assignment_submission.destroy
  end

  private
  def set_assignment
    @assignment = Assignment.find(params[assignment_id])
  end

  def set_assignment_submission
    @assignment_submission = @assignment.assignment_submissions.find(params[:id])
  end

  def assignment_submission_params
    params.require(:assignment_submission).permit(:grade, :github_url, :body, :code)
  end
end
