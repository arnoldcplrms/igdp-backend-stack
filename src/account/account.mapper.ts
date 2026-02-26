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
        age: Math.floor(
          (new Date().getTime() - new Date(item.birthDate).getTime()) /
            (1000 * 60 * 60 * 24 * 365.25),
        ),
        gender: item.gender,
        profilePicture: item.profilePicture,
        dGroupLeader: item.dGroupLeader,
        dGroupMembers: item.dGroupMembers,
      }))
    );
  }
}
