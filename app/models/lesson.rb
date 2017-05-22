class Lesson < ApplicationRecord
  belongs_to :teacher
  has_one :book
end
