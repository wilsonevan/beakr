# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :enrollments, dependent: :destroy
  has_many :courses, through: :enrollments

  def self.search_users_with_role(input, course_id)
    User.find_by_sql(["
      SELECT u.*,  
                  CASE WHEN e.course_id <> ? 
                    THEN NULL
                    ELSE e.role
                  END
      FROM users AS u
      LEFT JOIN enrollments AS e
        ON e.user_id = u.id
      WHERE ( u.first_name ILIKE ? OR u.last_name ILIKE ? )
      ORDER BY u.first_name, u.last_name
    ", course_id, "#{input}%", "#{input}%" ])
  end

  def self.search_staff_enrolled(input, course_id)
    User.find_by_sql(["
      SELECT u.*, e.role  FROM users AS u
      INNER JOIN enrollments AS e
        ON e.user_id = u.id
      WHERE e.course_id = ?
      AND e.role = 'staff'
      AND ( u.first_name ILIKE ? OR u.last_name ILIKE ? )
      ORDER BY u.first_name
    ", course_id, "#{input}%", "#{input}%" ])
  end

  def self.search_students_enrolled(input, course_id)
    User.find_by_sql(["
      SELECT u.*, e.role  FROM users AS u
      INNER JOIN enrollments AS e
        ON e.user_id = u.id
      WHERE e.course_id = ?
      AND e.role = 'student'
      AND ( u.first_name ILIKE ? OR u.last_name ILIKE ? )
      ORDER BY u.first_name
    ", course_id, "#{input}%", "#{input}%" ])
  end
end
