json.array! @users do |user|
  json.extract! user, :id, :given_name, :family_name, :birthdate, :gender, :email, :skype_name
  json.avatar user.avatar.url
  json.payment_status user.subscription.aasm_state
  json.end_date user.subscription.end_date
end
