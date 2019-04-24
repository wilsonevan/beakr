# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_24_012506) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assignment_submissions", force: :cascade do |t|
    t.float "grade"
    t.text "body"
    t.text "code"
    t.bigint "assignment_id"
    t.bigint "enrollment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "url"
    t.text "feedback"
    t.float "points_possible"
    t.float "points_awarded"
    t.boolean "graded"
    t.index ["assignment_id"], name: "index_assignment_submissions_on_assignment_id"
    t.index ["enrollment_id"], name: "index_assignment_submissions_on_enrollment_id"
  end

  create_table "assignments", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "body"
    t.string "kind"
    t.float "points_possible"
  end

  create_table "attendances", force: :cascade do |t|
    t.bigint "enrollment_id"
    t.date "record_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "attendance_record", default: "present"
    t.index ["enrollment_id"], name: "index_attendances_on_enrollment_id"
  end

  create_table "contents", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "body"
  end

  create_table "courses", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "archived"
  end

  create_table "enrollments", force: :cascade do |t|
    t.string "role"
    t.bigint "user_id"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_enrollments_on_course_id"
    t.index ["user_id"], name: "index_enrollments_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "choices"
    t.text "body"
    t.text "submitted_text"
    t.integer "submitted_choice"
    t.text "submitted_code"
    t.float "points_possible"
    t.float "points_awarded"
    t.bigint "quiz_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "kind"
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quiz_submissions", force: :cascade do |t|
    t.bigint "quiz_id"
    t.bigint "enrollment_id"
    t.float "grade"
    t.float "points_possible"
    t.float "points_awarded"
    t.boolean "graded"
    t.text "comment"
    t.string "questions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["enrollment_id"], name: "index_quiz_submissions_on_enrollment_id"
    t.index ["quiz_id"], name: "index_quiz_submissions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "body"
  end

  create_table "sections", force: :cascade do |t|
    t.string "title"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sequence"
    t.boolean "visible"
    t.index ["course_id"], name: "index_sections_on_course_id"
  end

  create_table "unit_assignments", force: :cascade do |t|
    t.bigint "unit_id"
    t.bigint "assignment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sequence"
    t.boolean "visible"
    t.datetime "due_date"
    t.index ["assignment_id"], name: "index_unit_assignments_on_assignment_id"
    t.index ["unit_id"], name: "index_unit_assignments_on_unit_id"
  end

  create_table "unit_contents", force: :cascade do |t|
    t.bigint "content_id"
    t.bigint "unit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sequence"
    t.boolean "visible"
    t.index ["content_id"], name: "index_unit_contents_on_content_id"
    t.index ["unit_id"], name: "index_unit_contents_on_unit_id"
  end

  create_table "unit_quizzes", force: :cascade do |t|
    t.bigint "unit_id"
    t.bigint "quiz_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sequence"
    t.boolean "visible"
    t.datetime "due_date"
    t.index ["quiz_id"], name: "index_unit_quizzes_on_quiz_id"
    t.index ["unit_id"], name: "index_unit_quizzes_on_unit_id"
  end

  create_table "units", force: :cascade do |t|
    t.string "title"
    t.bigint "section_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sequence"
    t.boolean "visible"
    t.index ["section_id"], name: "index_units_on_section_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "first_name"
    t.string "last_name"
    t.string "image"
    t.string "email"
    t.boolean "admin"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "biography"
    t.date "birth_date"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "assignment_submissions", "assignments"
  add_foreign_key "assignment_submissions", "enrollments"
  add_foreign_key "attendances", "enrollments"
  add_foreign_key "enrollments", "courses"
  add_foreign_key "enrollments", "users"
  add_foreign_key "questions", "quizzes"
  add_foreign_key "quiz_submissions", "enrollments"
  add_foreign_key "quiz_submissions", "quizzes"
  add_foreign_key "sections", "courses"
  add_foreign_key "unit_assignments", "assignments"
  add_foreign_key "unit_assignments", "units"
  add_foreign_key "unit_contents", "contents"
  add_foreign_key "unit_contents", "units"
  add_foreign_key "unit_quizzes", "quizzes"
  add_foreign_key "unit_quizzes", "units"
  add_foreign_key "units", "sections"
end
