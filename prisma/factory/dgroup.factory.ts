import { PrismaClient } from '@prisma/client';
import { chunkArray, getFullName, shuffles } from 'prisma/data/helpers.seed';

const prisma = new PrismaClient();

export async function buildDGroups() {
  const churches = await prisma.church.findMany();
  const accounts = await prisma.account.findMany();

  const result: any[] = [];

  for (const church of churches) {
    const churchAccounts = accounts.filter((a) => a.churchId === church.id);

    if (churchAccounts.length < 2) continue;

    const shuffled = shuffles(churchAccounts);

    const groupCount = Math.max(3, Math.ceil(shuffled.length / 8));
    const groups = chunkArray(
      shuffled,
      Math.ceil(shuffled.length / groupCount),
    );

    for (const members of groups) {
      const leader1 = members.shift();
      if (!leader1) continue;

      const leaders: any[] = [leader1];

      const spouseIndex = members.findIndex((m) => m.id === leader1.spouseId);

      if (spouseIndex !== -1) {
        const spouse = members.splice(spouseIndex, 1)[0];
        leaders.push(spouse);
      }

      const name =
        leaders.length === 1
          ? `${getFullName(leaders[0])} DGroup`
          : `${getFullName(leaders[0])} & ${getFullName(leaders[1])} DGroup`;

      result.push({
        churchId: church.id,
        name,
        leaders,
        members,
      });
    }
  }

  return result;
}
