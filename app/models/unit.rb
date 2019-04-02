class Unit < ApplicationRecord
  belongs_to :section
  has_many :contents
end
