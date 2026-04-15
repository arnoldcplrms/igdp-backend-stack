import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const baseSchools = [
  {
    name: 'University of the Philippines',
    address: 'Diliman, Quezon City',
    acronym: 'UP',
  },
  {
    name: 'Ateneo de Manila University',
    address: 'Quezon City',
    acronym: 'ADMU',
  },
  {
    name: 'De La Salle University',
    address: 'Manila',
    acronym: 'DLSU',
  },
  {
    name: 'University of Santo Tomas',
    address: 'Manila',
    acronym: 'UST',
  },
  {
    name: 'Polytechnic University of the Philippines',
    address: 'Manila',
    acronym: 'PUP',
  },
  {
    name: 'Far Eastern University',
    address: 'Manila',
    acronym: 'FEU',
  },
  {
    name: 'University of the East',
    address: 'Manila',
    acronym: 'UE',
  },
  {
    name: 'Mapúa University',
    address: 'Manila',
    acronym: 'MAPUA',
  },
  {
    name: 'Adamson University',
    address: 'Manila',
    acronym: 'AdU',
  },
  {
    name: 'National University',
    address: 'Manila',
    acronym: 'NU',
  },
  {
    name: 'De La Salle–College of Saint Benilde',
    address: 'Manila',
    acronym: 'DLS-CSB',
  },
  {
    name: 'San Beda University',
    address: 'Manila',
    acronym: 'SBU',
  },
  {
    name: 'Arellano University',
    address: 'Manila',
    acronym: 'AU',
  },
  {
    name: 'Centro Escolar University',
    address: 'Manila',
    acronym: 'CEU',
  },
  {
    name: 'Jose Rizal University',
    address: 'Mandaluyong',
    acronym: 'JRU',
  },
  {
    name: 'Asia Pacific College',
    address: 'Makati',
    acronym: 'APC',
  },
  {
    name: 'University of Makati',
    address: 'Makati',
    acronym: 'UMak',
  },
  {
    name: 'Pamantasan ng Lungsod ng Maynila',
    address: 'Manila',
    acronym: 'PLM',
  },
  {
    name: 'Taguig City University',
    address: 'Taguig',
    acronym: 'TCU',
  },
  {
    name: 'Rizal Technological University',
    address: 'Mandaluyong',
    acronym: 'RTU',
  },
  {
    name: 'University of San Carlos',
    address: 'Cebu City',
    acronym: 'USC',
  },
  {
    name: 'University of San Jose–Recoletos',
    address: 'Cebu City',
    acronym: 'USJ-R',
  },
  {
    name: 'Cebu Institute of Technology – University',
    address: 'Cebu City',
    acronym: 'CIT-U',
  },
  {
    name: 'Silliman University',
    address: 'Dumaguete City',
    acronym: 'SU',
  },
  {
    name: 'Central Philippine University',
    address: 'Iloilo City',
    acronym: 'CPU',
  },
  {
    name: 'West Visayas State University',
    address: 'Iloilo City',
    acronym: 'WVSU',
  },
  {
    name: 'University of St. La Salle',
    address: 'Bacolod City',
    acronym: 'USLS',
  },
  {
    name: 'Xavier University – Ateneo de Cagayan',
    address: 'Cagayan de Oro',
    acronym: 'XU',
  },
  {
    name: 'Ateneo de Davao University',
    address: 'Davao City',
    acronym: 'ADDU',
  },
  {
    name: 'University of Mindanao',
    address: 'Davao City',
    acronym: 'UM',
  },
  {
    name: 'Philippine Science High School',
    address: 'Quezon City',
    acronym: 'PSHS',
  },
  {
    name: 'Miriam College',
    address: 'Quezon City',
  },
  {
    name: 'Holy Angel University',
    address: 'Pampanga',
    acronym: 'HAU',
  },
  {
    name: 'San Pedro College',
    address: 'Davao City',
    acronym: 'SPC',
  },
  {
    name: 'Benguet State University',
    address: 'La Trinidad, Benguet',
    acronym: 'BSU',
  },
  {
    name: 'Saint Louis University',
    address: 'Baguio City',
    acronym: 'SLU',
  },
  {
    name: 'University of Baguio',
    address: 'Baguio City',
    acronym: 'UB',
  },
];

export async function seedSchools() {
  const data = baseSchools.map((school) => ({
    name: school.name,
    address: school.address,
    acronym: school.acronym ?? null,
    enrolledStudentCount: 0,
    alumniStudentCount: 0,
  }));

  const result = await prisma.school.createMany({
    data,
    skipDuplicates: true, // ⚡ safe for re-seeding
  });

  console.log(`✅ Schools seeded: ${result.count}`);

  return result;
}

export async function syncSchoolStudentCounts() {
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

  console.log('✅ School counts synced');
}
