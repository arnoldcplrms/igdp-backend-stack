import { PrismaClient, DGroupMembershipRole, DGroupType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDGroupMemberships(groups: any[]) {
  for (const group of groups) {
    const dgroup = await prisma.dGroup.findUnique({
      where: { id: group.dgroupId },
    });

    if (!dgroup) continue;

    const leader = group.leaders[0];

    // =========================
    // SINGLES (DB SAFE)
    // =========================
    if (group.type === DGroupType.Singles) {
      const account = await prisma.account.findUnique({
        where: { id: leader.id },
      });

      if (!account) continue;

      await prisma.dGroupMembership.create({
        data: {
          dgroupId: dgroup.id,
          accountId: account.id, // ✅ DB ONLY
          role: DGroupMembershipRole.Leader,
        },
      });

      for (const m of group.members) {
        const acc = await prisma.account.findUnique({
          where: { id: m.id },
        });

        if (!acc) continue;

        await prisma.dGroupMembership.create({
          data: {
            dgroupId: dgroup.id,
            accountId: acc.id,
            role: DGroupMembershipRole.Member,
          },
        });
      }
    }

    // =========================
    // COUPLES (DB SAFE)
    // =========================
    if (group.type === DGroupType.Couples) {
      const couple = await prisma.couple.findUnique({
        where: { id: leader.id },
      });

      if (!couple) continue;

      await prisma.dGroupMembership.create({
        data: {
          dgroupId: dgroup.id,
          coupleId: couple.id,
          role: DGroupMembershipRole.Leader,
        },
      });

      for (const m of group.members) {
        const c = await prisma.couple.findUnique({
          where: { id: m.id },
        });

        if (!c) continue;

        await prisma.dGroupMembership.create({
          data: {
            dgroupId: dgroup.id,
            coupleId: c.id,
            role: DGroupMembershipRole.Member,
          },
        });
      }
    }
  }
}
