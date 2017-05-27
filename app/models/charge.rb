class Charge < ApplicationRecord
  def renew
    update_attribute :end_date, Time.zone.now + 1.month
  end
end
