import { AccountDTO, AccountQueryDto, AccountDetailDto } from './account.dto';

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
        email: item.email,
        profilePicture: item.profilePicture,
        dGroupLeader: item.dGroupLeader,
        dGroupMembers: item.dGroupMembers,
        latestAttendance:
          item.attendances && item.attendances.length > 0
            ? item.attendances[0].createdAt
            : null,
      }))
    );
  }

  public static toAccountDetailDto(result: any): AccountDetailDto {
    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      middleName: result.middleName,
      birthDate: result.birthDate,
      profilePicture: result.profilePicture,
      gender: result.gender,
      email: result.email,
      contactNumber: result.contactNumber,
      userType: result.userType,
      dGroupLeaderId: result.dGroupLeaderId,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      emergencyContactName: result.emergencyContactName,
      emergencyContactNumber: result.emergencyContactNumber,
      dGroupLeader: result.dGroupLeader,
      dGroupMembers: result.dGroupMembers,
      education: result.education,
      employment: result.employment,
      latestAttendance:
        result.attendances && result.attendances.length > 0
          ? result.attendances[0].createdAt
          : null,
    };
  }
}
