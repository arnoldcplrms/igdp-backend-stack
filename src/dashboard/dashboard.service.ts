import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';
import { DashboardMetricsDto } from './dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(private dashboardRepo: DashboardRepository) {}

  getMetrics(): Promise<DashboardMetricsDto> {
    return this.dashboardRepo.getDashboardMetrics();
  }
}
