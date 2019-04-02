Course.destroy_all
User.destroy_all

1.times do
  course = Course.create(
    title: Faker::Educator.course_name
  )
  binding.pry
  15.times do
    section = Section.create(
      title: Faker::ProgrammingLanguage.name,
      course_id: course.id
    )
    binding.pry
    5.times do
      unit = Unit.create(
        title: Faker::Hacker.noun,
        section_id: section.id
      )
      5.times do
        Content.create(
          title: Faker::Hacker.verb,
          content: Faker::Lorem.paragraph,
          unit_id: unit.id
        )
      end
    end
  end
end

19.times do
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: 'password',
    admin: false
  )
  1.times do
    Enrollment.create(
      user_id: user.id,
      course_id: Course.first.id,
      role: 'student'
    )
  end
end

1.times do
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
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

puts 'Planted the seeds'