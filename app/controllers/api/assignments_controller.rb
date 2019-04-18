class Api::AssignmentsController < ApplicationController
  before_action :set_unit, only: [:index]
  before_action :set_assignment, only: [:show, :update, :destroy]

  def index
    render json: @unit.assignments
  end

  def search_assignments
    render( json: Assignment.search_assignments(params[:input]) )
  end

  def search_assignments_not_in_unit
    render( json: Assignment.search_assignments_not_in_unit(params[:input], params[:unit_id]) )
  end

  def show
    render json: @assignment
  end

  def create
    assignment = Assignment.new(assignment_params)

    if assignment.save
      render json: assignment
    else
      render json: assignment.errors, status: 422
    end
  end

  def update
    if @assignment.update(assignment_params)
      render json: @assignment
    else
      render json: @assignment.errors, status: 422
    end
  end

  def destroy
    @assignment.destroy
  end

  private
  def set_unit
    @unit = Unit.find(params[:unit_id])
  end

  def set_assignment
    @assignment = Assignment.find(params[:id])
  end

  def assignment_params
    params.require(:assignment).permit(:title, :body, :kind, :points_possible)
  end
end
