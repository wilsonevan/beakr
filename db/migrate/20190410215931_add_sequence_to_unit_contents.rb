class AddSequenceToUnitContents < ActiveRecord::Migration[5.2]
  def change
    add_column :unit_contents, :sequence, :integer
  end
end
