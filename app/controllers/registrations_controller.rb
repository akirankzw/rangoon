class RegistrationsController < ApplicationController
  before_action :authenticate_user!, except: :webhook
  protect_from_forgery except: :webhook

  def new
  end

  def create
    payment = CreditCardService.new(stripe_params)
    customer = payment.create_customer
    payment.charge
    registration = Registration.new(email: params[:stripeEmail], stripe_token: params[:stripeToken], user_id: current_user.id, customer_id: customer.id)
    registration.save!
  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

  def webhook
    event = Stripe::Event.retrieve(params[:id])
    case event.type
    when 'invoice.payment_succeeded'
      Registration.find_by_customer_id(event.data.object.customer).renew
    end
    render status: :ok, json: 'success'
  end

  private

  def stripe_params
    {
      email:       params[:stripeEmail],
      source:      params[:stripeToken],
      plan:        Course.first.plan
    }
  end
end
