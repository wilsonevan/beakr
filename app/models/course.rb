class Course < ApplicationRecord
  has_many :sections, dependent: :destroy
  has_many :enrollments, dependent: :destroy
  has_many :users, through: :enrollments
  has_many :attendances, through: :enrollments

  def self.search_courses(input)
    Course.find_by_sql(["
      SELECT * FROM courses
      WHERE title ILIKE ?
      ORDER BY title
      ", "#{input}%"])
  end

end
