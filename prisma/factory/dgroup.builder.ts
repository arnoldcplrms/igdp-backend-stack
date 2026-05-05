import { PrismaClient, DGroupType } from '@prisma/client';
import { shuffles } from 'prisma/data/helpers.seed';

const prisma = new PrismaClient();

export async function buildDGroups() {
  const churches = await prisma.church.findMany();
  const accounts = await prisma.account.findMany();
  const couples = await prisma.couple.findMany();

  const result: any[] = [];

  for (const church of churches) {
    const churchAccounts = accounts.filter((a) => a.churchId === church.id);

    // =========================
    // STEP 1: GET COUPLES (NO FILTERING OUT)
    // =========================
    const churchCouples = couples.filter(
      (c) =>
        churchAccounts.some((a) => a.id === c.husbandId) &&
        churchAccounts.some((a) => a.id === c.wifeId),
    );

    // =========================
    // STEP 2: BUILD COUPLES DGROUPS
    // =========================
    const shuffledCouples = shuffles(churchCouples);

    const coupleGroups: any[][] = [];
    const coupleGroupCount = Math.max(1, Math.ceil(shuffledCouples.length / 5));

    for (let i = 0; i < coupleGroupCount; i++) {
      coupleGroups.push([]);
    }

    let cIndex = 0;
    for (const c of shuffledCouples) {
      coupleGroups[cIndex % coupleGroupCount].push(c);
      cIndex++;
    }

    for (const group of coupleGroups) {
      if (!group.length) continue;

      result.push({
        churchId: church.id,
        type: DGroupType.Couples,
        name: 'Couples DGroup',

        // 👑 leader couple
        leaders: [
          {
            type: 'Couple',
            id: group[0].id,
          },
        ],

        // 👥 members = other couples
        members: group.slice(1).map((c) => ({
          type: 'Couple',
          id: c.id,
        })),
      });
    }

    // =========================
    // STEP 3: BUILD SINGLES DGROUPS
    // =========================
    const usedAccountIds = new Set<number>();

    for (const c of churchCouples) {
      usedAccountIds.add(c.husbandId);
      usedAccountIds.add(c.wifeId);
    }

    const singles = churchAccounts.filter((a) => !usedAccountIds.has(a.id));

    const shuffledSingles = shuffles(singles);

    const singleGroupCount = Math.max(3, Math.ceil(singles.length / 8));

    const singleGroups: any[][] = Array.from(
      { length: singleGroupCount },
      () => [],
    );

    let sIndex = 0;

    for (const acc of shuffledSingles) {
      singleGroups[sIndex % singleGroupCount].push(acc);
      sIndex++;
    }

    for (const group of singleGroups) {
      if (!group.length) continue;

      result.push({
        churchId: church.id,
        type: DGroupType.Singles,
        name: 'Singles DGroup',

        leaders: [
          {
            type: 'Account',
            id: group[0].id,
          },
        ],

        members: group.slice(1).map((a) => ({
          type: 'Account',
          id: a.id,
        })),
      });
    }
  }

  return result;
}
