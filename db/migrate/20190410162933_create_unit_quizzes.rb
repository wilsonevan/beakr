class CreateUnitQuizzes < ActiveRecord::Migration[5.2]
  def change
    create_table :unit_quizzes do |t|
      t.belongs_to :unit, foreign_key: true
      t.belongs_to :quiz, foreign_key: true

      t.timestamps
    end
  end
end
