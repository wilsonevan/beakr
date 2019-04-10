class Api::AttendancesController < ApplicationController
  before_action :set_enrollment, only: [:create]
  before_action :set_attendance, only: [:update]
  before_action :set_course, only: [:get_attendances]

  def index
    render json: current_user.attendances.all 
  end

  def get_attendances

    # This loop rejects all users from the attendance data, who are not students of the desired course
    attendanceinfo = @course.users.reject(){|user| 
      set_flag = false
      user.enrollments.each do |enrollment| 
        if enrollment.role != 'student' && enrollment.course_id == @course.id 
          set_flag = true
        end
      end
      set_flag == true
    }.map(){|user| # This map adds relevant user data to the attendance data
        {
          image: user.image,
          user_id: user.id, 
          first_name: user.first_name, 
          last_name: user.last_name, 
          attendances: user.attendances
        }
    }
    render( json: attendanceinfo )
    
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
