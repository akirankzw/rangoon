json.data do |json|
  json.array! @lessons do |lesson|
    json.book_id lesson.book.id
    json.datetime (lesson.start_time + 9.hours).strftime("%Y/%m/%d %H:%M")# TODO
    json.lesson_id lesson.id
    json.user_id lesson.book.user_id
    json.teacher_id lesson.teacher.id
    json.teacher_name lesson.teacher.full_name
    json.comment lesson.book.comment
    json.canceled lesson.book.canceled
  end
end
