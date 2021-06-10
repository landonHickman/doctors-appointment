Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    get '/tests', to: 'tests#index'
    resources :patients
    resources :doctors
    resources :appointments
  end
end
