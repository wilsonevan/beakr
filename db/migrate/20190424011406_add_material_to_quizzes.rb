class AddMaterialToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :material, :string, default: "quiz"
  end
end
