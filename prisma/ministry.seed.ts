import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMinistries() {
  // ✅ Ensure at least 1 church exists
  const church = await prisma.church.findFirst({
    orderBy: { id: 'asc' },
  });

  if (!church) {
    throw new Error('❌ No church found. Please seed church first.');
  }

  console.log(`✅ Using Church ID: ${church.id}`);

  const ministriesData = [
    {
      name: 'B1G',
      mission: '',
      vision: '',
      description:
        'We are a community of single, not-yet-married people who gather to know more about Jesus and life’s real purpose. Together, we find true joy in living the single life through learning His word and passionately giving our time, talent, and treasure for the Lord and in His church.',
    },
    {
      name: 'Elevate',
      mission: '',
      vision: '',
      description:
        'Elevate is a nationwide student movement that aims to take students to the next LEVEL. We want every student to experience a life empowered by values, excellence, and leadership! We are passionate about making Christ-committed students through discipleship groups, youth services, and the #NotAlone program.',
    },
  ];

  for (const data of ministriesData) {
    // ✅ Upsert Ministry (avoid duplicates)
    const existing = await prisma.ministry.findFirst({
      where: {
        name: data.name,
        churchId: church.id,
        parentMinistry: null,
      },
    });

    const ministry = existing
      ? existing
      : await prisma.ministry.create({
          data: {
            name: data.name,
            mission: data.mission,
            vision: data.vision,
            description: data.description,
            churchId: church.id,
            parentMinistry: null,
          },
        });

    console.log(`✅ Ministry seeded: ${ministry.name}`);

    // ✅ Seed Roles per Ministry
    const roles = ['Ministry Head', 'Member'];

    for (const roleName of roles) {
      await prisma.ministryRole.upsert({
        where: {
          // Assuming unique constraint (ministryId + roleName)
          ministryId_roleName: {
            ministryId: ministry.id,
            roleName,
          },
        },
        update: {},
        create: {
          ministryId: ministry.id,
          roleName,
        },
      });

      console.log(`   ↳ Role added: ${roleName}`);
    }
  }
}
