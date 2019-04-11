class AddVisibleToUnitAssignments < ActiveRecord::Migration[5.2]
  def change
    add_column :unit_assignments, :visible, :boolean
  end
end
