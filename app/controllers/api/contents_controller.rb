class Api::ContentsController < ApplicationController
  before_action :set_unit
  before_action :set_content, only: [:show, :update, :destroy]

  def index
    render json: @unit.contents
  end

  def show
    render json: @content
  end

  def create
    content = @unit.contents.new(content_params)
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
    @content.delete
  end

  private
  def set_unit
    @unit = Unit.find(params[:unit_id])
  end

  def set_content
    @content = @unit.contents.find(params[:id])
  end

  def content_params
    params.require(:content).permit(:title, :content)
  end
end
