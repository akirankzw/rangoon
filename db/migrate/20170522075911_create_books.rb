class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.references :lesson, foreign_key: true
      t.references :user, foreign_key: true
      t.string :comment
      t.boolean :canceled, default: false

      t.timestamps
    end
  end
end
