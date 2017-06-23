json.array! @lessons do |lesson|
  json.extract! lesson, :id, :teacher_id, :start_at, :attended, :aasm_state
end
