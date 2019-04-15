class UnitQuiz < ApplicationRecord
  belongs_to :unit
  belongs_to :quiz

  def self.find_by_unit_and_quiz(unit_id, quiz_id)
    UnitQuiz.find_by_sql(["
      SELECT * FROM unit_quizzes AS uq
      WHERE uq.unit_id = ?
      AND uq.quiz_id = ?
    ", unit_id, quiz_id]).first()
  end
end
