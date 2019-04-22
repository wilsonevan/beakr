class Content < ApplicationRecord
  has_many :unit_contents, dependent: :destroy
  has_many :units, through: :unit_contents


  def self.search_contents(input)
    Content.find_by_sql(["
      SELECT * FROM contents
      WHERE title ILIKE ?
      ORDER BY title
    ", "#{input}%"])
  end

  def self.search_contents_not_in_unit(input, unit_id)
    Content.find_by_sql(["
      SELECT c.* FROM contents AS c
      WHERE c.title ILIKE ?
      ORDER BY c.title
    ", "#{input}%"])
  end

  def self.get_content_with_attrs(content_id, unit_id)
    User.find_by_sql(["
      SELECT c.*, uc.sequence, uc.visible, uc.id AS unit_content_id FROM contents AS c
      INNER JOIN unit_contents AS uc
        ON c.id = uc.content_id
      WHERE c.id = ?
      AND uc.unit_id = ?
      ", content_id, unit_id]).first()
  end
end
