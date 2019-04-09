class Unit < ApplicationRecord
  belongs_to :section
  has_many :unit_contents, dependent: :destroy
  has_many :contents, through: :unit_contents
  has_many :unit_assignments, dependent: :destroy
  has_many :assignments, through: :unit_assignments
end
