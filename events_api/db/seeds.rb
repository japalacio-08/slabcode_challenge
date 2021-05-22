# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
TagColor.create(name: 'soft green', hexa_value: '#A0FD98')
TagColor.create(name: 'soft porple', hexa_value: '#98C6FD')
TagColor.create(name: 'soft porple', hexa_value: '#98C6FD')
col_loc = Location.create(name: 'Colombia', short_name: 'COL')
cun_loc = Location.create(name: 'Cundinamarca', short_name: 'CUND', parent_id: col_loc.id)
Location.create(name: 'Girardot', short_name: 'GDOT', parent_id: cun_loc.id, is_last_level: true)