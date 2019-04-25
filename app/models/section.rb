class Section < ApplicationRecord
  belongs_to :course
  has_many :units, dependent: :destroy

  def self.get_ordered_by_sequence(course_id)
    Section.find_by_sql(["
      SELECT * FROM sections
      WHERE course_id = ?
      ORDER BY sequence
    ", course_id])
  end

end
