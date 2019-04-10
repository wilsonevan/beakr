class Course < ApplicationRecord
  has_many :sections, dependent: :destroy
  has_many :enrollments, dependent: :destroy
  has_many :users, through: :enrollments


  def self.search_courses(input)
    Course.find_by_sql(["
      SELECT * FROM courses
      WHERE title ILIKE ?
      ", "#{input}%"])
  end
end
