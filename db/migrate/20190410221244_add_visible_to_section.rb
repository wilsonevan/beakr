class AddVisibleToSection < ActiveRecord::Migration[5.2]
  def change
    add_column :sections, :visible, :boolean
  end
end
