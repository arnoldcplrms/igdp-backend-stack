import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.event.deleteMany();
  await prisma.series.deleteMany();
  await prisma.employment.deleteMany();
  await prisma.education.deleteMany();
  await prisma.account.deleteMany({});
  await prisma.company.deleteMany();
  await prisma.school.deleteMany();

  console.log('Creating Schools...');
  const schools = await Promise.all([
    prisma.school.create({
      data: {
        name: 'University of the Philippines',
        address: '1101 Diliman, Quezon City',
      },
    }),
    prisma.school.create({
      data: {
        name: 'Ateneo de Manila University',
        address: 'Katipunan Avenue, Quezon City',
      },
    }),
    prisma.school.create({
      data: {
        name: 'De La Salle University',
        address: 'Taft Avenue, Manila',
      },
    }),
    prisma.school.create({
      data: {
        name: 'Philippine Science High School',
        address: 'UP Campus, Diliman, Quezon City',
      },
    }),
    prisma.school.create({
      data: {
        name: 'Miriam College',
        address: 'Katipunan Avenue, Quezon City',
      },
    }),
  ]);
  console.log(`Created ${schools.length} schools`);

  console.log('Creating Companies...');
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'Google Philippines',
        address: 'Bonifacio Global City, Taguig',
      },
    }),
    prisma.company.create({
      data: {
        name: 'Microsoft Asia',
        address: 'Makati Avenue, Makati City',
      },
    }),
    prisma.company.create({
      data: {
        name: 'Facebook/Meta Philippines',
        address: 'Bonifacio Global City, Taguig',
      },
    }),
    prisma.company.create({
      data: {
        name: 'Amazon Philippines',
        address: 'Fort Bonifacio, Taguig',
      },
    }),
    prisma.company.create({
      data: {
        name: 'Oracle Philippines',
        address: 'The Enterprise Center, Makati City',
      },
    }),
  ]);
  console.log(`Created ${companies.length} companies`);

  console.log('Creating Accounts...');
  const accounts = await Promise.all([
    prisma.account.create({
      data: {
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Doe',
        nickname: 'JD',
        facebookLink: 'https://facebook.com/johndoe',
        contactNumber: '+639171234567',
        email: 'john.doe@example.com',
        gender: 'Male',
        birthDate: new Date('1990-01-15'),
        userType: 'Admin',
        emergencyContactName: 'Jane Doe',
        emergencyContactNumber: '+639171234568',
      },
    }),
    prisma.account.create({
      data: {
        firstName: 'Maria',
        middleName: 'Clara',
        lastName: 'Santos',
        nickname: 'MC',
        facebookLink: 'https://facebook.com/mariasantos',
        contactNumber: '+639172345678',
        email: 'maria.santos@example.com',
        gender: 'Female',
        birthDate: new Date('1992-05-22'),
        userType: 'MinistryHead',
        emergencyContactName: 'Juan Santos',
        emergencyContactNumber: '+639172345679',
      },
    }),
    prisma.account.create({
      data: {
        firstName: 'Carlos',
        lastName: 'Reyes',
        nickname: 'CRey',
        facebookLink: 'https://facebook.com/carlosreyes',
        contactNumber: '+639173456789',
        email: 'carlos.reyes@example.com',
        gender: 'Male',
        birthDate: new Date('1988-03-10'),
        userType: 'DGM',
        emergencyContactName: 'Rosa Reyes',
        emergencyContactNumber: '+639173456790',
      },
    }),
    prisma.account.create({
      data: {
        firstName: 'Ana',
        middleName: 'Luz',
        lastName: 'Garcia',
        nickname: 'Ana',
        facebookLink: 'https://facebook.com/anagarcia',
        contactNumber: '+639174567890',
        email: 'ana.garcia@example.com',
        gender: 'Female',
        birthDate: new Date('1995-07-18'),
        userType: 'Member',
        emergencyContactName: 'Pedro Garcia',
        emergencyContactNumber: '+639174567891',
      },
    }),
    prisma.account.create({
      data: {
        firstName: 'Manuel',
        lastName: 'Fernandez',
        facebookLink: 'https://facebook.com/manuelfernandez',
        contactNumber: '+639175678901',
        email: 'manuel.fernandez@example.com',
        gender: 'Male',
        birthDate: new Date('1991-11-25'),
        userType: 'Member',
        emergencyContactName: 'Sofia Fernandez',
        emergencyContactNumber: '+639175678902',
      },
    }),
    prisma.account.create({
      data: {
        firstName: 'Patricia',
        middleName: 'Anne',
        lastName: 'Molina',
        facebookLink: 'https://facebook.com/patriciamolina',
        contactNumber: '+639176789012',
        email: 'patricia.molina@example.com',
        gender: 'Female',
        birthDate: new Date('1994-09-30'),
        userType: 'Member',
      },
    }),
  ]);
  console.log(`Created ${accounts.length} accounts`);

  // Link dGroupLeader for some accounts
  await prisma.account.update({
    where: { id: accounts[3].id },
    data: { dGroupLeaderId: accounts[0].id },
  });

  await prisma.account.update({
    where: { id: accounts[4].id },
    data: { dGroupLeaderId: accounts[1].id },
  });

  console.log('Creating Education records...');
  const educations = await Promise.all([
    prisma.education.create({
      data: {
        schoolId: schools[0].id,
        accountId: accounts[0].id,
        educationLevel: 'College',
        course: 'Bachelor of Science in Computer Science',
        startDate: new Date('2008-06-01'),
        endDate: new Date('2012-05-31'),
      },
    }),
    prisma.education.create({
      data: {
        schoolId: schools[1].id,
        accountId: accounts[1].id,
        educationLevel: 'College',
        course: 'Bachelor of Science in Business Administration',
        startDate: new Date('2010-08-01'),
        endDate: new Date('2014-05-31'),
      },
    }),
    prisma.education.create({
      data: {
        schoolId: schools[2].id,
        accountId: accounts[2].id,
        educationLevel: 'College',
        course: 'Bachelor of Science in Engineering',
        startDate: new Date('2006-06-01'),
        endDate: new Date('2010-05-31'),
      },
    }),
    prisma.education.create({
      data: {
        schoolId: schools[3].id,
        accountId: accounts[3].id,
        educationLevel: 'JuniorHigh',
        course: null,
        startDate: new Date('2012-06-01'),
        endDate: new Date('2014-03-31'),
      },
    }),
    prisma.education.create({
      data: {
        schoolId: schools[4].id,
        accountId: accounts[4].id,
        educationLevel: 'College',
        course: 'Bachelor of Arts in English',
        startDate: new Date('2022-08-01'),
        endDate: null,
      },
    }),
  ]);
  console.log(`Created ${educations.length} education records`);

  console.log('Creating Employment records...');
  const employments = await Promise.all([
    prisma.employment.create({
      data: {
        companyId: companies[0].id,
        accountId: accounts[0].id,
        position: 'Senior Software Engineer',
        startDate: new Date('2018-03-01'),
        endDate: null,
      },
    }),
    prisma.employment.create({
      data: {
        companyId: companies[1].id,
        accountId: accounts[1].id,
        position: 'Product Manager',
        startDate: new Date('2016-07-01'),
        endDate: null,
      },
    }),
    prisma.employment.create({
      data: {
        companyId: companies[2].id,
        accountId: accounts[2].id,
        position: 'Business Development Manager',
        startDate: new Date('2019-01-15'),
        endDate: null,
      },
    }),
    prisma.employment.create({
      data: {
        companyId: companies[3].id,
        accountId: accounts[3].id,
        position: 'Junior Developer',
        startDate: new Date('2021-06-01'),
        endDate: null,
      },
    }),
    prisma.employment.create({
      data: {
        companyId: companies[4].id,
        accountId: accounts[4].id,
        position: 'Quality Assurance Engineer',
        startDate: new Date('2020-09-01'),
        endDate: new Date('2023-08-31'),
      },
    }),
  ]);
  console.log(`Created ${employments.length} employment records`);

  console.log('Creating Series...');
  const series = await Promise.all([
    prisma.series.create({
      data: {
        name: 'Navigating Faith in Your 20s & 30s',
      },
    }),
    prisma.series.create({
      data: {
        name: "Love, Relationships & God's Design for Singles",
      },
    }),
    prisma.series.create({
      data: {
        name: 'Building a Godly Character',
      },
    }),
    prisma.series.create({
      data: {
        name: 'Becoming a Leader in Your Church Community',
      },
    }),
    prisma.series.create({
      data: {
        name: 'The Fruit of the Spirit: Growing in Faith',
      },
    }),
  ]);
  console.log(`Created ${series.length} series`);

  console.log('Creating Speakers...');
  const speakers = await Promise.all([
    prisma.speaker.create({
      data: {
        name: `${accounts[0].firstName} ${accounts[0].lastName}`,
        accountId: accounts[0].id,
        updatedBy: accounts[0].id,
      },
    }),
    prisma.speaker.create({
      data: {
        name: `${accounts[1].firstName} ${accounts[1].lastName}`,
        accountId: accounts[1].id,
        updatedBy: accounts[1].id,
      },
    }),
    prisma.speaker.create({
      data: {
        name: `${accounts[2].firstName} ${accounts[2].lastName}`,
        accountId: accounts[2].id,
        updatedBy: accounts[2].id,
      },
    }),
    prisma.speaker.create({
      data: {
        name: `${accounts[3].firstName} ${accounts[3].lastName}`,
        accountId: accounts[3].id,
        updatedBy: accounts[3].id,
      },
    }),
    prisma.speaker.create({
      data: {
        name: `${accounts[4].firstName} ${accounts[4].lastName}`,
        accountId: accounts[4].id,
        updatedBy: accounts[4].id,
      },
    }),
  ]);
  console.log(`Created ${speakers.length} speakers`);

  console.log('Creating Events...');
  const events = await Promise.all([
    prisma.event.create({
      data: {
        eventName: 'Guarding Your Heart: Dating with Purpose',
        eventDate: new Date('2024-02-15'),
        location: 'UP Diliman Chapel, Quezon City',
        seriesId: series[1].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: 'Finding Your Identity in Christ as a Young Adult',
        eventDate: new Date('2024-03-10'),
        location: 'Ateneo De Manila University, Katipunan',
        seriesId: series[0].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: 'Love Languages and Biblical Relationships',
        eventDate: new Date('2024-04-05'),
        location: 'DLSU Auditorium, Manila',
        seriesId: series[1].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: 'Living Out Your Faith in the Workplace',
        eventDate: new Date('2024-05-20'),
        location: 'BGC Prayer Center, Taguig',
        seriesId: series[2].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: 'Youth Leaders Summit: Serving Your Peers',
        eventDate: new Date('2024-06-01'),
        location: 'Makati City Sports Complex, Makati',
        seriesId: series[3].id,
      },
    }),
  ]);
  console.log(`Created ${events.length} events`);

  console.log('Creating EventSpeakers...');
  const eventSpeakers = await Promise.all([
    prisma.eventSpeakers.create({
      data: {
        speakerId: speakers[0].id,
        eventId: events[0].id,
      },
    }),
    prisma.eventSpeakers.create({
      data: {
        speakerId: speakers[1].id,
        eventId: events[1].id,
      },
    }),
    prisma.eventSpeakers.create({
      data: {
        speakerId: speakers[2].id,
        eventId: events[2].id,
      },
    }),
    prisma.eventSpeakers.create({
      data: {
        speakerId: speakers[3].id,
        eventId: events[3].id,
      },
    }),
    prisma.eventSpeakers.create({
      data: {
        speakerId: speakers[4].id,
        eventId: events[4].id,
      },
    }),
  ]);
  console.log(`Created ${eventSpeakers.length} event-speaker relations`);

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
