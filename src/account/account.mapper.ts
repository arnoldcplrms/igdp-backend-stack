import { AccountDTO, AccountQueryDto } from './account.dto';

export class AccountMapper {
  public static toAccountDto(result: AccountQueryDto[]): AccountDTO[] {
    return (
      result &&
      result.map((item) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        middleName: item.middleName,
        birthDate: item.birthDate,
        dGroupLeader: item.dGroupMembers, // Swap: Prisma's dGroupMembers is the leader
        dGroupMembers: item.dGroupLeader, // Swap: Prisma's dGroupLeader is the members array
      }))
    );
  }
}
