class AddMaterialToAssignments < ActiveRecord::Migration[5.2]
  def change
    add_column :assignments, :material, :string, default: "assignment"
  end
end
