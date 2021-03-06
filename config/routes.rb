Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do

    resources :enrollments, only: [:create, :update]
    get '/users/:user_id/courses/:course_id/enrollments', to: '/api/enrollments#show'
    delete '/users/:user_id/courses/:course_id/enrollments', to: '/api/enrollments#destroy'
  
    resources :attendances

    resources :users, only: [:index, :show, :create, :update]
    
    post '/search_users', to: '/api/users#search_users'
    post '/search_users_with_role/:course_id', to: '/api/users#search_users_with_role'
    post '/search_staff_enrolled/:id', to: '/api/users#search_staff_enrolled'
    post '/search_students_enrolled/:id', to: '/api/users#search_students_enrolled'
    get 'get_user_grades_assignments', to: 'users#get_user_grades_assignments'
    get 'get_user_grades_quizzes', to: 'users#get_user_grades_quizzes'
    get 'get_all_user_grades', to: 'users#get_all_user_grades'
    get 'calc_total_grades', to: 'users#calc_total_grades'
    get 'user_courses', to: 'users#user_courses'
    get 'student_courses', to: 'users#student_courses'
    post '/send_sms', to: '/api/users#send_sms'
    get 'calc_grades_all_students', to: 'courses#calc_grades_all_students'
    get 'upcoming_assignments', to: 'users#upcoming_assignments'
    get 'upcoming_quizzes', to: 'users#upcoming_quizzes'
    # get 'recently_graded_assignments' to: 'users#recently_graded_assignments'

    resources :unit_contents, only: [:index, :create, :update, :destroy]
    delete '/unit/:unit_id/contents/:content_id/unit_content', to: '/api/unit_contents#delete_by_unit_and_content'
    resources :unit_assignments, only: [:index, :create, :update, :destroy]
    delete '/unit/:unit_id/assignments/:assignment_id/unit_assignment', to: '/api/unit_assignments#delete_by_unit_and_assignment'
    resources :unit_quizzes, only: [:index, :create, :update, :destroy]
    delete '/unit/:unit_id/quizzes/:quiz_id/unit_quiz', to: '/api/unit_quizzes#delete_by_unit_and_quiz'
    
    resources :courses do
      resources :sections
    end 
    
    
    post '/search_courses', to: '/api/courses#search_courses'
    
    resources :sections, only: [] do
      resources :units
    end
    get '/courses/:course_id/sections_ordered_by_sequence', to: '/api/sections#get_ordered_by_sequence'
    put '/sections/update_sequence', to: '/api/sections#update_sequence'
    
    resources :units, only: [] do
      resources :contents, only: [:index]
      resources :assignments, only: [:index]
      resources :quizzes, only: [:index]
    end
    get '/sections/:section_id/units_ordered_by_sequence', to: '/api/units#get_ordered_by_sequence'
    put '/units/update_sequence', to: '/api/units#update_sequence'
    put '/units/update_material_sequence', to: '/api/units#update_material_sequence'
    

    get 'get_attendances', to: '/api/attendances#get_attendances'
    delete 'destroy_column', to: '/api/attendances#destroy_column'

    
    get 'courses/:course_id/assignments/:assignment_id/assignment_submissions/show_user_submission', to: '/api/assignment_submissions#show_user_submission'

    resources :contents, only: [:show, :create, :update, :destroy]
    get '/units/:unit_id/contents/get_contents_with_attrs', to: '/api/contents#get_contents_with_attrs'
    get '/units/:unit_id/contents/:content_id/get_content_with_attrs', to: '/api/contents#get_content_with_attrs'
    
    
    resources :assignments, only: [:show, :create, :update, :destroy] do
      resources :assignment_submissions
      get 'assignment_submissions/:id/find_user', to: '/api/assignment_submissions#find_user'
    end
    get '/units/:unit_id/assignments/get_assignments_with_attrs', to: '/api/assignments#get_assignments_with_attrs'
    get '/units/:unit_id/assignments/:assignment_id/get_assignment_with_attrs', to: '/api/assignments#get_assignment_with_attrs'
    
    resources :quizzes, only: [:show, :create, :update, :destroy] do
      resources :questions
    end
    get '/units/:unit_id/quizzes/get_quizzes_with_attrs', to: '/api/quizzes#get_quizzes_with_attrs'
    get '/units/:unit_id/quizzes/:quiz_id/get_quiz_with_attrs', to: '/api/quizzes#get_quiz_with_attrs'
    

    resources :quiz_submissions
    get '/courses/:course_id/quiz_submissions', to: '/api/quiz_submissions#get_submissions_by_course'
    get '/users/:user_id/quiz_submissions', to: '/api/quiz_submissions#get_submissions_by_user'
    get '/courses/:course_id/quizzes/:id/quiz_submissions', to: '/api/quiz_submissions#get_by_current_user_course_and_quiz'
    get '/courses/:course_id/quizzes/:quiz_id/get_users_submissions_by_quiz', to: '/api/quiz_submissions#get_users_submissions_by_quiz'
    put '/quiz_submissions/:id/calculate_grade', to: '/api/quiz_submissions#calculate_final_grade'


    post 'contents/search', to: '/api/contents#search_contents'
    post 'contents/search/:unit_id', to: '/api/contents#search_contents_not_in_unit'
    post 'assignments/search', to: '/api/assignments#search_assignments'
    post 'assignments/search/:unit_id', to: '/api/assignments#search_assignments_not_in_unit'
    post 'quizzes/search', to: '/api/quizzes#search_quizzes'
    post 'quizzes/search/:unit_id', to: '/api/quizzes#search_quizzes_not_in_unit'

  end
  
  get '*other', to: 'static#index'
end
