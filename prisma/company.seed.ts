import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CompanySeedData = {
  name: string;
  address: string;
  acronym?: string;
  employedCount: number;
  formerEmployeeCount: number;
};

const RECORD_COUNT = 50;

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maybeAcronym(name: string): string | undefined {
  const hasAcronym = Math.random() > 0.45; // ~55% have acronym

  if (!hasAcronym) return undefined;

  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

const baseCompanies = [
  'SM Investments Corporation',
  'Ayala Corporation',
  'San Miguel Corporation',
  'Jollibee Foods Corporation',
  'BDO Unibank',
  'Metrobank Group',
  'PLDT Inc.',
  'Globe Telecom',
  'Aboitiz Equity Ventures',
  'Philippine National Bank',
  'Security Bank Corporation',
  'Union Bank of the Philippines',
  'Petron Corporation',
  'Manila Electric Company',
  'LT Group Inc.',
  'Robinsons Land Corporation',
  'Megaworld Corporation',
  'DMCI Holdings',
  'Metro Pacific Investments',
  'Puregold Price Club',
  'Wilcon Depot',
  'Converge ICT Solutions',
  'Concepcion Industrial Corporation',
  'First Gen Corporation',
  'Energy Development Corporation',
  'ABS-CBN Corporation',
  'GMA Network Inc.',
  'Vista Land & Lifescapes',
  'Ayala Land Inc.',
  'DoubleDragon Corporation',
  'Shakey’s Pizza Asia Ventures',
  'Chowking Group',
  'Max’s Group Inc.',
  'Golden ABC (Penshoppe)',
  'SSI Group Inc.',
  'Ever Bilena Cosmetics',
  'Phoenix Petroleum',
  '8990 Holdings',
  'Filinvest Development Corporation',
  'Robina Corporation',
  'Unilever Philippines',
  'Nestle Philippines',
  'Procter & Gamble Philippines',
  'IBM Philippines',
  'Accenture Philippines',
  'Samsung Philippines',
  'Huawei Philippines',
  'Microsoft Philippines',
  'Google Philippines',
  'Amazon Web Services PH',
];

const addresses = [
  'Makati City',
  'Taguig City',
  'Pasig City',
  'Quezon City',
  'Manila',
  'Cebu City',
  'Davao City',
];

export const companyData: CompanySeedData[] = baseCompanies
  .slice(0, RECORD_COUNT)
  .map((name, index) => {
    const address = addresses[index % addresses.length];

    return {
      name,
      address,
      acronym: maybeAcronym(name),
      employedCount: rand(200, 80000),
      formerEmployeeCount: rand(100, 120000),
    };
  });

export async function syncCompanyEmployeeCounts() {
  const employments = await prisma.employment.findMany({
    select: {
      companyId: true,
      endDate: true,
    },
  });

  const map = new Map<number, { active: number; former: number }>();

  for (const emp of employments) {
    if (!map.has(emp.companyId)) {
      map.set(emp.companyId, { active: 0, former: 0 });
    }

    const record = map.get(emp.companyId)!;

    if (emp.endDate === null) {
      record.active++;
    } else {
      record.former++;
    }
  }

  await Promise.all(
    Array.from(map.entries()).map(([companyId, counts]) =>
      prisma.company.update({
        where: { id: companyId },
        data: {
          employedCount: counts.active,
          formerEmployeeCount: counts.former,
        },
      }),
    ),
  );

  console.log('✅ Company employee counts synced');
}
