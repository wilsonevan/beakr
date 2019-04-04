class AddBodyToContents < ActiveRecord::Migration[5.2]
  def change
    add_column :contents, :body, :text
    remove_column :contents, :content, :text
  end
end
