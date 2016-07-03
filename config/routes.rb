Rails.application.routes.draw do
  namespace :importer do
    resources :upc, only: [:index]
  end
  root to: 'importer/upc#index'
end
