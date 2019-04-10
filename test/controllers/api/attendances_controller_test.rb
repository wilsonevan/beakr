require 'test_helper'

class Api::AttendancesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_attendances_index_url
    assert_response :success
  end

  test "should get create" do
    get api_attendances_create_url
    assert_response :success
  end

  test "should get update" do
    get api_attendances_update_url
    assert_response :success
  end

end
