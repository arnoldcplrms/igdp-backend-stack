import { seedDGroupMemberships } from './factory/dgroup-membership.factory';
import { buildDGroups } from './factory/dgroup.factory';

export async function seedDgroup() {
  console.log('🌱 Building DGroups...');

  const groups = await buildDGroups();

  console.log(`📦 Built ${groups.length} DGroups`);

  await seedDGroupMemberships(groups);

  console.log('👥 DGroups + Membership seeded successfully');
}
