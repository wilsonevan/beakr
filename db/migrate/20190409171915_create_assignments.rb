class CreateAssignments < ActiveRecord::Migration[5.2]
  def change
    create_table :assignments do |t|
      t.string :title
      t.text :content
      t.datetime :due_date

      t.timestamps
    end
  end
end
