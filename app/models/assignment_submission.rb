class AssignmentSubmission < ApplicationRecord
  belongs_to :assignment
  belongs_to :enrollment

  def self.find_by_enrollment_and_assignment(enrollment_id, assignment_id)
    Enrollment.find_by_sql(["
      SELECT * FROM assignment_submissions
      WHERE enrollment_id = ?
      AND assignment_id = ?
    ",enrollment_id, assignment_id ]).first()
  end
end
