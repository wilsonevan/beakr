class CreateAssignmentSubmissions < ActiveRecord::Migration[5.2]
  def change
    create_table :assignment_submissions do |t|
      t.float :grade
      t.string :github_url
      t.text :body
      t.text :code
      t.belongs_to :assignment, foreign_key: true
      t.belongs_to :enrollment, foreign_key: true

      t.timestamps
    end
  end
end
