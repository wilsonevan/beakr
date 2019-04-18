class AddFeedbackToAssignmentSubmissionsAndMoveDueDateToUnitAssignments < ActiveRecord::Migration[5.2]
  def change
    add_column :assignment_submissions, :feedback, :text 
    add_column :unit_assignments, :due_date, :datetime
    remove_column :assignments, :due_date, :datetime
  end
end
