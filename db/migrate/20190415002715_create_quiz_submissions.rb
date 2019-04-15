class CreateQuizSubmissions < ActiveRecord::Migration[5.2]
  def change
    create_table :quiz_submissions do |t|
      t.belongs_to :quiz, foreign_key: true
      t.belongs_to :enrollment, foreign_key: true
      t.float :grade
      t.float :points_possible
      t.float :points_awarded
      t.boolean :graded
      t.text :comment
      t.string :questions

      t.timestamps
    end
  end
end
