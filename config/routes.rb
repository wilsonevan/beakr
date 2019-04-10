Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do

    resources :enrollments, only: [:create, :update]
    delete '/users/:user_id/courses/:course_id/enrollments', to: '/api/enrollments#destroy'


    resources :users, only: [:index, :update]
    get 'user_courses', to: 'courses#user_courses'
    post '/search_users', to: '/api/users#search_users'
    post '/search_users_with_role/:course_id', to: '/api/users#search_users_with_role'
    post '/search_staff_enrolled/:id', to: '/api/users#search_staff_enrolled'
    post '/search_students_enrolled/:id', to: '/api/users#search_students_enrolled'
    
    resources :unit_contents, only: [:index, :create, :destroy]
    delete '/unit/:unit_id/contents/:content_id/unit_content', to: '/api/unit_contents#delete_by_unit_and_content'
    
    resources :unit_assignments, only: [:index, :create, :destroy]
    delete '/unit/:unit_id/assignments/:assignment_id/unit_assignment', to: '/api/unit_assignments#delete_by_unit_and_assignment'
    
    resources :courses do
      resources :sections
    end
    
    post '/search_courses', to: '/api/courses#search_courses'
    
    resources :sections, only: [] do
      resources :units
    end
  
    resources :units, only: [] do
      resources :contents, only: [:index]
      resources :assignments, only: [:index]
    end

    resources :contents, only: [:show, :create, :update, :destroy]
    resources :assignments, only: [:show, :create, :update, :destroy]

    post 'contents/search', to: '/api/contents#search_contents'
    post 'contents/search/:unit_id', to: '/api/contents#search_contents_not_in_unit'
    post 'assignments/search', to: '/api/assignments#search_assignments'
    post 'assignments/search/:unit_id', to: '/api/assignments#search_assignments_not_in_unit'
  end
end
