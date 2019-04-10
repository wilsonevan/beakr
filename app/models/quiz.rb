class Quiz < ApplicationRecord
  has_many :unit_quizzes, dependent: :destroy
  has_many :units, through: :unit_quizzes

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
end
