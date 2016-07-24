module Api
  module Trips
    class UberController < ApiController

      def index
        render json: File.read("db/trips.json"), status: :ok
      end

    end
  end
end
