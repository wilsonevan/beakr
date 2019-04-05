class Content < ApplicationRecord
  has_many :unit_contents, dependent: :destroy
  has_many :units, through: :unit_contents
end
