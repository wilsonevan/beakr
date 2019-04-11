class AddVisibleToUnitContents < ActiveRecord::Migration[5.2]
  def change
    add_column :unit_contents, :visible, :boolean
  end
end
