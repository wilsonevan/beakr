class AddArchivedToCourses < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :archived, :boolean
  end
end
