class Api::V1::EventsController < Api::ApplicationController

    before_action :get_event, except: %i[last_month_events create]

    def last_month_events
        @records = params[:event_date] ? Event.last_month(params[:event_date]) : Event.last_month(nil)
        success_response(data=bulk_serialize(EventSerializer, @records))
    end

    def show
        success_response(data=serialize(EventSerializer, @resource))
    end

    def create
        @record = Event.create!(event_params)
        success_response(data=serialize(EventSerializer, @record))
    end

    def update
        @resource.update!(event_params)
        success_response(data=serialize(EventSerializer, @resource.reload))
    end

    def destroy
        @resource.delete
        success_response(data=nil, message='The record has been deleted')
    end

    private

    def get_event
        get_resource(Event, 'id', params[:id])
    end

    def event_params
        params.permit(
            :name,
            :description,
            :location_id,
            :tag_color_id,
            :event_date,
            :start_time,
            :end_time
        )
    end
    
    
end
