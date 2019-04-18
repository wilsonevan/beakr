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

  def self.get_assignment_with_attrs(assignment_id, unit_id)

    assignment = Assignment.find(assignment_id)
    ua = UnitAssignment.find_by_sql(["
      SELECT ua.sequence, ua.visible, ua.due_date, ua.id FROM unit_assignments AS ua
      WHERE ua.assignment_id = ?
      AND ua.unit_id = ?
    ", assignment_id, unit_id]).first()

    return {
      id: assignment_id,
      unit_assignment_id: ua[:id],
      title: assignment[:title],
      body: assignment[:body],
      created_at: assignment[:created_at],
      updated_at: assignment[:updated_at],
      sequence: ua[:sequence],
      visible: ua[:visible],
      due_date: ua[:due_date],
    }
  end
end
