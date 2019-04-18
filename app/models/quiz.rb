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
      ORDER BY a.title
    ", "#{input}%"])
  end

  def self.get_quiz_with_attrs(quiz_id)

    # quiz = find_by_sql(["
    #   SELECT q.*, uq.due_date AS due_date FROM quizzes AS q
    #   LEFT JOIN unit_quizzes AS uq
    #     ON uq.quiz_id = q.id
    #   WHERE q.id = ?
    #   AND uq.quiz_id = ?
    #   ", quiz_id, quiz_id]).first()

    #   p quiz
    #   return quiz

    quiz = Quiz.find(quiz_id)
    uq = UnitQuiz.find_by_sql(["
      SELECT uq.sequence, uq.visible, uq.due_date FROM unit_quizzes AS uq
      WHERE uq.quiz_id = ?
    ", quiz_id]).first()

    return {
      id: quiz_id,
      title: quiz[:title],
      body: quiz[:body],
      created_at: assignment[:created_at],
      updated_at: assignment[:updated_at],
      sequence: uq[:sequence],
      visible: uq[:visible],
      due_date: uq[:due_date],
    }
  end
end
