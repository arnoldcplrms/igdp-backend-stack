import { AccountDTO, AccountQueryDto } from './account.dto';

export class AccountMapper {
  public static toAccountDto(result: AccountQueryDto[]): AccountDTO[] {
    return (
      result &&
      result.map((item) => ({
        ...item,
        dGroupMembers: item._count.dGroupMembers,
        // Remove the _count property
        _count: undefined,
      }))
    );
  }
}
