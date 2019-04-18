class AddPointsAndGradedToAssingmentSubmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :assignment_submissions, :points_possible, :float
    add_column :assignment_submissions, :points_awarded, :float
    add_column :assignment_submissions, :graded, :boolean
  end
end
