Rails.application.routes.draw do
  resources :importer, only: [:index]

  root to: 'importer#index'
end
