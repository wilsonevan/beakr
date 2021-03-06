class Timer
  @start = nil

  def self.start
    @start = Time.now
  end

  def self.log_and_reset
    puts "   In #{Time.now - @start} Seconds"
    @start = Time.now
  end

  def self.stop
    @start = nil
  end
end


class Sequence 
  def initialize()
    @count = 0
  end

  def get
    return @count
  end

  def inc
    @count += 1
  end

  def reset
    @count = 0
  end
end

section_sequence = Sequence.new()
unit_sequence = Sequence.new()
material_sequence = Sequence.new()


Timer.start
puts "\n1) DESTROYING OLD DATA"

Course.destroy_all
User.destroy_all
Content.destroy_all
Quiz.destroy_all
Assignment.destroy_all
Timer.log_and_reset()


puts "\n2) CREATING COURSES SECTIONS UNITS AND MATERIALS "
5.times do
  course = Course.create(
    title: Faker::Educator.course_name
  )
  15.times do
    section = Section.create(
      title: Faker::ProgrammingLanguage.name,
      course_id: course.id,
      visible: true,
      sequence: section_sequence.get(),
    )
    section_sequence.inc()

    5.times do
      unit = Unit.create(
        title: Faker::Hacker.noun,
        section_id: section.id,
        visible: true,
        sequence: unit_sequence.get(),
      )
      unit_sequence.inc()

      3.times do
        content = Content.create(
          title: Faker::Hacker.verb,
          body: Faker::Lorem.paragraph,
        )

        UnitContent.create(
          unit_id: unit.id,
          content_id: content.id,
          visible: true,
          sequence: material_sequence.get(),
        )
        material_sequence.inc()
      end
      1.times do
        assignment = Assignment.create(
          title: Faker::Science.element,
          body: Faker::Movies::Ghostbusters.quote,
          kind: "url",
          points_possible: 20,
        )
          
        UnitAssignment.create(
          unit_id: unit.id,
          assignment_id: assignment.id,
          visible: true,
          sequence: material_sequence.get(),
          due_date: Faker::Date.forward(60)
        )
        material_sequence.inc()
      end
      1.times do
        quiz = Quiz.create(
          title: Faker::Currency.name,
          body: Faker::Lorem.paragraph(30),
        )

        quiz.questions.create(
          kind: "choice",
          body: "The coice-based question is being asked here",
          choices: [
            {option: 1, text: "choice one text here", correct: true}, 
            {option: 2, text: "choice two text here", correct: false},
            {option: 3, text: "choice three text here", correct: false},
            {option: 4, text: "choice four text here", correct: false}
          ],
          submitted_choice: nil,
          submitted_text: nil,
          submitted_code: nil,
          points_possible: 20,
          points_awarded: 0,
        )

        quiz.questions.create(
          kind: "text",
          body: "The text-based question is being asked here",
          choices: nil,
          submitted_choice: nil,
          submitted_text: nil,
          submitted_code: nil,
          points_possible: 20,
          points_awarded: 0,
        )

        quiz.questions.create(
          kind: "code",
          body: "The code-based question is being asked here",
          choices: nil,
          submitted_choice: nil,
          submitted_text: nil,
          submitted_code: nil,
          points_possible: 20,
          points_awarded: 0,
        )

        UnitQuiz.create(
          unit_id: unit.id,
          quiz_id: quiz.id,
          visible: true,
          sequence: material_sequence.get(),
          due_date: Faker::Date.forward(60),
        )
        material_sequence.inc()
      end
      material_sequence.reset()
    end
    unit_sequence.reset()
  end
  section_sequence.reset()
end
Timer.log_and_reset


puts "\n3) CREATING ENROLLED USERS / SUBMISSIONS / ATTENDANCES"
Course.all.each do |course|
  20.times do
    user = User.create(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.email,
      biography: Faker::TvShows::MichaelScott.quote,
      birth_date: Faker::Date.birthday(18, 65),
      password: 'password',
      admin: false
    )
    1.times do
      e = Enrollment.create(
        user_id: user.id,
        course_id: course.id,
        role: 'student'
      )

      course.sections.each do |section|
        section.units.each do |unit|
          unit.quizzes.each do |quiz|
        
            QuizSubmission.create(
              quiz_id: quiz.id,
              enrollment_id: e.id,
              points_possible: 60,
              points_awarded: 20,
              grade: 33.33,
              graded: false,
              comment: "teacher comment enetered on quiz submission here",
              questions: [
                {
                  id: 1,
                  kind: "choice",
                  body: "The coice-based question is being asked here",
                  choices: [
                    {option: 1, text: "choice one text here", correct: true}, 
                    {option: 2, text: "choice two text here", correct: false},
                    {option: 3, text: "choice three text here", correct: false},
                    {option: 4, text: "choice four text here", correct: false}
                  ],
                  submitted_choice: 1,
                  submitted_text: nil,
                  submitted_code: nil,
                  points_possible: 20,
                  points_awarded: 20,
                },
                {
                  id: 2,
                  kind: "text",
                  body: "The text-based question is being asked here",
                  choices: nil,
                  submitted_choice: nil,
                  submitted_text: "user answered text question here",
                  submitted_code: nil,
                  points_possible: 20,
                  points_awarded: 0,
                },
                {
                  id: 3,
                  kind: "code",
                  body: "The code-based question is being asked here",
                  choices: nil,
                  submitted_choice: nil,
                  submitted_text: nil,
                  submitted_code: "user answered code question here",
                  points_possible: 20,
                  points_awarded: 0,
                }
              ]
            )
          end
        
          unit.assignments.each do |assignment|
            awarded = Faker::Number.between(0, 100)
            AssignmentSubmission.create(
              assignment_id: assignment.id,
              enrollment_id: e.id,
              points_possible: 100,
              points_awarded: awarded,
              grade: awarded,
              graded: true,
              url: Faker::Internet.url,
              body: Faker::TvShows::TwinPeaks.quote,
              feedback: 'Good Job!'
            )
          end
        end
      end
      

      1.times do 
        Attendance.create(
          enrollment_id: e.id,
          attendance_record: 'present',
          record_date: '2019-04-11'
        )
      end
      1.times do 
        Attendance.create(
          enrollment_id: e.id,
          attendance_record: 'absent',
          record_date: '2019-04-12'
        )
      end
      1.times do 
        Attendance.create(
          enrollment_id: e.id,
          attendance_record: 'late',
          record_date: '2019-04-13'
        )
      end
    end
  end
end
Timer.log_and_reset


puts "\n4) CREATING STUDENT@TEST.COM"
1.times do
  user = User.create(
    first_name: "Student",
    last_name: "Stu",
    email: 'student@test.com',
    biography: Faker::TvShows::MichaelScott.quote,
    birth_date: Faker::Date.birthday(18, 65),
    password: 'password',
    admin: false
  )
  1.times do
    e = Enrollment.create(
      user_id: user.id,
      course_id: Course.first.id,
      role: 'student'
    )
    1.times do 
      Attendance.create(
        enrollment_id: e.id,
        attendance_record: 'present',
        record_date: '2019-04-11'
      )
    end
    1.times do 
      Attendance.create(
        enrollment_id: e.id,
        attendance_record: 'present',
        record_date: '2019-04-12'
      )
    end
    1.times do 
      Attendance.create(
        enrollment_id: e.id,
        attendance_record: 'present',
        record_date: '2019-04-13'
      )
    end
  end
end
Timer.log_and_reset



puts "\n5) CREATING TEST@TEST.COM"
1.times do
  user = User.create(
    first_name: "Admin",
    last_name: "Al",
    biography: Faker::TvShows::MichaelScott.quote,
    birth_date: Faker::Date.birthday(18, 65),
    email: 'test@test.com',
    password: 'password',
    admin: true
  )
end
Timer.log_and_reset


puts "\n6) CREATING UNENROLLED STUDENTS"
30.times do
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    biography: Faker::TvShows::MichaelScott.quote,
    birth_date: Faker::Date.birthday(18, 65),
    password: 'password',
    admin: false
  )
end
Timer.log_and_reset
Timer.stop


puts "\n- -------------------- ----- ---- --- --- -- -- -- -- - - - -"
puts "- - - --------------  PLANTED THE SEEDS  -------------- - - -"
puts "- - - -- -- -- -- --- --- ---- ----- ---------------------- -"
