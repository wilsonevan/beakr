class AddPointsPossibleAndPointsAwardedToAssignments < ActiveRecord::Migration[5.2]
  def change
    add_column :assignments, :points_possible, :float
  end
end
