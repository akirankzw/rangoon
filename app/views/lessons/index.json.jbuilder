json.array! @lessons do |lesson|
  json.extract! lesson, :id, :teacher_id, :start_at, :aasm_state
  json.user_id lesson.book.try(:user_id)
  json.user_name lesson.book.try(:user).try(:given_name)
end
