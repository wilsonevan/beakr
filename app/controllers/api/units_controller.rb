class Api::UnitsController < ApplicationController
  before_action :set_section, except: [:update_sequence, :update_material_sequence]
  before_action :set_unit, only: [:show, :update, :destroy]

  def index
    render json: @section.units
  end

  def get_ordered_by_sequence
    render( json: Unit.get_ordered_by_sequence(params[:section_id]) )
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

  def update_sequence
    params[:units].each_with_index() {|unit, index|
      unit  = Unit.find(unit[:id].to_i)
      if(!unit.update(sequence: index))
        render( json: unit.errors, status: 422 )
      end
    }
    render( json: "Data Updated" )
  end

  def update_material_sequence
    params[:materials].each_with_index() {|material, index|
      material_instance = nil;

      if(material[:material] == "content")
        material_instance = UnitContent.find(material[:unit_content_id])
      elsif(material[:material] == "assignment")
        material_instance = UnitAssignment.find(material[:unit_assignment_id])
      else(material[:material] == "quiz")
        material_instance = UnitQuiz.find(material[:unit_quiz_id])
      end

      if(!material_instance.update(sequence: index))
        render( json: material_instance.errors, status: 422 )
      end
    }
    render( json: "Data Updated" )
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
