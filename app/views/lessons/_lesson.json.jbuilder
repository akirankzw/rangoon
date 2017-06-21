json.extract! lesson, :id, :teacher_id, :start_at, :attended, :canceled, :created_at, :updated_at
json.url lesson_url(lesson, format: :json)
