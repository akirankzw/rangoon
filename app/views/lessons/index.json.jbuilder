json.data do |json|
  json.array! @lessons do |lesson|
    json.lesson_id lesson.id
    json.teacher_id lesson.teacher_id
    json.start_time lesson.start_time
    json.canceled lesson.canceled
    json.book_id lesson.book.try(:id)
    json.user_id lesson.book.try(:user_id)
  end
end
