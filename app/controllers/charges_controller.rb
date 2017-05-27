class ChargesController < ApplicationController
  protect_from_forgery except: :webhook

  def new
  end

  def create
    customer = Stripe::Customer.create(
      email:  params[:stripeEmail],
      source: params[:stripeToken],
      plan: Course.first.plan
    )
    charge = Stripe::Charge.create(
      customer: customer.id,
      amount:   5000,
      description: 'レッスン月額費用',
      currency: 'jpy'
    )
    @charge = Charge.new(email: params[:stripeEmail], stripe_token: params[:stripeToken], user_id: current_user.id, customer_id: customer.id)
    @charge.save!
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

  def webhook
    event = Stripe::Event.retrieve(params[:id])
    case event.type
    when 'invoice.payment_succeeded'
      Charge.find_by_customer_id(event.data.object.customer).renew
    end
    render status: :ok, json: 'success'
  end
end
