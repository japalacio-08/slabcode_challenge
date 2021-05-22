module ExceptionHandler
    module ApiException
        include RenderHelper

        def self.included(clazz)
            clazz.class_eval do
                rescue_from Exception, :with => :error_response
                rescue_from ActiveRecord::RecordInvalid, with: :bas_request_response
                rescue_from ExceptionHandler::BadRequestError, with: :bas_request_response

                rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
                rescue_from ExceptionHandler::NotFoundError, with: :not_found_response
            end
        end

        private
        
    
        def bas_request_response(e)
            error_response(e, status=:bad_request)
        end
    end

    class BaseError < StandardError
        attr_accessor :record
        def initialize(message, record_=nil)
            @message = message
            @record = record_
            super(message)
        end
    end
    
    class NotFoundError < BaseError; end
    class BadRequestError < BaseError; end
end