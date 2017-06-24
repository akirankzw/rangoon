json.array! @lessons do |lesson|
  json.extract! lesson, :id, :start_at, :attended, :aasm_state
  json.family_name lesson.book.try(:user).try(:family_name)
  json.given_name lesson.book.try(:user).try(:given_name)
  json.skype_name lesson.book.try(:user).try(:skype_name)
end
