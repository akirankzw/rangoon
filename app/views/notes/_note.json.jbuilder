json.extract! note, :id, :lesson_id, :teacher_id, :content, :created_at, :updated_at
json.url note_url(note, format: :json)
