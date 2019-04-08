class CreateAttendances < ActiveRecord::Migration[5.2]
  def change
    create_table :attendances do |t|
      t.belongs_to :enrollment, foreign_key: true
      t.date :record_date
      t.string :attendance_record

      t.timestamps
    end
  end
end
