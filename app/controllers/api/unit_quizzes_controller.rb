class Api::UnitQuizzesController < ApplicationController
  def index
    render( json: UnitQuiz.all() )
  end

  def get_quizzes_due
    quizzes = current_user.courses.sections.units.unit_quizzes.map() {|unit_quiz|
      {
        due_date: unit_quiz.due_date,
        title: unit_quiz.quiz.title,
      }
    }
    render( json: quizzes )
  end

  def create
    unit_quiz = UnitQuiz.new(unit_quiz_params)
    duplicate = Unit.find(params[:unit_id]).quizzes.select() {|old_quiz| 
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
    UnitQuiz.find_by_unit_and_quiz(params[:unit_id], params[:quiz_id]).destroy()
    render(json: "Data Deleted" )
  end

  private
    def unit_quiz_params
        return params.require(:unit_quiz).permit(:unit_id, :quiz_id, :sequence, :visible, :due_date)
    end
end
