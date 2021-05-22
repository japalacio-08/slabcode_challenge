class Api::V1::HealthCheckController < Api::ApplicationController
    def index
        success_response(
            message='Server is Up!!'
        )
    end
end
