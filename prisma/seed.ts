import { PrismaClient } from '@prisma/client';
import { companyData, syncCompanyEmployeeCounts } from './company.seed';
import { seedSchools, syncSchoolStudentCounts } from './school.seed';
import { seedSchoolEducation } from './education.seed';
import { seedEmployment } from './employment.seed';
import { seedMinistries } from './ministry.seed';
import { seedAccounts } from './account.seed';
import { seedDgroup } from './dgroup.seed';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.eventSpeakers.deleteMany(),
    prisma.event.deleteMany(),
    prisma.series.deleteMany(),
    prisma.employment.deleteMany(),
    prisma.education.deleteMany(),
    prisma.account.deleteMany(),
    prisma.company.deleteMany(),
    prisma.school.deleteMany(),
    prisma.ministryRole.deleteMany(),
    prisma.ministry.deleteMany(),
    prisma.church.deleteMany(),
  ]);

  console.log('Creating Church...');
  const church = await Promise.all([
    prisma.church.create({
      data: {
        name: 'Tandang Sora',
        address: 'Crossroad Mall',
      },
    }),
    prisma.church.create({
      data: {
        name: 'Commonwealth',
        address: 'Ever Gotesco Mall',
      },
    }),
  ]);
  console.log(`Created ${church.length} churchs`);

  await seedMinistries();

  console.log('Creating Schools...');
  const schools = await seedSchools();
  console.log(`Created ${schools.count} schools`);

  console.log('Creating Companies...');
  const companies = await prisma.$transaction(
    companyData.map((company) =>
      prisma.company.upsert({
        where: {
          name_address: {
            name: company.name,
            address: company.address,
          },
        },
        update: {},
        create: company,
      }),
    ),
  );

  console.log(`Created ${companies.length} companies`);

  console.log('🌱 Seeding accounts...');
  await seedAccounts();
  console.log('✅ Done seeding accounts');

  console.log('🌱 Seeding dgroups...');
  await seedDgroup();
  console.log('✅ Done seeding dgroups');

  console.log('Creating Education records...');
  const latestEducations = await seedSchoolEducation();
  await syncSchoolStudentCounts();
  console.log(`Created ${latestEducations.count} education records`);

  console.log('Creating Employment records...');
  const employments = await seedEmployment();
  await syncCompanyEmployeeCounts();
  console.log(`Created ${employments.count} employment records`);

  console.log('Creating Series...');
  const series = await Promise.all([
    prisma.series.create({
      data: {
        name: 'Navigating Faith in Your 20s & 30s',
      },
    }),
    prisma.series.create({
      data: {
        name: "Love, Relationships & God's Design for Singles",
      },
    }),
    prisma.series.create({
      data: {
        name: 'Building a Godly Character',
      },
    }),
    prisma.series.create({
      data: {
        name: 'Becoming a Leader in Your Church Community',
      },
    }),
    prisma.series.create({
      data: {
        name: 'The Fruit of the Spirit: Growing in Faith',
      },
    }),
  ]);
  console.log(`Created ${series.length} series`);

  // console.log('Creating Speakers...');
  // const speakers = await Promise.all([
  //   prisma.speaker.create({
  //     data: {
  //       name: `${accounts[0].firstName} ${accounts[0].lastName}`,
  //       accountId: accounts[0].id,
  //       updatedBy: accounts[0].id,
  //     },
  //   }),
  //   prisma.speaker.create({
  //     data: {
  //       name: `${accounts[1].firstName} ${accounts[1].lastName}`,
  //       accountId: accounts[1].id,
  //       updatedBy: accounts[1].id,
  //     },
  //   }),
  //   prisma.speaker.create({
  //     data: {
  //       name: `${accounts[2].firstName} ${accounts[2].lastName}`,
  //       accountId: accounts[2].id,
  //       updatedBy: accounts[2].id,
  //     },
  //   }),
  //   prisma.speaker.create({
  //     data: {
  //       name: `${accounts[3].firstName} ${accounts[3].lastName}`,
  //       accountId: accounts[3].id,
  //       updatedBy: accounts[3].id,
  //     },
  //   }),
  //   prisma.speaker.create({
  //     data: {
  //       name: `${accounts[4].firstName} ${accounts[4].lastName}`,
  //       accountId: accounts[4].id,
  //       updatedBy: accounts[4].id,
  //     },
  //   }),
  // ]);
  // console.log(`Created ${speakers.length} speakers`);

  console.log('Creating Events...');
  const events = await Promise.all([
    prisma.event.create({
      data: {
        eventName: 'Guarding Your Heart: Dating with Purpose',
        eventDate: new Date('2024-02-15'),
        location: 'UP Diliman Chapel, Quezon City',
        seriesId: series[1].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: 'Finding Your Identity in Christ as a Young Adult',
        eventDate: new Date('2024-03-10'),
        location: 'Ateneo De Manila University, Katipunan',
        seriesId: series[0].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: 'Love Languages and Biblical Relationships',
        eventDate: new Date('2024-04-05'),
        location: 'DLSU Auditorium, Manila',
        seriesId: series[1].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: 'Living Out Your Faith in the Workplace',
        eventDate: new Date('2024-05-20'),
        location: 'BGC Prayer Center, Taguig',
        seriesId: series[2].id,
      },
    }),
    prisma.event.create({
      data: {
        eventName: 'Youth Leaders Summit: Serving Your Peers',
        eventDate: new Date('2024-06-01'),
        location: 'Makati City Sports Complex, Makati',
        seriesId: series[3].id,
      },
    }),
  ]);
  console.log(`Created ${events.length} events`);

  // console.log('Creating EventSpeakers...');
  // const eventSpeakers = await Promise.all([
  //   prisma.eventSpeakers.create({
  //     data: {
  //       speakerId: speakers[0].id,
  //       eventId: events[0].id,
  //     },
  //   }),
  //   prisma.eventSpeakers.create({
  //     data: {
  //       speakerId: speakers[1].id,
  //       eventId: events[1].id,
  //     },
  //   }),
  //   prisma.eventSpeakers.create({
  //     data: {
  //       speakerId: speakers[2].id,
  //       eventId: events[2].id,
  //     },
  //   }),
  //   prisma.eventSpeakers.create({
  //     data: {
  //       speakerId: speakers[3].id,
  //       eventId: events[3].id,
  //     },
  //   }),
  //   prisma.eventSpeakers.create({
  //     data: {
  //       speakerId: speakers[4].id,
  //       eventId: events[4].id,
  //     },
  //   }),
  // ]);
  // console.log(`Created ${eventSpeakers.length} event-speaker relations`);

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
