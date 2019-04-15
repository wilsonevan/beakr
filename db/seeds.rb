Course.destroy_all
User.destroy_all
Content.destroy_all

1.times do
  course = Course.create(
    title: Faker::Educator.course_name
  )
  15.times do
    section = Section.create(
      title: Faker::ProgrammingLanguage.name,
      course_id: course.id
    )
    5.times do
      unit = Unit.create(
        title: Faker::Hacker.noun,
        section_id: section.id
      )
      5.times do
        content = Content.create(
          title: Faker::Hacker.verb,
          body: Faker::Lorem.paragraph,
        )

        UnitContent.create(
          unit_id: unit.id,
          content_id: content.id,
        )
      end
      1.times do
        assignment = Assignment.create(
          title: Faker::Science.element,
          body: Faker::Movies::Ghostbusters.quote,
          due_date: Faker::Date.forward(60),
          kind: "github",
        )

        UnitAssignment.create(
          unit_id: unit.id,
          assignment_id: assignment.id
        )
      end
      1.times do
        quiz = Quiz.create(
          title: Faker::Currency.name,
          due_date: Faker::Date.forward(60),
        )

        UnitQuiz.create(
          unit_id: unit.id,
          quiz_id: quiz.id
        )
      end
    end
  end
end

18.times do
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

1.times do
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
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

1.times do
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    biography: Faker::TvShows::MichaelScott.quote,
    birth_date: Faker::Date.birthday(18, 65),
    email: 'test@test.com',
    password: 'password',
    admin: true
  )
  1.times do
    Enrollment.create(
      user_id: user.id,
      course_id: Course.first.id,
      role: 'staff'
    )
  end
end

19.times do
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


puts 'Planted the seeds'