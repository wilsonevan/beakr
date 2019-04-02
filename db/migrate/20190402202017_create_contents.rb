class CreateContents < ActiveRecord::Migration[5.2]
  def change
    create_table :contents do |t|
      t.string :title
      t.text :content
      t.belongs_to :unit, foreign_key: true

      t.timestamps
    end
  end
end
