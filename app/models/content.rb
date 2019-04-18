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

    content = Content.find(content_id)
    uc = UnitContent.find_by_sql(["
      SELECT uc.sequence, uc.visible FROM unit_contents AS uc
      WHERE uc.content_id = ?
      AND uc.unit_id = ?
    ", content_id, unit_id]).first()

    return {
      id: content_id,
      title: content[:title],
      body: content[:body],
      created_at: content[:created_at],
      updated_at: content[:updated_at],
      sequence: uc[:sequence],
      visible: uc[:visible],
    }
  end
end
