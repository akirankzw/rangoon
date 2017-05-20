require 'rails_helper'

RSpec.describe "lessons/edit", type: :view do
  before(:each) do
    @lesson = assign(:lesson, Lesson.create!(
      :teacher => nil,
      :attended => false,
      :canceled => false,
      :missed => false
    ))
  end

  it "renders the edit lesson form" do
    render

    assert_select "form[action=?][method=?]", lesson_path(@lesson), "post" do

      assert_select "input[name=?]", "lesson[teacher_id]"

      assert_select "input[name=?]", "lesson[attended]"

      assert_select "input[name=?]", "lesson[canceled]"

      assert_select "input[name=?]", "lesson[missed]"
    end
  end
end
