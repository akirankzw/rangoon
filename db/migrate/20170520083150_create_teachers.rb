class CreateTeachers < ActiveRecord::Migration[5.1]
  def change
    create_table :teachers, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.string :given_name
      t.string :family_name
      t.date :birth_date
      t.boolean :sex
      t.integer :nationality
      t.text :comment

      t.timestamps
    end
  end
end
