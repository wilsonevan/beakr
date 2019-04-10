class AddBodyToAssignments < ActiveRecord::Migration[5.2]
  def change
    add_column :assignments, :body, :text
    remove_column :assignments, :content, :text
  end
end
