class MasterMigration < ActiveRecord::Migration[5.1]
  def change
    create_table :teachers, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.string :given_name
      t.string :family_name
      t.date :birthdate
      t.integer :gender, limit: 1
      t.integer :nationality
      t.text :comment
      t.string :timezone, null: false, default: 'Tokyo'

      t.string :email,              null: false, default: ''
      t.string :encrypted_password, null: false, default: ''
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      t.timestamps
    end

    add_index :teachers, :email,                unique: true
    add_index :teachers, :reset_password_token, unique: true

    create_table :lessons, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.references :teacher, foreign_key: true
      t.datetime :start_at
      t.boolean :attended
      t.string :aasm_state

      t.timestamps
    end

    add_index :lessons, [:teacher_id, :start_at], unique: true

    create_table :users, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.string :given_name
      t.string :family_name
      t.date :birthdate
      t.integer :gender, limit: 1
      t.string :skype_name
      t.string :timezone, null: false, default: 'Tokyo'

      t.string :email,              null: false, default: ''
      t.string :encrypted_password, null: false, default: ''
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip

      t.timestamps
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true

    create_table :books, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.references :lesson, foreign_key: true
      t.references :user, foreign_key: true
      t.string :comment

      t.timestamps
    end

    create_table :account_settings, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.references :user, foreign_key: true
      t.boolean :email_notification, default: false

      t.timestamps
    end

    add_attachment :users, :avatar
    add_attachment :teachers, :avatar

    create_table :plans, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.string :title
      t.string :description
      t.integer :price
    end

    create_table :subscriptions, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.references :user, foreign_key: true
      t.string :email
      t.string :stripe_token
      t.date :end_date
      t.string :customer_id
      t.string :subscription
      t.string :aasm_state

      t.timestamps
    end

    add_index :subscriptions, :customer_id,     unique: true

    create_table :notes, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.references :lesson, foreign_key: true
      t.references :teacher, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
