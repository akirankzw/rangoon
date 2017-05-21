json.extract! user, :id, :given_name, :family_name, :birhdate, :sex, :created_at, :updated_at
json.url user_url(user, format: :json)
