Rails.application.routes.draw do
  namespace :importer do
    resources :upc, only: [:index]
  end

  namespace :finder do
    resources :lab_results, only: [:index]
  end

  root to: 'importer/upc#index'
end
