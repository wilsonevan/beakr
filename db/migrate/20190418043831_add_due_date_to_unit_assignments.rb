class AddDueDateToUnitAssignments < ActiveRecord::Migration[5.2]
  def change
    add_column :unit_assignments, :due_date, :date
  end
end
