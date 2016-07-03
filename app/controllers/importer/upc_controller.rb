module Importer
  class UpcController < ApplicationController

    def index
      @initial_data_props = { environment: Rails.env }
    end

  end
end
