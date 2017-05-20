require 'rails_helper'

RSpec.describe "teachers/new", type: :view do
  before(:each) do
    assign(:teacher, Teacher.new(
      :given_name => "MyString",
      :family_name => "MyString",
      :sex => false,
      :nationality => 1,
      :comment => "MyText"
    ))
  end

  it "renders new teacher form" do
    render

    assert_select "form[action=?][method=?]", teachers_path, "post" do

      assert_select "input[name=?]", "teacher[given_name]"

      assert_select "input[name=?]", "teacher[family_name]"

      assert_select "input[name=?]", "teacher[sex]"

      assert_select "input[name=?]", "teacher[nationality]"

      assert_select "textarea[name=?]", "teacher[comment]"
    end
  end
end
