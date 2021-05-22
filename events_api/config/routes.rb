Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :tag_colors, only: [:index]
      resources :locations, only: [:index]
      resources :events, only: [:show, :create, :update, :destroy]
      get 'event/last_month_events', to: 'events#last_month_events'
      get 'health_check', to: 'health_check#index', as: 'health_check_base'
    end
  end
end
