require 'rails_helper'

RSpec.describe "users/index", type: :view do
  before(:each) do
    assign(:users, [
      User.create!(
        :given_name => "Given Name",
        :family_name => "Family Name",
        :sex => false
      ),
      User.create!(
        :given_name => "Given Name",
        :family_name => "Family Name",
        :sex => false
      )
    ])
  end

  it "renders a list of users" do
    render
    assert_select "tr>td", :text => "Given Name".to_s, :count => 2
    assert_select "tr>td", :text => "Family Name".to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end
