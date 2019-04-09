class Attendance < ApplicationRecord
  belongs_to :enrollment

  def self.get_attendances(course_id)
    User.find_by_sql([
    "select record_date, u.id, attendance_record, u.first_name, u.last_name, course_id, attendance_id, new.enrollment_id
    from (select *, a.id as attendance_id from attendances as a left join enrollments as e on a.enrollment_id = e.id) as new
    full join users as u
    on new.user_id = u.id
    where course_id = ?
    order by record_date", course_id])
  end
end
