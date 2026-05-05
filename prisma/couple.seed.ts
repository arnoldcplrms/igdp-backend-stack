import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COUPLE_LIMIT = 5; // 🔥 YOU CONTROL THIS

export async function seedCouples() {
  const accounts = await prisma.account.findMany();

  const couples: any[] = [];

  const used = new Set<number>();

  for (const acc of accounts) {
    if (couples.length >= COUPLE_LIMIT) break;
    if (used.has(acc.id)) continue;

    const spouse = accounts.find((a) => a.id !== acc.id && !used.has(a.id));

    if (!spouse) continue;

    const couple = await prisma.couple.create({
      data: {
        husbandId: acc.id,
        wifeId: spouse.id,
      },
    });

    used.add(acc.id);
    used.add(spouse.id);

    couples.push(couple);
  }

  return couples;
}
