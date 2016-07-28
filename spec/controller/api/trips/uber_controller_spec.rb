require "rails_helper"

RSpec.describe Api::Trips::UberController, :type => :controller do
  before {
    ENV['BASIC_AUTH_API_NAME'] ||= "basic"
    ENV['BASIC_AUTH_API_PASSWORD'] ||= "pw"

    request.env["HTTP_AUTHORIZATION"] = ActionController::HttpAuthentication::Basic.encode_credentials(
      ENV['BASIC_AUTH_API_NAME'],
      ENV['BASIC_AUTH_API_PASSWORD']
    )
  }

  describe "GET #index" do

    it "responds successfully with an HTTP 200 status code" do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it "returns a valid json string" do
      get :index
      expect(JSON.parse(response.body)).to be_truthy
    end

  end
end
