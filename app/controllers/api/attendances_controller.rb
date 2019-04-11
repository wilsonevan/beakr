class Api::AttendancesController < ApplicationController
  # before_action :set_enrollment, only: [:create, ]
  before_action :set_attendance, only: [:update, :destroy, ]
  before_action :set_course, only: [:get_attendances, :destroy_column, ]
  before_action :set_date, only: [:destroy_column, ]

  def index
    render json: current_user.attendances.all 
  end

  def get_attendances

    # This loop rejects all users from the attendance data, who are not students of the desired course
    attendanceinfo = @course.users.order(:first_name).reject(){|user| 
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
          attendances: user.attendances.order(:record_date),
        }
    }
    render( json: attendanceinfo )
    
  end

  def create
    @course = Course.find(params[:course_id])
    @course.enrollments.each do |enrollment|
      enrollment.attendances.create(attendance_params)
    end

    get_attendances()
  end

  def update
    if @attendance.update(attendance_params)
      render json: @attendance
    else
      render json: @attendance.errors, status: 422
    end
  end

  def destroy
    Attendance.delete_attendance(@attendance)
  end

  def destroy_column
    Attendance.all.each do |record|
      # If the record date and the course id for that record match the column date which is to be deleted, delete that record
      if (record.record_date == Date.strptime(@date, '%Y-%m-%d')) && (Enrollment.find(record.enrollment_id).course_id == @course.id)
        record.destroy
      end
    end
  end

  private

  def attendance_params
    params.require(:attendance).permit(:record_date, :attendance_record, :enrollment_id)
  end

  def newatt_params
    params.require(:attendance).permit(:record_date)
  end

  def set_enrollment
    @enrollment = Enrollment.find(params[:enrollment_id])
  end

  def set_attendance
    @attendance = Attendance.find(params[:id])
  end

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_date
    @date = params[:record_date]
  end

end
