import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.eventSpeakers.deleteMany(),
    prisma.event.deleteMany(),
    prisma.series.deleteMany(),
    prisma.employment.deleteMany(),
    prisma.education.deleteMany(),
    prisma.account.deleteMany(),
    prisma.company.deleteMany(),
    prisma.school.deleteMany(),
    prisma.church.deleteMany(),
  ]);

  console.log('Creating Church...');
  const church = await Promise.all([
    prisma.church.create({
      data: {
        name: 'Tandang Sora',
        address: 'Crossroad Mall',
      },
    }),
    prisma.church.create({
      data: {
        name: 'Commonwealth',
        address: 'Ever Gotesco Mall',
      },
    }),
  ]);
  console.log(`Created ${church.length} churchs`);

  console.log('Creating Schools...');
  type SchoolSeed = {
    name: string;
    address: string;
    acronym?: string;
    enrolledStudentCount: number;
    alumniStudentCount: number;
  };

  function generateCounts(type: 'university' | 'college' | 'highschool') {
    if (type === 'university') {
      const enrolled = Math.floor(Math.random() * 50000) + 15000;
      return {
        enrolledStudentCount: enrolled,
        alumniStudentCount: enrolled * (Math.floor(Math.random() * 8) + 5),
      };
    }

    if (type === 'college') {
      const enrolled = Math.floor(Math.random() * 20000) + 3000;
      return {
        enrolledStudentCount: enrolled,
        alumniStudentCount: enrolled * (Math.floor(Math.random() * 6) + 3),
      };
    }

    const enrolled = Math.floor(Math.random() * 5000) + 500;
    return {
      enrolledStudentCount: enrolled,
      alumniStudentCount: enrolled * (Math.floor(Math.random() * 10) + 10),
    };
  }

  const baseSchools: Array<{
    name: string;
    address: string;
    type: 'university' | 'college' | 'highschool';
    acronym?: string;
  }> = [
    {
      name: 'University of the Philippines',
      address: 'Diliman, Quezon City',
      type: 'university',
      acronym: 'UP',
    },
    {
      name: 'Ateneo de Manila University',
      address: 'Quezon City',
      type: 'university',
      acronym: 'ADMU',
    },
    {
      name: 'De La Salle University',
      address: 'Manila',
      type: 'university',
      acronym: 'DLSU',
    },
    {
      name: 'University of Santo Tomas',
      address: 'Manila',
      type: 'university',
      acronym: 'UST',
    },
    {
      name: 'Polytechnic University of the Philippines',
      address: 'Manila',
      type: 'university',
      acronym: 'PUP',
    },

    {
      name: 'Far Eastern University',
      address: 'Manila',
      type: 'university',
      acronym: 'FEU',
    },
    {
      name: 'University of the East',
      address: 'Manila',
      type: 'university',
      acronym: 'UE',
    },
    {
      name: 'Mapúa University',
      address: 'Manila',
      type: 'university',
      acronym: 'MAPUA',
    },
    {
      name: 'Adamson University',
      address: 'Manila',
      type: 'university',
      acronym: 'AdU',
    },
    {
      name: 'National University',
      address: 'Manila',
      type: 'university',
      acronym: 'NU',
    },

    {
      name: 'De La Salle–College of Saint Benilde',
      address: 'Manila',
      type: 'college',
      acronym: 'DLS-CSB',
    },
    {
      name: 'San Beda University',
      address: 'Manila',
      type: 'college',
      acronym: 'SBU',
    },
    {
      name: 'Arellano University',
      address: 'Manila',
      type: 'college',
      acronym: 'AU',
    },
    {
      name: 'Centro Escolar University',
      address: 'Manila',
      type: 'college',
      acronym: 'CEU',
    },
    {
      name: 'Jose Rizal University',
      address: 'Mandaluyong',
      type: 'college',
      acronym: 'JRU',
    },

    {
      name: 'Asia Pacific College',
      address: 'Makati',
      type: 'college',
      acronym: 'APC',
    },
    {
      name: 'University of Makati',
      address: 'Makati',
      type: 'college',
      acronym: 'UMak',
    },
    {
      name: 'Pamantasan ng Lungsod ng Maynila',
      address: 'Manila',
      type: 'college',
      acronym: 'PLM',
    },
    {
      name: 'Taguig City University',
      address: 'Taguig',
      type: 'college',
      acronym: 'TCU',
    },
    {
      name: 'Rizal Technological University',
      address: 'Mandaluyong',
      type: 'college',
      acronym: 'RTU',
    },

    {
      name: 'University of San Carlos',
      address: 'Cebu City',
      type: 'university',
      acronym: 'USC',
    },
    {
      name: 'University of San Jose–Recoletos',
      address: 'Cebu City',
      type: 'university',
      acronym: 'USJ-R',
    },
    {
      name: 'Cebu Institute of Technology – University',
      address: 'Cebu City',
      type: 'university',
      acronym: 'CIT-U',
    },
    {
      name: 'Silliman University',
      address: 'Dumaguete City',
      type: 'university',
      acronym: 'SU',
    },
    {
      name: 'Central Philippine University',
      address: 'Iloilo City',
      type: 'university',
      acronym: 'CPU',
    },

    {
      name: 'West Visayas State University',
      address: 'Iloilo City',
      type: 'university',
      acronym: 'WVSU',
    },
    {
      name: 'University of St. La Salle',
      address: 'Bacolod City',
      type: 'university',
      acronym: 'USLS',
    },
    {
      name: 'Xavier University – Ateneo de Cagayan',
      address: 'Cagayan de Oro',
      type: 'university',
      acronym: 'XU',
    },
    {
      name: 'Ateneo de Davao University',
      address: 'Davao City',
      type: 'university',
      acronym: 'ADDU',
    },
    {
      name: 'University of Mindanao',
      address: 'Davao City',
      type: 'university',
      acronym: 'UM',
    },

    {
      name: 'Philippine Science High School',
      address: 'Quezon City',
      type: 'highschool',
      acronym: 'PSHS',
    },
    { name: 'Miriam College', address: 'Quezon City', type: 'college' }, // no official acronym commonly used
    {
      name: 'Holy Angel University',
      address: 'Pampanga',
      type: 'university',
      acronym: 'HAU',
    },
    {
      name: 'San Pedro College',
      address: 'Davao City',
      type: 'college',
      acronym: 'SPC',
    },
    {
      name: 'Benguet State University',
      address: 'La Trinidad, Benguet',
      type: 'university',
      acronym: 'BSU',
    },
    {
      name: 'Saint Louis University',
      address: 'Baguio City',
      type: 'university',
      acronym: 'SLU',
    },
    {
      name: 'University of Baguio',
      address: 'Baguio City',
      type: 'university',
      acronym: 'UB',
    },
  ];

  const schoolData: SchoolSeed[] = baseSchools.map((school) => {
    const counts = generateCounts(school.type);

    return {
      name: school.name,
      address: school.address,
      acronym: school.acronym,
      enrolledStudentCount: counts.enrolledStudentCount,
      alumniStudentCount: counts.alumniStudentCount,
    };
  });

  const schools = await prisma.$transaction(
    schoolData.map((school) =>
      prisma.school.upsert({
        where: { name: school.name },
        update: {},
        create: school,
      }),
    ),
  );
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
