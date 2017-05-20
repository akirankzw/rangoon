json.extract! lesson, :id, :teacher_id, :start_time, :attended, :canceled, :missed, :created_at, :updated_at
json.url lesson_url(lesson, format: :json)
