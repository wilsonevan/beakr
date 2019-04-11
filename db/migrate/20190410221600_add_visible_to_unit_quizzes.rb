class AddVisibleToUnitQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :unit_quizzes, :visible, :boolean
  end
end
