class Section < ApplicationRecord
  belongs_to :courses
  has_many :units, dependent: :destroy
end
