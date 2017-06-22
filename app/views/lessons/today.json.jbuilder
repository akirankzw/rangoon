json.array! @books do |book|
  json.extract! book.lesson, :id, :start_at, :attended
  json.status book.lesson.aasm_state
  json.family_name book.user.family_name
  json.given_name book.user.given_name
  json.skype_name book.user.skype_name
end
