json.data do |json|
  json.extract! @user, :id, :given_name, :family_name, :birthdate, :sex, :email
  json.avatar @user.avatar.url
  json.end_date @user.registration.end_date
  json.token form_authenticity_token
end
