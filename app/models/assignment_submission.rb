class AssignmentSubmission < ApplicationRecord
  belongs_to :assignment
  belongs_to :enrollment
end
