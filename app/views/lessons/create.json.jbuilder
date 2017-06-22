json.extract! @lesson, :id, :teacher_id, :start_at, :attended
json.state @lesson.aasm_state
