class Lesson < ApplicationRecord
  belongs_to :teacher
  has_one :book

  scope :this_week, ->(dt) { where('start_time >= ? AND start_time <= ?', dt.beginning_of_day, dt.end_of_day + 1.week) }
end
