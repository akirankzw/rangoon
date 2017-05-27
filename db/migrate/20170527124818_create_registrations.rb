class CreateRegistrations < ActiveRecord::Migration[5.1]
  def change
    create_table :registrations, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.references :user, foreign_key: true
      t.string :email
      t.string :stripe_token
      t.date :end_date
      t.string :customer_id

      t.timestamps
    end
  end
end
