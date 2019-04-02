require 'test_helper'

class Api::ContentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_contents_index_url
    assert_response :success
  end

  test "should get show" do
    get api_contents_show_url
    assert_response :success
  end

  test "should get create" do
    get api_contents_create_url
    assert_response :success
  end

  test "should get update" do
    get api_contents_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_contents_destroy_url
    assert_response :success
  end

end
