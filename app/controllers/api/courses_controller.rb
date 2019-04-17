class Api::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy, :calc_grades_all_students]

  def index
    render json: Course.all
  end

  def search_courses
    render( json: Course.search_courses(params[:input]) )
  end

  def show
    render json: @course
  end

  def create
    course = Course.new(course_params)
    if course.save
      render json: course
    else
      render json: course.errors, status: 422
    end
  end

  def update
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors, status: 422
    end
  end

  def destroy
    @course.destroy()
    render( json: "Data Deleted")
  end

  def calc_grades_all_students
    student_totals = []
    @course.enrollments.each do |enrollment|
      student_totals.push(User.calc_total_grades(enrollment.user_id))
    end
    render json: student_totals
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(:title)
  end
  
end
