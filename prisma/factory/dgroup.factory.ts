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

    const used = new Set<number>();

    // 🧠 Step 1: Build units (couples or single)
    const units: any[] = [];

    for (const acc of churchAccounts) {
      if (used.has(acc.id)) continue;

      if (acc.spouseId) {
        const spouse = churchAccounts.find((a) => a.id === acc.spouseId);

        if (spouse && !used.has(spouse.id)) {
          units.push([acc, spouse]);
          used.add(acc.id);
          used.add(spouse.id);
          continue;
        }
      }

      // fallback: single
      units.push([acc]);
      used.add(acc.id);
    }

    // 🔀 shuffle units (not individuals!)
    const shuffledUnits = shuffles(units);

    // 📊 determine group count
    const groupCount = Math.max(3, Math.ceil(churchAccounts.length / 8));

    const groupedUnits = chunkArray(
      shuffledUnits,
      Math.ceil(shuffledUnits.length / groupCount),
    );

    // 🏗️ build groups
    for (const unitGroup of groupedUnits) {
      const flatMembers = unitGroup.flat();

      if (flatMembers.length === 0) continue;

      // 👑 leaders = first unit
      const leaderUnit = unitGroup[0];
      const leaders = [...leaderUnit];

      // 👥 remaining members
      const members = unitGroup.slice(1).flat();

      const name =
        leaders.length === 2
          ? `${getFullName(leaders[0])} & ${getFullName(leaders[1])} DGroup`
          : `${getFullName(leaders[0])} DGroup`;

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
