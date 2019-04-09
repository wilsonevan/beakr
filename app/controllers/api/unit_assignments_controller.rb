class Api::UnitAssignmentsController < ApplicationController
  def index
    render( json: UnitAssignment.all() )
  end

  def create
    unit_assignment = UnitAssignment.new(unit_assignment_params)
    duplicate = Unit.find(params[:unit_id]).assignments.select() {|old_assignments| 
        unit_assignment.assignment_id === old_assignment.id 
    }

    if(duplicate.length == 0 && unit_assignment.save())
        render( json: unit_assignment )
    else
        render( json: {errors: unit_assignment.errors}, status: 422)
    end
  end

  def destroy
    UnitAssignment.destroy(params[:id])
    render( json: "Data Deleted" )
  end

  def delete_by_unit_and_assignment
    unit_id = Unit.find(params[:unit_id]).id
    unit_assignment = Content.find(params[:content_id]).unit_assigments.select() {|unit_assignment|
        unit_assignment.unit_id == unit_id
    }

    unit_assignment.first.destroy()
    render(json: "Data Deleted" )
  end

  private
    def unit_assignment_params
        return params.require(:unit_assignment).permit(:unit_id, :assignment_id)
    end
end
