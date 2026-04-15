import { PrismaClient, DGroupMembershipRole } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDGroupMemberships(groups: any[]) {
  for (const group of groups) {
    const dgroup = await prisma.dGroup.create({
      data: {
        name: group.name,
        churchId: group.churchId,
      },
    });

    // leaders
    for (const leader of group.leaders) {
      await prisma.dGroupMembership.create({
        data: {
          dGroupId: dgroup.id,
          accountId: leader.id,
          role: DGroupMembershipRole.Leader,
        },
      });
    }

    // members
    for (const member of group.members) {
      await prisma.dGroupMembership.create({
        data: {
          dGroupId: dgroup.id,
          accountId: member.id,
          role: DGroupMembershipRole.Member,
        },
      });
    }
  }
}
