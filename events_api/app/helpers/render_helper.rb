# frozen_string_literal: true

module RenderHelper

  def not_found_response(e)
    error_response(e, status=:not_found)
  end

  def bad_request_response(e)
    error_response(e, status=:bad_request)
  end

  def success_response(data=nil, message=true, status=:ok)
    render json: {
        data: data,
        message: message,
        errors: nil,
        status: status || :ok,
        success: true
    }, status: status || :ok
  end

  def error_response(e, status=:unprocessable_entity)
    p e.message
    render json: {
        data: nil,
        errors: e.record ? e.record.errors : [e.message],
        message: e.message,
        status: status || :unprocessable_entity,
        success: false
    }, status: status || :unprocessable_entity
      
  end
end
