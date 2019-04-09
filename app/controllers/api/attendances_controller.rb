class Api::AttendancesController < ApplicationController
  before_action :set_enrollment, only: [:create]
  before_action :set_attendance, only: [:update]
  before_action :set_course, only: [:get_attendances]

  def index
    render json: current_user.attendances.all 
  end

  def get_attendances
    # render json: attendances = Attendance.get_attendances(params[:id])
    #render json: @course.attendances.all

    attendanceinfo = @course.users.map(){|user| 
      {
        user_id: user.id, 
        first_name: user.first_name, 
        last_name: user.last_name, 
        attendances: user.attendances
      }
    }
    render( json: attendanceinfo )
    # newattendances = []
    # recordinfo = []
    # attendances.each do |attendance|
    #   record = []
    #   recordinfo << attendance.attendance_id
    #   recordinfo << attendance.record_date
    #   recordinfo << attendance.attendance_record
    #   newattendances << recordinfo
    #   newattendances << attendance.id
    #   newattendances << attendanc.first_name
    #   newattendances << attendance.last_name
    # end 
    
  end

  def create
    attendance = Attendance.create_attendances(attendance_params, @enrollment.id)
    render json: error
  end

  def update
    Attendance.update_attendance(attendance_params, @attendance.id)
  end

  private

  def attendance_params
    params.permit(:attendance).require(:record_date, :attendance_record)
  end

  def set_enrollment
    @enrollment = Enrollment.find(params[:enrollment_id])
  end

  def set_attendance
    @attendance = Attendance.find(params[:attendance_id])
  end

  def set_course
    @course = Course.find(params[:course_id])
  end
end
