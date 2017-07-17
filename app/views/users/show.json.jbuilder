json.extract! @user, :id, :given_name, :family_name, :birthdate, :gender, :email, :skype_name, :timezone
json.avatar @user.avatar.url
json.end_date @user.subscription.end_date
json.state @user.subscription.aasm_state
json.token form_authenticity_token
json.email_notification @user.account_setting.email_notification
