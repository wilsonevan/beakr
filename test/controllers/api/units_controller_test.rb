require 'test_helper'

class Api::UnitsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_units_index_url
    assert_response :success
  end

  test "should get show" do
    get api_units_show_url
    assert_response :success
  end

  test "should get create" do
    get api_units_create_url
    assert_response :success
  end

  test "should get update" do
    get api_units_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_units_destroy_url
    assert_response :success
  end

end
