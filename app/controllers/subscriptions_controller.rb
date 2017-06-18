class SubscriptionsController < ApplicationController
  before_action :authenticate_user!, except: :webhook
  protect_from_forgery except: :webhook

  def new
  end

  def create
    payment = CreditCardService.new(stripe_params)
    customer = payment.create_customer
    payment.charge
    subscription = current_user.subscription
    subscription.update!(email: params[:stripeEmail], stripe_token: params[:stripeToken], user_id: current_user.id, customer_id: customer.id)
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

  def unsubscribe
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    subscription = Stripe::Subscription.retrieve(current_user.subscription.subscription)
    subscription.delete()
    # subscription.delete(at_period_end: true)
  end

  def webhook
    event = Stripe::Event.retrieve(params[:id])
    case event.type
    when 'invoice.payment_succeeded'
      Subscription.find_by_customer_id(event.data.object.customer).renew(event.data.object.subscription)
    when 'customer.subscription.deleted'
      Subscription.find_by_customer_id(event.data.object.customer).delete
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
