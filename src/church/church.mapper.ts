import { Church } from '@prisma/client';
import { ChurchResponseDTO } from './church.dto';

export class ChurchMapper {
  static toDto(entity: Church): ChurchResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      address: entity.address ?? undefined,
    };
  }
}
