class Api::SectionsController < ApplicationController
  before_action :set_course
  before_action :set_section, only: [:show, :update, :destroy]

  def index
    render json: @course.sections
  end

  def show
    render json: @section
  end

  def create
    section = @course.sections.new(section_params)
    if section.save
      render json: section
    else
      render json: section.errors, status: 422
    end
  end

  def update
    if @section.update(section_params)
      render json: @section
    else 
      render json: @section.errors, status: 422
    end
  end

  def destroy
    @section.delete
  end

  private
  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_section
    @section = @course.sections.find(params[:id])
  end

  def section_params
    params.require(:section).permit(:title)
  end
end
