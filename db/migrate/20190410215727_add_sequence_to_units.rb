class AddSequenceToUnits < ActiveRecord::Migration[5.2]
  def change
    add_column :units, :sequence, :integer
  end
end
