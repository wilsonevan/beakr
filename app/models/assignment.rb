class Assignment < ApplicationRecord
  has_many :unit_assignments, dependent: :destroy
  has_many :units, through: :unit_assignments
  has_many :assignment_submissions, dependent: :destroy
  has_many :enrollments, through: :assignment_submissions

  def self.search_assignments(input)
    Assignment.find_by_sql(["
      SELECT * FROM assignments
      WHERE title ILIKE ?
      ORDER BY title
    ", "#{input}%"])
  end

  def self.search_assignments_not_in_unit(input, unit_id)
    Assignment.find_by_sql(["
      SELECT a.* FROM assignments AS a
      WHERE a.title ILIKE ?
      ORDER BY a.title
    ", "#{input}%"])
  end
end
