require 'rails_helper'

RSpec.describe "users/edit", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      :given_name => "MyString",
      :family_name => "MyString",
      :sex => false
    ))
  end

  it "renders the edit user form" do
    render

    assert_select "form[action=?][method=?]", user_path(@user), "post" do

      assert_select "input[name=?]", "user[given_name]"

      assert_select "input[name=?]", "user[family_name]"

      assert_select "input[name=?]", "user[sex]"
    end
  end
end
