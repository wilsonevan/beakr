class Unit < ApplicationRecord
  belongs_to :section
  has_many :unit_contents, dependent: :destroy
  has_many :contents, through: :unit_contents
end
