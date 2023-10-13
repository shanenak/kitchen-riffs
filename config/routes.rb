Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :recipes, only: [:show, :index]
    resources :ratings, only: [:create, :destroy, :update]
    resources :saved_recipes, only: [:index, :create, :show, :destroy, :update]
  end
  
  get '*path', to: "static_pages#frontend_index"

end
