class Api::SectionsController < ApplicationController
  before_action :set_course, except: [:update_sequence]
  before_action :set_section, only: [:show, :update, :destroy]

  def index
    render json: @course.sections
  end

  def get_ordered_by_sequence
    render( json: Section.get_ordered_by_sequence(params[:course_id]) )
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

  def update_sequence
    params[:sections].each_with_index() {|section, index|
      section  = Section.find(section[:id].to_i)
      if(!section.update(sequence: index))
        render json: section.errors, status: 422
      end
    }
    render( json: "Data Updated" )
  end

  def destroy
    @section.destroy()
    render( json: "Data Deleted" )
  end

  private
  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_section
    @section = @course.sections.find(params[:id])
  end

  def section_params
    params.require(:section).permit(:title, :visible, :sequence)
  end
end
