require 'rails_helper'

RSpec.describe "teachers/edit", type: :view do
  before(:each) do
    @teacher = assign(:teacher, Teacher.create!(
      :given_name => "MyString",
      :family_name => "MyString",
      :sex => false,
      :nationality => 1,
      :comment => "MyText"
    ))
  end

  it "renders the edit teacher form" do
    render

    assert_select "form[action=?][method=?]", teacher_path(@teacher), "post" do

      assert_select "input[name=?]", "teacher[given_name]"

      assert_select "input[name=?]", "teacher[family_name]"

      assert_select "input[name=?]", "teacher[sex]"

      assert_select "input[name=?]", "teacher[nationality]"

      assert_select "textarea[name=?]", "teacher[comment]"
    end
  end
end
