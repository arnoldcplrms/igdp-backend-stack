import { PrismaClient } from '@prisma/client';
import { generateAccount } from './factory/account.factory';
import { shuffle } from './data/helpers.seed';

const prisma = new PrismaClient();

function randomDate(): Date {
  const start = new Date(1970, 0, 1).getTime();
  const end = new Date(2005, 0, 1).getTime();
  return new Date(start + Math.random() * (end - start));
}

export async function seedAccounts() {
  // ✅ 1. Fetch existing churches
  const churches = await prisma.church.findMany({
    select: { id: true },
  });

  if (!churches.length) {
    throw new Error('❌ No churches found. Seed churches first.');
  }

  const getRandomChurchId = () =>
    churches[Math.floor(Math.random() * churches.length)].id;

  // 2. Generate raw accounts
  const rawAccounts = Array.from({ length: 200 }, (_, i) => ({
    index: i,
    data: generateAccount({
      index: i,
      churchId: getRandomChurchId(), // ✅ ensure valid churchId
      randomDate,
    }),
  }));

  const males = rawAccounts.filter((a) => a.data.gender === 'Male');
  const females = rawAccounts.filter((a) => a.data.gender === 'Female');

  const shuffledMales = shuffle(males);
  const shuffledFemales = shuffle(females);

  const coupleSize = Math.floor(
    Math.min(shuffledMales.length, shuffledFemales.length) * 0.3,
  );

  const spousePairs: Array<{ male: any; female: any }> = [];

  for (let i = 0; i < coupleSize; i++) {
    spousePairs.push({
      male: shuffledMales[i],
      female: shuffledFemales[i],
    });
  }

  // 3. Create accounts
  const created = await Promise.all(
    rawAccounts.map((a) =>
      prisma.account.create({
        data: a.data,
      }),
    ),
  );

  return created;
}
