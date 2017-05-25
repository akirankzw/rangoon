class Book < ApplicationRecord
  belongs_to :lesson
  belongs_to :user

  after_save :notify_user

  private

  def notify_user
    return unless user.account_setting.try(:email_notification)
    domain = 'ihearsayenglish.com'
    mg_client = Mailgun::Client.new ENV['MAILGUN_API_KEY']
    message_params = {
      from: "admin@#{domain}",
      to: user.email,
      subject: "Thanks, #{user.given_name}! Your reservation is now confirmed.",
      text: 'TODO'
    }
    result = mg_client.send_message(domain, message_params)
    logger.info result.as_json
  end
end
