class Attendance < ApplicationRecord
  belongs_to :enrollment

  def self.get_attendances(course_id)

    # Left joins attendance and enrollments, then joins User to that result.
    # It will return rows from the first line
    User.find_by_sql([
    "select record_date, u.id, attendance_record, u.first_name, u.last_name, course_id, attendance_id, new.enrollment_id
    from (select *, a.id as attendance_id from attendances as a left join enrollments as e on a.enrollment_id = e.id) as new
    full join users as u
    on new.user_id = u.id
    where course_id = ?
    order by record_date", course_id])
  end


  def self.create_attendances(p, id)
    Attendance.find_by_sql(["
      INSERT INTO attendances (record_date, attendance_record, enrollment_id, created_at, updated_at)
      VALUES (:record_date, :attendance_record, :enrollment_id, :created_at, :updated_at);
    ", {
      record_date: p[:record_date],
      attendance_record: p[:attendance_record],
      enrollment_id: id,
      created_at: DateTime.now,
      updated_at: DateTime.now
    }])
  end


  def self.update_attendance(p, id)
      Attendance.find_by_sql(["
      UPDATE attendances AS a
      SET record_date = ?, attendace_record = ?, updated_at = ?
      WHERE a.id = ?
    ;", p[:record_date], p[:attendance_record], DateTime.now, id])
  end


  def self.delete_attendance(p)
    Attendance.find_by_sql(["
      DELETE FROM attendances AS a
      WHERE a.id = ?
    ;", p[:id] ])
  end

end
