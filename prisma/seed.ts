import { EducationLevel, PrismaClient } from '@prisma/client';
import { companyData } from './company.seed';
import { seedEmployment } from './education.seed';

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
    return {
      name: school.name,
      address: school.address,
      acronym: school.acronym,
      enrolledStudentCount: 0,
      alumniStudentCount: 0,
    };
  });

  const schools = await prisma.$transaction(
    schoolData.map((school) =>
      prisma.school.upsert({
        where: {
          name_address: {
            name: school.name,
            address: school.address,
          },
        },
        update: {},
        create: school,
      }),
    ),
  );
  console.log(`Created ${schools.length} schools`);

  console.log('Creating Companies...');
  const companies = await prisma.$transaction(
    companyData.map((company) =>
      prisma.company.upsert({
        where: {
          name_address: {
            name: company.name,
            address: company.address,
          },
        },
        update: {},
        create: company,
      }),
    ),
  );

  console.log(`Created ${companies.length} companies`);

  console.log('Creating Accounts...');
  const firstNames = [
    'John',
    'Maria',
    'Carlos',
    'Ana',
    'Manuel',
    'Patricia',
    'Luis',
    'Mark',
    'Angela',
    'Joseph',
    'Miguel',
    'Rosa',
    'Daniel',
    'Sophia',
    'James',
    'Paolo',
    'Grace',
    'Andrea',
  ];

  const lastNames = [
    'Doe',
    'Santos',
    'Reyes',
    'Garcia',
    'Fernandez',
    'Molina',
    'Cruz',
    'Ramos',
    'Torres',
    'Villanueva',
  ];

  function randomPhone(index: number) {
    return `+63917${String(1000000 + index).slice(1)}`;
  }

  async function seedAccounts() {
    const accounts = await Promise.all(
      Array.from({ length: 200 }).map((_, i) => {
        const firstName = randomItem(firstNames);
        const lastName = randomItem(lastNames);
        const gender = Math.random() > 0.5 ? 'Male' : 'Female';

        const hasMiddleName = Math.random() > 0.3;
        const middleName = hasMiddleName ? randomItem(firstNames) : null;

        const fullName = `${firstName}.${lastName}.${i}`; // ensure unique email

        return prisma.account.create({
          data: {
            firstName,
            middleName,
            lastName,
            nickname: firstName.slice(0, 2),
            facebookLink: `https://facebook.com/${fullName.toLowerCase()}`,
            contactNumber: randomPhone(i),
            email: `${fullName.toLowerCase()}@example.com`,
            gender,
            birthDate: randomDate(),
            userType: 'Member',
            emergencyContactName: `${randomItem(firstNames)} ${lastName}`,
            emergencyContactNumber: randomPhone(i + 100),
          },
        });
      }),
    );

    return accounts;
  }

  const accounts = await seedAccounts();
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
  const educationLevels = [
    EducationLevel.JuniorHigh,
    EducationLevel.SeniorHigh,
    EducationLevel.College,
    EducationLevel.Masteral,
    EducationLevel.Doctoral,
  ];

  function randomItem<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomDate(startYear = 2000, endYear = 2025) {
    const start = new Date(startYear, 0, 1).getTime();
    const end = new Date(endYear, 11, 31).getTime();
    return new Date(start + Math.random() * (end - start));
  }

  function maybeNullDate(date: Date) {
    return Math.random() < 0.3 ? null : date;
  }

  function generateCourse(level: EducationLevel) {
    if (level === EducationLevel.JuniorHigh) return null;

    const courses = [
      'Bachelor of Science in Computer Science',
      'Bachelor of Science in Business Administration',
      'Bachelor of Science in Engineering',
      'Bachelor of Arts in English',
      'Bachelor of Science in Information Technology',
      'Master in Business Administration',
      'Doctor of Philosophy in Education',
    ];

    return randomItem(courses);
  }

  const TARGET_PER_SCHOOL = 50;

  const educations = [];

  for (const school of schools) {
    for (let i = 0; i < TARGET_PER_SCHOOL; i++) {
      const level = randomItem(educationLevels);

      const startDate = randomDate(2000, 2022);
      const endDate = randomDate(
        startDate.getFullYear(),
        startDate.getFullYear() + 6,
      );

      educations.push(
        prisma.education.create({
          data: {
            schoolId: school.id,
            accountId: randomItem(accounts).id,
            educationLevel: level,
            course: generateCourse(level),
            startDate,
            endDate: maybeNullDate(endDate),
          },
        }),
      );
    }
  }

  const latestEducations = await Promise.all(educations);
  async function syncSchoolStudentCounts() {
    const educations = await prisma.education.findMany({
      select: {
        schoolId: true,
        endDate: true,
      },
    });

    const map = new Map<number, { enrolled: number; alumni: number }>();

    for (const edu of educations) {
      if (!map.has(edu.schoolId)) {
        map.set(edu.schoolId, { enrolled: 0, alumni: 0 });
      }

      const record = map.get(edu.schoolId)!;

      if (edu.endDate === null) {
        record.enrolled++;
      } else {
        record.alumni++;
      }
    }

    await Promise.all(
      Array.from(map.entries()).map(([schoolId, counts]) =>
        prisma.school.update({
          where: { id: schoolId },
          data: {
            enrolledStudentCount: counts.enrolled,
            alumniStudentCount: counts.alumni,
          },
        }),
      ),
    );
  }
  await syncSchoolStudentCounts();
  console.log(`Created ${latestEducations.length} education records`);

  console.log('Creating Employment records...');
  const employments = await seedEmployment();
  console.log(`Created ${employments.count} employment records`);

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
