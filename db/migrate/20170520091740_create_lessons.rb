class CreateLessons < ActiveRecord::Migration[5.1]
  def change
    create_table :lessons, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.references :teacher, foreign_key: true
      t.datetime :start_time
      t.boolean :attended
      t.boolean :canceled
      t.boolean :missed

      t.timestamps
    end
  end
end
