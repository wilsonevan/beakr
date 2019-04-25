class UnitAssignment < ApplicationRecord
  belongs_to :unit
  belongs_to :assignment

  def self.find_by_unit_and_assignment(unit_id, assignment_id)
    UnitAssignment.find_by_sql(["
      SELECT * FROM unit_assignments AS ua
      WHERE ua.unit_id = ?
      AND ua.quiz_id = ?
    ", unit_id, assignment_id]).first()
  end
end
