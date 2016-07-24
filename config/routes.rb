Rails.application.routes.draw do
  namespace :importer do
    resources :upc, only: [:index]
  end

  namespace :lister do
    resources :trips, only: [:index]
  end
  
  root to: 'importer/upc#index'
end
