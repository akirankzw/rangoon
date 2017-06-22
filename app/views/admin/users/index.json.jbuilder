json.array! @users do |user|
  json.id user.id
  json.family_name user.family_name
  json.given_name user.given_name
  json.email user.email
  json.birthdate user.birthdate
  json.payment_status user.subscription.aasm_state
  json.end_date user.subscription.end_date
end
