class Lesson < ApplicationRecord
  include AASM

  belongs_to :teacher
  has_one :book
  has_one :note, autosave: true

  before_create :build_note

  default_scope { where(teacher_id: 1) }

  scope :this_week, ->(dt) { where('start_at >= ? AND start_at <= ?', dt.beginning_of_day, dt.end_of_day + 1.week) }

  scope :today, lambda { |dt|
    joins('LEFT JOIN books ON lessons.id = books.lesson_id LEFT JOIN users ON books.user_id = users.id')
      .where('lessons.start_at >= ?', dt.beginning_of_day)
      .where('lessons.start_at <= ?', dt.end_of_day)
  }

  aasm do
    state :opened, initial: true
    state :closed, :booked, :done

    event :aasm_open do
      transitions from: :closed, to: :opened
    end

    event :aasm_close do
      transitions from: :opened, to: :closed
    end

    event :aasm_book do
      transitions from: :opened, to: :booked do
        guard do
          present?
        end
      end
    end

    event :aasm_cancel do
      transitions from: :booked, to: :opened
    end

    event :aasm_finish do
      transitions from: [:booked, :done], to: :done
    end
  end
end
