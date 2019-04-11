class ChangeTypeToKind < ActiveRecord::Migration[5.2]
  def change
    add_column :assignments, :kind, :string
    remove_column :assignments, :type, :string
  end
end
