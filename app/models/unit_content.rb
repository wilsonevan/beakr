class UnitContent < ApplicationRecord
  belongs_to :content
  belongs_to :unit

  def self.find_by_unit_and_content(unit_id, content_id)
    UnitContent.find_by_sql(["
      SELECT * FROM unit_contents AS uc
      WHERE uc.unit_id = ?
      AND uc.content_id = ?
    ", unit_id, content_id]).first()
  end
end
