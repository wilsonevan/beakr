
class Api::UsersController < ApplicationController
  before_action :authorize_admin, only: [:index]
  before_action :set_user, only: [:show, :get_user_grades, :calc_total_grades]

  def index
    users = User.all
    render json: users
  end

  def show
    render json: @user
  end

  def search_users
    render( json: User.search_users(params[:input]))
  end

  def search_users_with_role
    render( json: User.search_users_with_role(params[:input], params[:course_id]) )
  end
  
  def search_staff_enrolled
    render( json: User.search_staff_enrolled(params[:input], params[:id]) )
  end

  def search_students_enrolled
    render( json: User.search_students_enrolled(params[:input], params[:id]) )
  end

  def get_user_grades
    render json: User.get_user_grades(@user.id)
  end

  def calc_total_grades
    render json: User.calc_total_grades(@user.id)
  end

  def user_courses
    courses = current_user.courses
    render json: courses
  end

  def update
    user = User.find(params[:id])
    user.first_name = params[:first_name] ? params[:first_name] : user.first_name
    user.last_name = params[:last_name] ? params[:last_name] : user.last_name
    user.email = params[:email] ? params[:email] : user.email
    user.biography = params[:biography] ? params[:biography] : user.biography
    user.birth_date = params[:birth_date] ? params[:birth_date] : user.birth_date
    file = params[:file]
    if file != ""
      Tinify.key = ENV["TINY_PNG"]
      image_name = params.keys.first
      source = Tinify.from_file(file.tempfile)
      source.to_file(image_name)
      begin
        cloud_image = Cloudinary::Uploader.upload(image_name, public_id: file.original_filename, secure: true)
        user.image = cloud_image['secure_url']
        File.delete(image_name) if File.exists?(image_name)
      rescue
        # render json: { errors: e }, status: 422
      end
    end
    if user.save
      render json: user
    else
      # render json: { errors: e }, status: 422
    end
  end
  
  private

  def set_user
    @user = User.find(params[:id])
  end
  
end
