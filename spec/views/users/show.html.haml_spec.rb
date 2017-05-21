require 'rails_helper'

RSpec.describe "users/show", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      :given_name => "Given Name",
      :family_name => "Family Name",
      :sex => false
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Given Name/)
    expect(rendered).to match(/Family Name/)
    expect(rendered).to match(/false/)
  end
end
