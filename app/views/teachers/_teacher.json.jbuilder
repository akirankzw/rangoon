json.extract! teacher, :id, :given_name, :family_name, :birth_date, :sex, :nationality, :comment, :created_at, :updated_at
json.url teacher_url(teacher, format: :json)
