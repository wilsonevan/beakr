class AddSequenceToUnitAssignments < ActiveRecord::Migration[5.2]
  def change
    add_column :unit_assignments, :sequence, :integer
  end
end
