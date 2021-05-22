class TagColor < ApplicationRecord
    has_many :events
    validates_presence_of :name, :hexa_value
end
