class Api::UnitQuizzesController < ApplicationController
  def index
    render( json: UnitQuiz.all() )
  end

  def create
    unit_quiz = UnitQuiz.new(unit_quiz_params)
    duplicate = Unit.find(params[:unit_id]).quizzes.select() {|old_quizzes| 
        unit_quiz.quiz_id === old_quiz.id 
    }

    if(duplicate.length == 0 && unit_quiz.save())
        render( json: unit_quiz )
    else
        render( json: {errors: unit_quiz.errors}, status: 422)
    end
  end

  def destroy
    UnitQuiz.destroy(params[:id])
    render( json: "Data Deleted" )
  end

  def delete_by_unit_and_quiz
    unit_id = Unit.find(params[:unit_id]).id
    unit_quiz = Quiz.find(params[:quiz_id]).unit_quizzes.select() {|unit_quiz|
        unit_quiz.unit_id == unit_id
    }

    unit_quiz.first.destroy()
    render(json: "Data Deleted" )
  end

  private
    def unit_quiz_params
        return params.require(:unit_quiz).permit(:unit_id, :quiz_id)
    end
end
