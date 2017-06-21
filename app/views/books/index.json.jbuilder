json.data do |json|
  json.array! @lessons do |lesson|
    json.id lesson.book.id
    json.datetime (lesson.start_at + 9.hours).strftime("%Y/%m/%d %H:%M")# TODO
    json.lesson_id lesson.id
    json.user_id lesson.book.user_id
    json.teacher_id lesson.teacher.id
    json.teacher_name lesson.teacher.full_name
    json.comment lesson.book.comment
  end
end
