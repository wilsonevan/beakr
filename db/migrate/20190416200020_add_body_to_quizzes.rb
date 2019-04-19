class AddBodyToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :body, :text
  end
end
