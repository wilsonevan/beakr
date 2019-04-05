class Api::UnitContentsController < ApplicationController
    def index
        render( json: UnitContent.all() )
    end

    def create
        unit_content = Unitcontent.create(unit_content_params)

        if(unit_content.save())
            render( json: unit_content )
        else
            render( json: {errors: unit_content.errors}, status: 422)
        end
    end

    def destroy
        UnitContent.destroy(params[:id])
        render( json: "Data Deleted" )
    end

    private
        def unit_content_params
            return params.require(:unit_contents).permit(:unit_id, :content_id)
        end
end
