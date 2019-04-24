class AddMaterialToContents < ActiveRecord::Migration[5.2]
  def change
    add_column :contents, :material, :string, default: "content"
  end
end
