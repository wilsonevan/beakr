class CreateSections < ActiveRecord::Migration[5.2]
  def change
    create_table :sections do |t|
      t.string :title
      t.belongs_to :course, foreign_key: true

      t.timestamps
    end
  end
end
