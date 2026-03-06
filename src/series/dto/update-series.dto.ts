import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';
import { createSeriesSchema } from './create-series.dto';

export const updateSeriesSchema = createSeriesSchema.partial();

export class UpdateSeriesDto extends ZodClass(updateSeriesSchema) {}
