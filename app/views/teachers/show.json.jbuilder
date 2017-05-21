json.data do |json|
  json.array! @teacher.lessons do |lesson|
    json.teacher_id lesson.teacher_id
    json.start_time lesson.start_time
    json.canceled lesson.canceled
  end
end
