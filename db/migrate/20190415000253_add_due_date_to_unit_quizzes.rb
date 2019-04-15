class AddDueDateToUnitQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :unit_quizzes, :due_date, :date
  end
end
