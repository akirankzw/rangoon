json.array! @books do |book|
  json.extract! book.lesson, :id, :start_at, :attended
  json.status book.lesson.aasm_state
  json.user book.user_id
end
