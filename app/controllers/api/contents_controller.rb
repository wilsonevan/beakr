class Api::ContentsController < ApplicationController
  before_action :set_unit, only: [:index, :get_contents_with_attrs]
  before_action :set_content, only: [:show, :update, :destroy]

  def index
    render json: @unit.contents
  end

  def search_contents
    render( json: Content.search_contents(params[:input]) )
  end

  def search_contents_not_in_unit
    render( json: Content.search_contents_not_in_unit(params[:input], params[:unit_id]) )
  end
  
  def get_contents_with_attrs
    contents = @unit.unit_contents.map() {|uc|
      content = uc.content
      {
        id: content[:id],
        title: content[:title],
        body: content[:body],
        sequence: uc[:sequence],
        visible: uc[:visible]
      }
    }

    render( json:  contents  )
  end

  def show
    render json: @content
  end

  def get_content_with_attrs
    render( json:  Content.get_content_with_attrs(params[:content_id], params[:unit_id])  )
  end

  def create
    content = Content.new(content_params)

    if content.save
      render json: content
    else
      render json: content.errors, status: 422
    end
  end

  def update
    if @content.update(content_params)
      render json: @content
    else
      render json: @content.errors, status: 422
    end
  end

  def destroy
    @content.destroy
  end

  private
  def set_unit
    @unit = Unit.find(params[:unit_id])
  end

  def set_content
    @content = Content.find(params[:id])
  end

  def content_params
    params.require(:content).permit(:title, :body)
  end
end
