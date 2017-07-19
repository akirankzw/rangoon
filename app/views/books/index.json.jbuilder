json.array! @lessons do |lesson|
  json.id lesson.book.id
  json.start_at lesson.start_at
  json.comment lesson.book.comment
  json.note_id lesson.note.id
  json.aasm_state lesson.aasm_state
end
