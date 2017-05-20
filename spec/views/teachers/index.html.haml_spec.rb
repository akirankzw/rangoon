require 'rails_helper'

RSpec.describe "teachers/index", type: :view do
  before(:each) do
    assign(:teachers, [
      Teacher.create!(
        :given_name => "Given Name",
        :family_name => "Family Name",
        :sex => false,
        :nationality => 2,
        :comment => "MyText"
      ),
      Teacher.create!(
        :given_name => "Given Name",
        :family_name => "Family Name",
        :sex => false,
        :nationality => 2,
        :comment => "MyText"
      )
    ])
  end

  it "renders a list of teachers" do
    render
    assert_select "tr>td", :text => "Given Name".to_s, :count => 2
    assert_select "tr>td", :text => "Family Name".to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
