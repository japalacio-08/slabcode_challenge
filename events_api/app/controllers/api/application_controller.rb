class Api::ApplicationController < ActionController::API
  include ModelHelper
  include SerializerHelper
  include ExceptionHandler::ApiException
end
