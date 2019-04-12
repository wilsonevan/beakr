class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :attendances, dependent: :destroy
  has_many :assignment_submissions, dependent: :destroy
  has_many :assignments, through: :assignment_submissions

  def self.find_by_user_and_course(user_id, course_id)
    Enrollment.find_by_sql(["
      SELECT * FROM enrollments
      WHERE user_id = ?
      AND course_id = ?
    ",user_id, course_id ]).first()
  end

end
