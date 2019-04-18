class QuizSubmission < ApplicationRecord
  belongs_to :quiz, optional: true
  belongs_to :enrollment

  serialize :questions, Array

  def self.find_by_user_course_and_quiz(user_id, course_id, quiz_id)
    QuizSubmission.find_by_sql(["
      SELECT qs.* FROM quiz_submissions AS qs 
      INNER JOIN enrollments AS e
        ON qs.enrollment_id = e.id
      WHERE e.user_id = ?
      AND e.course_id = ?
      AND qs.quiz_id = ?
    ", user_id, course_id, quiz_id]).first()
  end

  def self.find_by_quiz_and_enrollment(quiz_id, enrollment_id)
    QuizSubmission.find_by_sql(["
      SELECT * FROM quiz_submissions
      WHERE quiz_id = ?
      AND enrollment_id = ?
    ", quiz_id, enrollment_id]).first()
  end
end
