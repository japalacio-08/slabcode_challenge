class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location, 
              :tag_color, :event_date, :start_time, 
              :end_time

  def event_date
    self.object.event_date
  end

  def formated_event_date
    self.object.event_date.strftime("%m-%d-%Y")
  end
  

  def location
    loc = self.object.location
    loc.nil? ? nil : LocationSerializer.new(loc).as_json
  end

  def tag_color
    tc = self.object.tag_color
    tc.nil? ? nil : TagColorSerializer.new(tc).as_json

  end

  def start_time
    self.object.start_time.to_s(:time)                    
  end

  def end_time
    self.object.end_time.to_s(:time)                    
  end
  
  
end
