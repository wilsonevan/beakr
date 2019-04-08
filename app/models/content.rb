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
      INNER JOIN unit_contents as uc
        ON c.id = uc.content_id
      WHERE c.title ILIKE ?
      AND uc.unit_id <> ?
      GROUP BY c.id
      ORDER BY c.title
    ", "#{input}%", unit_id])
  end
end
