json.data do |json|
  json.extract! @user, :id, :given_name, :family_name, :birhdate, :sex, :email
  json.avatar @user.avatar.url
  json.end_date @user.registration.end_date
end
