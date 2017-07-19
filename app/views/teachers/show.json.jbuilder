json.extract! @teacher, :id, :email, :given_name, :family_name, :birthdate, :comment, :gender, :timezone
json.avatar @teacher.avatar.url
