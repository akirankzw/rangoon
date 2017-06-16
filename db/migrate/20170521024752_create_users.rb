class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.string :given_name
      t.string :family_name
      t.date :birthdate
      t.boolean :sex

      t.timestamps
    end
  end
end
