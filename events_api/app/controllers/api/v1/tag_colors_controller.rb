class Api::V1::TagColorsController < Api::ApplicationController
    def index
        success_response(data=bulk_serialize(TagColorSerializer, TagColor.all))
    end
end
