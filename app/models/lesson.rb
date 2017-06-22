class Lesson < ApplicationRecord
  include AASM

  belongs_to :teacher
  has_one :book

  default_scope { where(teacher_id: 1) }

  scope :this_week, ->(dt) { where('start_at >= ? AND start_at <= ?', dt.beginning_of_day, dt.end_of_day + 1.week) }

  aasm do
    state :opened, initial: true
    state :closed, :booked, :finished, :done

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

    event :aasm_conduct do
      transitions from: :booked, to: :finished
    end

    event :aasm_submit do
      transitions from: :finished, to: :done
    end
  end
end
