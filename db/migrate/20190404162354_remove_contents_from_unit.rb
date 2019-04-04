class RemoveContentsFromUnit < ActiveRecord::Migration[5.2]
  def change
    remove_reference :contents, :unit, index: true, foreign_key: true
  end
end
