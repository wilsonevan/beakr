Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do

    resources :enrollments, only: [:create, :update, :destroy]

    resources :users, only: [:index]
    resources :unit_contents, only: [:index, :create, :destroy]
    delete '/unit/:unit_id/contents/:content_id/unit_content', to: '/api/unit_contents#delete_by_unit_and_content'
    
    resources :courses do
      resources :sections
    end
  
    resources :sections, only: [] do
      resources :units
    end
  
    resources :units, only: [] do
      resources :contents
    end

    post 'contents/search', to: '/api/contents#search_contents'
    post 'contents/search/:unit_id', to: '/api/contents#search_contents_not_in_unit'
  end
end
