require 'rails_helper'

RSpec.describe "teachers/show", type: :view do
  before(:each) do
    @teacher = assign(:teacher, Teacher.create!(
      :given_name => "Given Name",
      :family_name => "Family Name",
      :sex => false,
      :nationality => 2,
      :comment => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Given Name/)
    expect(rendered).to match(/Family Name/)
    expect(rendered).to match(/false/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/MyText/)
  end
end
