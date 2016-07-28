module Lister
  class TripsController < ApplicationController

    def index
      @initial_data_props = {
        environment: Rails.env,
        basicAuth: ActionController::HttpAuthentication::Basic.encode_credentials(ENV['BASIC_AUTH_API_NAME'], ENV['BASIC_AUTH_API_PASSWORD'])
      }
    end

  end
end
