class Question < ApplicationRecord
  belongs_to :quiz

  serialize :choices, Array
end
