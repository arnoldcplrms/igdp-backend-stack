import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDGroups(groups: any[]) {
  const result = [];

  for (const g of groups) {
    const dgroup = await prisma.dGroup.create({
      data: {
        name: g.name,
        churchId: g.churchId, // ✅ direct DB value
        type: g.type,
      },
    });

    result.push({
      ...g,
      dgroupId: dgroup.id,
    });
  }

  return result;
}
