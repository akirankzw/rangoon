class Subscription < ApplicationRecord
  belongs_to :user

  def renew(subscription)
    update(end_date: Time.zone.now + 1.month, subscription: subscription)
  end
end
