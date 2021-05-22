class Event < ApplicationRecord
    belongs_to :location
    belongs_to :tag_color
    validates_presence_of :name, :description, :location_id, :tag_color_id, :event_date, :start_time, :end_time
    validate :verify_date
    validate :location_is_a_city

    scope :last_month, lambda { |event_date| 
        event_date.nil? ? self.where(
            event_date: Date.current.beginning_of_month..Date.current.end_of_month
        ) : self.where(
            event_date: event_date.to_date.beginning_of_month..event_date.to_date.end_of_month
        )
    }
    
    private

    def location_is_a_city
        loc = Location.find_by(id: self.location_id)
        return if loc.nil?
        errors.add('location_id', 'Location must be a city.') unless loc.is_last_level
    end

    def verify_date
        if is_invalid_date?
            errors.add('event_date', 'Another event occurs during that time.') 
        end
        errors.add('end_time', "End time cannot be earlier than the Start time.") if self.end_time < self.start_time
    end

    def is_invalid_date?
        return (Event.where(
            event_date: self.event_date,
            start_time: self.start_time..self.end_time
        ).where.not(id: self.id).any? or Event.where(
            event_date: self.event_date,
            end_time: self.start_time..self.end_time
        ).where.not(id: self.id).any?)
    end
    
end
