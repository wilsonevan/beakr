class ApplicationController < ActionController::API
  before_action :authenticate_user!, if: proc { request.controller_class.parent == Api }
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :configure_permitted_parameters, if: :devise_controller?


  

  protected

  def authenticate_admin
    if current_user.admin != true
      render json: 'unauthorized', status: 401
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :admin ])
  end
end