json.array! @lessons do |lesson|
  json.id lesson.book.id
  json.start_at lesson.start_at
  json.lesson_id lesson.id
  json.user_id lesson.book.user_id
  json.teacher_id lesson.teacher.id
  json.teacher_name lesson.teacher.full_name
  json.comment lesson.book.comment
  json.note_id lesson.note.id
end
