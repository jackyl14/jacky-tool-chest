module Finder
  class LabResultsController < ApplicationController

    def index
      @initial_data_props = {
        environment: Rails.env,
        labResultArray: JSON.parse(File.read("db/initial_lab_results.json"))
      }
    end

  end
end
