require 'stripe'

class CreditCardService
  def initialize(params)
    @email = params[:email]
    @source = params[:source]
    @plan = params[:plan]
    @amount = 5000
    @currency = 'jpy'
    @description = 'レッスン月額費用'
    @customer = nil
  end

  def charge
    begin
      Stripe::Charge.create(charge_attributes)
    rescue => e
      logger.error e.message
    end
  end

  def create_customer
    @customer = Stripe::Customer.create(customer_attributes)
  rescue => e
    logger.error e.message
  end

  private

  attr_reader :email, :source, :plan, :amount, :currency, :description, :customer

  def charge_attributes
    {
      customer:    customer.id,
      amount:      amount,
      currency:    currency,
      description: description
    }
  end

  def customer_attributes
    {
      email:  email,
      source: source,
      plan:   plan
    }
  end
end
