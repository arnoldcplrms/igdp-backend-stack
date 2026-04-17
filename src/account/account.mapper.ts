import {
  AccountDTO,
  AccountQueryDto,
  AccountDetailDto,
  EventDTO,
} from './account.dto';

export class AccountMapper {
  /**
   * Map accounts and compute activity based on event dates
   * @param result Accounts with attendances
   * @param events Preloaded list of events to lookup dates by eventId
   */
  public static toAccountDto(
    result: AccountQueryDto[],
    events?: EventDTO[],
  ): AccountDTO[] {
    const ACTIVITY_WINDOW_DAYS = 30;
    const now = new Date();

    const eventMap = new Map<number, Date>();
    events?.forEach((ev) => eventMap.set(ev.id, ev.eventDate));

    return (
      result &&
      result.map((item) => {
        const latestAttendance = item.attendances?.length
          ? (item.attendances
              .map((att) => eventMap.get(att.eventId))
              .filter((d): d is Date => d != null)
              .sort((a, b) => b.getTime() - a.getTime())[0] ?? null)
          : null;

        const latestAttendanceTime = latestAttendance?.getTime();

        const isActive =
          latestAttendanceTime !== undefined &&
          (now.getTime() - latestAttendanceTime) / (1000 * 60 * 60 * 24) <=
            ACTIVITY_WINDOW_DAYS;

        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          middleName: item.middleName,
          nickname: item.nickname,
          birthDate: item.birthDate,
          age: Math.floor(
            (now.getTime() - new Date(item.birthDate).getTime()) /
              (1000 * 60 * 60 * 24 * 365.25),
          ),
          gender: item.gender,
          email: item.email,
          isActive,
          profilePicture: item.profilePicture,
          dGroupLeader: item.dGroupLeader,
        };
      })
    );
  }

  public static toAccountDetailDto(result: AccountDetailDto): AccountDetailDto {
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
          ? new Date(result.attendances[0].createdAt)
          : null,
      spouse: result.spouse,
    };
  }
}
