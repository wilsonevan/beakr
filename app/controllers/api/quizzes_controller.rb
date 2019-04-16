class Api::QuizzesController < ApplicationController
  before_action :set_unit, only: [:index]
  before_action :set_quiz, only: [:show, :update, :destroy]

  def index
    render json: @unit.quizzes
  end

  def search_quizzes
    render( json: Quiz.search_quizzes(params[:input]) )
  end

  def search_quizzes_not_in_unit
    render( json: Quiz.search_quizzes_not_in_unit(params[:input], params[:unit_id]) )
  end

  def show
    render json: @quiz
  end

  def create
    quiz = Quiz.new(quiz_params)

    if quiz.save
      render json: quiz
    else
      render json: quiz.errors, status: 422
    end
  end

  def update
    if @quiz.update(quiz_params)
      render json: @quiz
    else
      render json: @quiz.errors, status: 422
    end
  end

  def destroy
    @quiz.destroy
  end

  private
  def set_unit
    @unit = Unit.find(params[:unit_id])
  end

  def set_quiz
    @quiz = Quiz.find(params[:id])
  end

  def quiz_params
    params.require(:quiz).permit(:title, :body)
  end
end
