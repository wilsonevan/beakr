class Quiz < ApplicationRecord
  has_many :unit_quizzes, dependent: :destroy
  has_many :units, through: :unit_quizzes
  has_many :questions, dependent: :destroy
  # Quiz_submissions is not set to dependent destroy so we can destroy 
  # a quiz and keep the submission for histrical purposes.
  has_many :quiz_submissions
  has_many :enrollments, through: :quiz_submissions

  def self.search_quizzes(input)
    Quiz.find_by_sql(["
      SELECT * FROM quizzes
      WHERE title ILIKE ?
      ORDER BY title
    ", "#{input}%"])
  end

  def self.search_quizzes_not_in_unit(input, unit_id)
    Quiz.find_by_sql(["
      SELECT a.* FROM quizzes AS a
      WHERE a.title ILIKE ?
      ORDER BY LOWER(a.title)
    ", "#{input}%"])
  end

  def self.get_quiz_with_attrs(quiz_id, unit_id)
    User.find_by_sql(["
      SELECT q.*, uq.due_date, uq.sequence, uq.visible, uq.id AS unit_quiz_id FROM quizzes AS q
      INNER JOIN unit_quizzes AS uq
        ON q.id = uq.quiz_id
      WHERE q.id = ?
      AND uq.unit_id = ?
      ", quiz_id, unit_id]).first()
  end
end
