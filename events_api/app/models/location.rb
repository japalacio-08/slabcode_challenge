class Location < ApplicationRecord
    has_many :locations
    has_many :events
    belongs_to :parent, class_name: 'Location', foreign_key: 'parent_id', optional: true
    validates_presence_of :name, :short_name
    scope :get_cities, lambda { where(is_last_level: true)}
end
