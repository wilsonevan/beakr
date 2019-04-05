
class Api::UsersController < ApplicationController
  before_action :authenticate_admin, only: [:index]
  before_action :authenticate_user!


  def index
    users = User.all
    render json: users
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
      binding.pry
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
  

  
end
