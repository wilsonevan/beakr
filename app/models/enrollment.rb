class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :attendances, dependent: :destroy
  has_many :assignment_submissions, dependent: :destroy
  has_many :assignments, through: :assignment_submissions
  has_many :quiz_submissions, dependent: :destroy
  has_many :quizzes, through: :quiz_submissions

  def self.find_by_user_and_course(user_id, course_id)
    Enrollment.find_by_sql(["
      SELECT * FROM enrollments
      WHERE user_id = ?
      AND course_id = ?
    ",user_id, course_id ]).first()
  end

  # find the dates based on another enrollment
  def create_attendances
    enroll = Enrollment.all.detect {|e| e["course_id"] == self.course_id }

    enroll.attendances.each do |record|
      self.attendances.create(record_date: record.record_date)
    end
  end

end
