# frozen_string_literal: true

module SerializerHelper
  
    def bulk_serialize(serializer, bulk_data)
      p bulk_data
      bulk_data.map{ |row| serialize(serializer, row) }
    end
  
    def serialize(serializer, data)
      serializer.new(data).as_json
    end
  end
  