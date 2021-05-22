class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.integer :parent_id, null: true
      t.string :short_name, null: false, limit: 4
      t.boolean :is_last_level, null: false, default: false
    end

    add_foreign_key :locations, :locations, column: :parent_id
  end
end
