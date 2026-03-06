import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const attendanceItemSchema = z.object({
  eventId: z.number().int(),
  accountId: z.number().int(),
});

export const createAttendanceSchema = z.object({
  attendances: z.array(attendanceItemSchema),
});

export const softDeleteAttendanceSchema = z.object({
  deletedBy: z.number().int(),
});

export const filterAttendanceSchema = z.object({
  eventId: z.number().int().optional(),
  accountId: z.number().int().optional(),
  isDeleted: z.boolean().optional(),
  deletedBy: z.number().int().optional(),
  skip: z.number().int().optional(),
  take: z.number().int().optional(),
});

export class AttendanceItemDto extends ZodClass(attendanceItemSchema) {}

export class CreateAttendanceDto extends ZodClass(createAttendanceSchema) {}

export class SoftDeleteAttendanceDto extends ZodClass(
  softDeleteAttendanceSchema,
) {}

export class FilterAttendanceDto extends ZodClass(filterAttendanceSchema) {}
