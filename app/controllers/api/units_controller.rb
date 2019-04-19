class Api::UnitsController < ApplicationController
  before_action :set_section
  before_action :set_unit, only: [:show, :update, :destroy]

  def index
    render json: @section.units
  end

  def show
    render json: @unit
  end

  def create
    unit = @section.units.new(unit_params)
    if unit.save
      render json: unit
    else
      render json: unit.errors, status: 422
    end
  end
  
  def update
    if @unit.update(unit_params)
      render json: @unit
    else
      render json: unit.errors, status: 422
    end
  end
  
  def destroy
    @unit.destroy()
    render( json: "Data Deleted");
  end

  private
  def set_section
    @section = Section.find(params[:section_id])
  end

  def set_unit
    @unit = @section.units.find(params[:id])
  end

  def unit_params
    params.require(:unit).permit(:title, :visible, :sequence)
  end
end
