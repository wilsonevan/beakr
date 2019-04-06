class CreateUnitContents < ActiveRecord::Migration[5.2]
  def change
    create_table :unit_contents do |t|
      t.belongs_to :content, foreign_key: true
      t.belongs_to :unit, foreign_key: true

      t.timestamps
    end
  end
end
