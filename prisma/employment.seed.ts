import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const positions = [
  'Software Engineer',
  'Backend Developer',
  'Frontend Developer',
  'Project Manager',
  'HR Specialist',
  'Accountant',
  'Marketing Officer',
];

function randomItem<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(startYear = 2005, endYear = 2025) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}

function maybeNullDate(date: Date) {
  return Math.random() < 0.4 ? null : date; // ~40% active
}

export async function seedEmployment() {
  const companies = await prisma.company.findMany({
    select: { id: true },
  });

  const accounts = await prisma.account.findMany({
    select: { id: true },
  });

  const data: any[] = [];

  for (const account of accounts) {
    // 0 to 4 employments
    const employmentCount = Math.floor(Math.random() * 5);

    let lastEndDate: Date | null = null;

    for (let i = 0; i < employmentCount; i++) {
      const company = randomItem(companies);

      const startDate = lastEndDate
        ? randomDate(lastEndDate.getFullYear(), lastEndDate.getFullYear() + 1)
        : randomDate(2005, 2020);

      const endDate =
        i === employmentCount - 1
          ? maybeNullDate(
              randomDate(startDate.getFullYear(), startDate.getFullYear() + 5),
            )
          : randomDate(startDate.getFullYear(), startDate.getFullYear() + 3);

      data.push({
        companyId: company.id,
        accountId: account.id,
        position: randomItem(positions),
        startDate,
        endDate,
      });

      lastEndDate = endDate ?? null;
    }
  }

  return await prisma.employment.createMany({
    data,
  });
}
