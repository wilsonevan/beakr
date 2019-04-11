class AddSequenceToUnitQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :unit_quizzes, :sequence, :integer
  end
end
