# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_20_213833) do

  create_table "events", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", limit: 1000, null: false
    t.integer "location_id", null: false
    t.integer "tag_color_id", null: false
    t.date "event_date"
    t.time "start_time", null: false
    t.time "end_time", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["location_id"], name: "index_events_on_location_id"
    t.index ["tag_color_id"], name: "index_events_on_tag_color_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name", null: false
    t.integer "parent_id"
    t.string "short_name", limit: 4, null: false
    t.boolean "is_last_level", default: false, null: false
  end

  create_table "tag_colors", force: :cascade do |t|
    t.string "name", null: false
    t.string "hexa_value", null: false
  end

  add_foreign_key "locations", "locations", column: "parent_id"
end
