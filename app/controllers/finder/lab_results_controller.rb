module Finder
  class LabResultsController < ApplicationController

    def index
      @initial_data_props = {
        environment: Rails.env
      }
    end

  end
end
