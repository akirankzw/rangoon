require 'rails_helper'

RSpec.describe "lessons/new", type: :view do
  before(:each) do
    assign(:lesson, Lesson.new(
      :teacher => nil,
      :attended => false,
      :canceled => false,
      :missed => false
    ))
  end

  it "renders new lesson form" do
    render

    assert_select "form[action=?][method=?]", lessons_path, "post" do

      assert_select "input[name=?]", "lesson[teacher_id]"

      assert_select "input[name=?]", "lesson[attended]"

      assert_select "input[name=?]", "lesson[canceled]"

      assert_select "input[name=?]", "lesson[missed]"
    end
  end
end
