import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createUpdatedAtMiddleware } from './prisma-middleware';

function withManilaTimezone(url?: string): string | undefined {
  if (!url) {
    return url;
  }

  const parsed = new URL(url);
  parsed.searchParams.set('options', '-c TimeZone=Asia/Manila');

  return parsed.toString();
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private static instance: PrismaService;

  constructor() {
    super({
      datasources: {
        db: {
          url: withManilaTimezone(process.env.DATABASE_URL),
        },
      },
    });
  }

  static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  async onModuleInit() {
    await this.$connect();
    await this.$executeRawUnsafe("SET TIME ZONE 'Asia/Manila'");
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: any) {
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
