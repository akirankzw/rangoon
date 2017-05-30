class Lesson < ApplicationRecord
  belongs_to :teacher
  has_one :book

  scope :this_week, -> (dt) { where("start_time >= ?", dt.beginning_of_day).where("start_time <= ?", dt.end_of_day + 1.week) }
end
