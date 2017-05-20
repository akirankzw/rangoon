require 'rails_helper'

RSpec.describe "lessons/index", type: :view do
  before(:each) do
    assign(:lessons, [
      Lesson.create!(
        :teacher => nil,
        :attended => false,
        :canceled => false,
        :missed => false
      ),
      Lesson.create!(
        :teacher => nil,
        :attended => false,
        :canceled => false,
        :missed => false
      )
    ])
  end

  it "renders a list of lessons" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end
