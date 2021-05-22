class CreateTagColors < ActiveRecord::Migration[6.0]
  def change
    create_table :tag_colors do |t|
      t.string :name, null: false
      t.string :hexa_value, null: false
    end
  end
end
