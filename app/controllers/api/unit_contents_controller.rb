class Api::UnitContentsController < ApplicationController
    def index
        render( json: UnitContent.all() )
    end

    def create
        unit_content = UnitContent.new(unit_content_params)
        duplicate = Unit.find(params[:unit_id]).contents.select() {|old_content| 
            unit_content.content_id === old_content.id 
        }

        if(duplicate.length == 0 && unit_content.save())
            render( json: unit_content )
        else
            render( json: {errors: unit_content.errors}, status: 422)
        end
    end

    def destroy
        UnitContent.destroy(params[:id])
        render( json: "Data Deleted" )
    end

    def delete_by_unit_and_content
        unit_id = Unit.find(params[:unit_id]).id
        unit_content = Content.find(params[:content_id]).unit_contents.select() {|unit_content|
            unit_content.unit_id == unit_id
        }

        unit_content.first.destroy()
        render(json: "Data Deleted" )
    end

    private
        def unit_content_params
            return params.require(:unit_content).permit(:unit_id, :content_id, :visible, :sequence)
        end
end
