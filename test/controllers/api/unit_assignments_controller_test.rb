require 'test_helper'

class Api::UnitAssignmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_unit_assignments_index_url
    assert_response :success
  end

  test "should get create" do
    get api_unit_assignments_create_url
    assert_response :success
  end

  test "should get destroy" do
    get api_unit_assignments_destroy_url
    assert_response :success
  end

end
