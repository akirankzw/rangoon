require 'rails_helper'

RSpec.describe "users/new", type: :view do
  before(:each) do
    assign(:user, User.new(
      :given_name => "MyString",
      :family_name => "MyString",
      :sex => false
    ))
  end

  it "renders new user form" do
    render

    assert_select "form[action=?][method=?]", users_path, "post" do

      assert_select "input[name=?]", "user[given_name]"

      assert_select "input[name=?]", "user[family_name]"

      assert_select "input[name=?]", "user[sex]"
    end
  end
end
