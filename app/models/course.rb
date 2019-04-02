class Course < ApplicationRecord
  has_many :sections, dependent: :destroy
  has_many :enrollments, dependent: :destroy
  has_meny :users, through: :enrollments
end
