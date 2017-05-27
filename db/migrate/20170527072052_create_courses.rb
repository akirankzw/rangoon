class CreateCourses < ActiveRecord::Migration[5.1]
  def change
    create_table :courses, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.string :plan
      t.string :name
      t.integer :price
    end
  end
end
