class Book < ApplicationRecord
  belongs_to :lesson
  belongs_to :user

  after_save :notify_user

  scope :over_booking, lambda { |book, uid|
    joins(:lesson)
      .where(user_id: uid)
      .where('lessons.start_time >= ?', book.lesson.start_time.beginning_of_day)
      .where('lessons.start_time <= ?', book.lesson.start_time.end_of_day)
  }

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
