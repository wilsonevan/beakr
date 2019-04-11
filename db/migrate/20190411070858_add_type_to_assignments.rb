class AddTypeToAssignments < ActiveRecord::Migration[5.2]
  def change
    add_column :assignments, :type, :string
  end
end
