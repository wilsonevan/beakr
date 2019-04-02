require 'test_helper'

class Api::SectionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_sections_index_url
    assert_response :success
  end

  test "should get show" do
    get api_sections_show_url
    assert_response :success
  end

  test "should get create" do
    get api_sections_create_url
    assert_response :success
  end

  test "should get update" do
    get api_sections_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_sections_destroy_url
    assert_response :success
  end

end
