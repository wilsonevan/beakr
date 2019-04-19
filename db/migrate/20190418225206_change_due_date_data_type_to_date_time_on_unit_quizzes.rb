class ChangeDueDateDataTypeToDateTimeOnUnitQuizzes < ActiveRecord::Migration[5.2]
  def change 
    remove_column :unit_quizzes, :due_date, :date
    add_column :unit_quizzes, :due_date, :datetime
  end
end
