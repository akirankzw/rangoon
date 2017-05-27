class ChargesController < ApplicationController

  def new
  end


  def create
    @amount = 100
    customer = Stripe::Customer.create(
      email:  params[:stripeEmail],
      source: params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      customer: customer.id,
      amount:   @amount,
      description: 'レッスン月額費用',
      currency: 'jpy'
    )
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end
end
