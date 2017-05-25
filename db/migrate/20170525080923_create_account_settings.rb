class CreateAccountSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :account_settings, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.references :user, foreign_key: true
      t.boolean :email_notification, default: false

      t.timestamps
    end
  end
end
