class ChangeDefaultAttendanceRecordOfAttendances < ActiveRecord::Migration[5.2]
  def change
    remove_column :attendances, :attendance_record, :string
    add_column :attendances, :attendance_record, :string, :default => "present"
  end
end
