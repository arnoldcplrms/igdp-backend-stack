import { PrismaClient, EducationLevel } from '@prisma/client';

const prisma = new PrismaClient();

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

export async function seedSchoolEducation() {
  const schools = await prisma.school.findMany({
    select: { id: true },
  });

  const accounts = await prisma.account.findMany({
    select: { id: true },
  });

  const data: any[] = [];

  for (const account of accounts) {
    // 0–4 educations
    const educationCount = Math.floor(Math.random() * 5);

    let lastEndDate: Date | null = null;

    for (let i = 0; i < educationCount; i++) {
      const school = randomItem(schools);
      const level = randomItem(educationLevels);

      const startDate = lastEndDate
        ? randomDate(lastEndDate.getFullYear(), lastEndDate.getFullYear() + 1)
        : randomDate(2000, 2018);

      const endDate =
        i === educationCount - 1
          ? maybeNullDate(
              randomDate(startDate.getFullYear(), startDate.getFullYear() + 6),
            )
          : randomDate(startDate.getFullYear(), startDate.getFullYear() + 4);

      data.push({
        schoolId: school.id,
        accountId: account.id,
        educationLevel: level,
        course: generateCourse(level),
        startDate,
        endDate,
      });

      lastEndDate = endDate ?? null;
    }
  }

  const result = await prisma.education.createMany({
    data,
  });

  console.log('✅ Education seeded:', result.count);

  return result;
}
