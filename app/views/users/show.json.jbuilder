json.data do |json|
  json.extract! @user, :id, :given_name, :family_name, :birthdate, :sex, :email
  json.avatar @user.avatar.url
  json.end_date @user.subscription.end_date
  json.state @user.subscription.aasm_state
  json.token form_authenticity_token
end
