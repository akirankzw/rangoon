class Lesson < ApplicationRecord
  belongs_to :teacher
  has_one :book

  scope :this_week, ->(dt) { where('start_at >= ? AND start_at <= ?', dt.beginning_of_day, dt.end_of_day + 1.week) }
end
