class AddSequenceToSections < ActiveRecord::Migration[5.2]
  def change
    add_column :sections, :sequence, :integer
  end
end
