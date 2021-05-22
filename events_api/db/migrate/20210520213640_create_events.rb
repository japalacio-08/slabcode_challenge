class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.text :description, null: false, limit: 1000
      t.references :location, null: false
      t.references :tag_color, null: false
      t.date :event_date
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.timestamps
    end
  end
end
