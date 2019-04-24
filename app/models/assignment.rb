class Assignment < ApplicationRecord
  has_many :unit_assignments, dependent: :destroy
  has_many :units, through: :unit_assignments
  has_many :assignment_submissions, dependent: :destroy
  has_many :enrollments, through: :assignment_submissions

  def self.search_assignments(input)
    Assignment.find_by_sql(["
      SELECT * FROM assignments
      WHERE title ILIKE ?
      ORDER BY LOWER(title)
    ", "#{input}%"])
  end

  def self.search_assignments_not_in_unit(input, unit_id)
    Assignment.find_by_sql(["
      SELECT a.* FROM assignments AS a
      WHERE a.title ILIKE ?
      ORDER BY LOWER(a.title)
    ", "#{input}%"])
  end

  def self.get_assignment_with_attrs(assignment_id, unit_id)
    User.find_by_sql(["
      SELECT 
        a.*, 
        ua.due_date, 
        ua.sequence, 
        ua.visible, 
        ua.id AS unit_assignment_id
      FROM assignments AS a
      INNER JOIN unit_assignments AS ua
        ON a.id = ua.assignment_id
      WHERE a.id = ?
      AND ua.unit_id = ?
      ", assignment_id, unit_id]).first()
  end
end
