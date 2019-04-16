class Api::QuizSubmissionsController < ApplicationController
  before_action :set_quiz_submission, only: [:show, :update, :calculate_final_grade ,:destroy]

  def index
    render( json: QuizSubmission.all() )
  end

  def get_submissions_by_course
    render( json: Course.find(params[:course_id]).quiz_submissions )
  end
  
  def get_submissions_by_user
    render( json: User.find(params[:user_id]).quiz_submissions )
  end

  def show
    render( json: @quiz_submission )
  end

  def create
    graded_questions = grade_choices(params[:questions])
    grades = calculate_grades(graded_questions)

    quiz_submission = QuizSubmission.new(
      quiz_id: params[:quiz_id],
      enrollment_id: Enrollment.find_by_user_and_course(current_user.id, params[:course_id]).id,
      points_possible: grades[:points_possible],
      points_awarded: grades[:points_awarded],
      grade: grades[:grade],
      graded: false,
      comment: "",
      questions: graded_questions,
    )

    if(quiz_submission.save())
      render( json: quiz_submission )
    else
      render( json: {error: quiz_submission.errors, response_text: "Data Not Created"}, status: 422 )
    end
  end

  def update
    if(@quiz_submission.update(quiz_submission_params))
      render( json: quiz_submission )
    else
      render( json: {error: quiz_submission.errors, response_text: "Data Not Updated"}, status: 422 )
    end
  end

  def calculate_final_grade
    graded_questions = grade_choices(params[:questions])
    grades = calculate_grades(graded_questions)

    if(@quiz_submission.update(
        points_possible: grades[:points_possible],
        points_awarded: grades[:points_awarded],
        grade: grades[:grade],
        graded: true,
        comment: params[:comment],
        questions: graded_questions,
      ))
      render( json: @quiz_submission )
    else
      render( json: {error: @quiz_submission.errors, response_text: "Data Not Updated"}, status: 422 )
    end
  end

  def destroy
    @quiz_submission.destroy()
    render( json: "Data Deleted" )
  end

  private
    def set_quiz_submission
      @quiz_submission = QuizSubmission.find(:id)
      # Note that functions to find the quiz submission by user_id, course_id, and quiz_id OR by quiz_id and enrollment_id also exist
      # QuizSubmission.find_by_user_course_and_quiz(user_id, course_id, quiz_id)
      # QuizSubmission.find_by_quiz_and_enrollment(quiz_id, enrollment_id)
    end

    def quiz_submission_params
      params.require(:quiz_submission).permit(:grade, :graded, :points_possible, :points_awarded, :comment, :questions)
    end

    # This function loops through choice questions and determines if they are correct
    def grade_choices(question_array)
      question_array.each() {|question|
        puts question
        if(question[:kind] == "choice")
          question[:choices].each() {|choice|
            if( question[:submitted_choice] == choice[:option] && choice[:correct])
              question[:points_awarded] = question[:points_possible]
            end
          }
        end
      }
      return question_array
    end

    # This function totals points_possible, and points_awarded
    # then returns the results to be saved in quiz_submission
    def calculate_grades(questions_array)
      points_possible = 0
      points_awarded = 0
      
      questions_array.each() {|question|
        points_possible += question[:points_possible]
        points_awarded += question[:points_awarded]
      }

      return {
        points_possible: points_possible.to_f,
        points_awarded: points_awarded.to_f,
        grade: (points_awarded.to_f/points_possible.to_f) * 100,
      }
    end
end
