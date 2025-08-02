import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createUpdatedAtMiddleware } from './prisma-middleware';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private static instance: PrismaService;

  constructor() {
    super();
  }

  static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  async onModuleInit() {
    // Register middleware for automatic updatedAt with Philippine timezone
    this.$use(createUpdatedAtMiddleware());
    
    await this.$connect();
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
