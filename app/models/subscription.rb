class Subscription < ApplicationRecord
  include AASM

  belongs_to :user

  aasm do
    state :unsubscribed, initial: true
    state :subscribed, :canceled

    event :unsubscribe do
      transitions from: :canceled, to: :unsubscribed
    end

    event :subscribe do
      transitions from: :unsubscribed, to: :subscribed
    end

    event :cancel do
      transitions from: :subscribed, to: :canceled
    end
  end

  def renew(subscription)
    update(end_date: Time.zone.now + 1.month, subscription: subscription)
  end

  def delete
    # update aasm_state
    update({})
  end
end
