class Assignment < ApplicationRecord
  has_many :unit_assignments, dependent: :destroy
  has_many :units, through: :unit_assignments
end
