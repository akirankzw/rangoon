class AddAvatarColumnsToTeachers < ActiveRecord::Migration[5.1]
  def up
    add_attachment :teachers, :avatar
  end

  def down
    remove_attachment :teachers, :avatar
  end
end
