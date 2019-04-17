class ChangeTypeToKindInQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :kind, :string
    remove_column :questions, :type, :string
  end
end
