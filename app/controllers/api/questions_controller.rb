class Api::QuestionsController < ApplicationController
  before_action :set_quiz, only: [:index, :create]
  before_action :set_question, only: [:show, :update, :destroy]

  def index
    render( json: @quiz.questions )
  end

  def show
    render( json: @question )
  end

  def create
    question = @quiz.questions.new(question_params)

    if question.save
      render( json: question )
    else
      render( json: { error: question.errors, response_text: "Data Not Created" }, status: 422 )
    end
  end
  
  def update
    if(@question.update(question_params))
      render( json: @question )
    else
      render( json: { error: @question.errors, response_text: "Data Not Updated" }, status: 422 )
    end
  end

  def destroy
    @question.destroy()
    render( json: "Data Deleted" )
  end

  private
    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end

    def set_question
      @quiz = Question.find(params[:id])
    end

    def question_params
      params
        .require(:question)
        .permit(
          :kind, 
          :body, 
          :points_possible, 
          :points_awarded, 
          :choices, 
          :submitted_choice, 
          :submitted_text, 
          :submitted_code
      )
    end
end
