import { seedDGroupMemberships } from './factory/dgroup-membership.factory';
import { seedCouples } from './couple.seed';
import { buildDGroups } from './factory/dgroup.builder';
import { seedDGroups } from './factory/dgroup.factory';

export async function seedAll() {
  console.log('🌱 Starting full seed...');

  // 1. COUPLES FIRST (IMPORTANT FOR FK)
  const couples = await seedCouples();
  console.log(`💑 Seeded ${couples.length} couples`);

  // 2. BUILD DGROUPS FROM DB STATE
  const groups = await buildDGroups();
  console.log(`📦 Built ${groups.length} DGroups`);

  // 3. CREATE DGROUPS
  const createdGroups = await seedDGroups(groups);
  console.log(`💾 Created ${createdGroups.length} DGroups`);

  // 4. MEMBERSHIPS
  await seedDGroupMemberships(createdGroups);
  console.log('👥 Memberships seeded successfully');

  console.log('🎉 FULL SEED COMPLETE');
}
