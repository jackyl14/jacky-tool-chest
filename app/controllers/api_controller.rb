class ApiController < ActionController::Base
  protect_from_forgery with: :exception
  http_basic_authenticate_with name: ENV['BASIC_AUTH_API_NAME'], password: ENV['BASIC_AUTH_API_PASSWORD']
end
