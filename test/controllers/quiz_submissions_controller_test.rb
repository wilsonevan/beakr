require 'test_helper'

class QuizSubmissionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get quiz_submissions_index_url
    assert_response :success
  end

  test "should get get_submissions_by_course" do
    get quiz_submissions_get_submissions_by_course_url
    assert_response :success
  end

  test "should get get_submissions_by_user" do
    get quiz_submissions_get_submissions_by_user_url
    assert_response :success
  end

  test "should get show" do
    get quiz_submissions_show_url
    assert_response :success
  end

  test "should get create" do
    get quiz_submissions_create_url
    assert_response :success
  end

  test "should get update" do
    get quiz_submissions_update_url
    assert_response :success
  end

  test "should get set_final_grade" do
    get quiz_submissions_set_final_grade_url
    assert_response :success
  end

  test "should get destroy" do
    get quiz_submissions_destroy_url
    assert_response :success
  end

end
