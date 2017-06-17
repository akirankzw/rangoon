class SubscriptionsController < ApplicationController
  before_action :authenticate_user!, except: :webhook
  protect_from_forgery except: :webhook

  def new
  end

  def create
    payment = CreditCardService.new(stripe_params)
    customer = payment.create_customer
    payment.charge
    subscription = Subscription.new(email: params[:stripeEmail], stripe_token: params[:stripeToken], user_id: current_user.id, customer_id: customer.id)
    subscription.save!
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

  def webhook
    event = Stripe::Event.retrieve(params[:id])
    case event.type
    when 'invoice.payment_succeeded'
      Subscription.find_by_customer_id(event.data.object.customer).renew(event.data.object.subscription)
    end
    render status: :ok, json: 'success'
  end

  private

  def stripe_params
    {
      email:       params[:stripeEmail],
      source:      params[:stripeToken],
      plan:        Plan.first.title
    }
  end
end
