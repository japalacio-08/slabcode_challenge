module ModelHelper
    def get_resource(class_, search_by, search_value)
        @resource = class_.find_by( "#{search_by}" => search_value)
        raise ExceptionHandler::NotFoundError.new(message="#{class_.to_s} not found") if @resource.nil?
    end
end