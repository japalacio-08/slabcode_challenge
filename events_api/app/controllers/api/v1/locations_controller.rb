class Api::V1::LocationsController < Api::ApplicationController
    def index
        success_response(data=bulk_serialize(LocationSerializer, Location.get_cities))
    end
end
