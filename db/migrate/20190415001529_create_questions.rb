class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :type
      t.string :choices
      t.text :body
      t.text :submitted_text
      t.integer :submitted_choice
      t.text :submitted_code
      t.float :points_possible
      t.float :points_awarded
      t.belongs_to :quiz, foreign_key: true

      t.timestamps
    end
  end
end
