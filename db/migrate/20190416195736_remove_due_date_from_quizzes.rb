class RemoveDueDateFromQuizzes < ActiveRecord::Migration[5.2]
  def change
    remove_column :quizzes, :due_date, :date
  end
end
