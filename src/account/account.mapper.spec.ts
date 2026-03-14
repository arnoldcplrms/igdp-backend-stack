import { AccountMapper } from './account.mapper';

describe('AccountMapper', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-14T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('toAccountDto', () => {
    it('should map account query records to account dto records', () => {
      const latestAttendanceDate = new Date('2026-02-01T10:00:00.000Z');
      const input = [
        {
          id: 1,
          firstName: 'John',
          middleName: 'P',
          lastName: 'Doe',
          birthDate: new Date('2000-03-14T00:00:00.000Z'),
          gender: 'MALE',
          email: 'john@example.com',
          profilePicture: 'https://example.com/john.jpg',
          dGroupLeader: { id: 2, firstName: 'Leader', lastName: 'One' },
          dGroupMembers: [{ id: 3, firstName: 'Member', lastName: 'One' }],
          attendances: [{ eventId: 10, createdAt: latestAttendanceDate }],
        },
      ];

      const result = AccountMapper.toAccountDto(input as any);

      expect(result).toEqual([
        {
          id: 1,
          firstName: 'John',
          middleName: 'P',
          lastName: 'Doe',
          birthDate: new Date('2000-03-14T00:00:00.000Z'),
          age: 25,
          gender: 'MALE',
          email: 'john@example.com',
          profilePicture: 'https://example.com/john.jpg',
          dGroupLeader: { id: 2, firstName: 'Leader', lastName: 'One' },
          dGroupMembers: [{ id: 3, firstName: 'Member', lastName: 'One' }],
          latestAttendance: latestAttendanceDate,
        },
      ]);
    });

    it('should set latestAttendance to null when attendances is empty or missing', () => {
      const input = [
        {
          id: 1,
          firstName: 'Jane',
          lastName: 'Doe',
          birthDate: new Date('2002-01-01T00:00:00.000Z'),
          gender: 'FEMALE',
          email: 'jane1@example.com',
          attendances: [],
        },
        {
          id: 2,
          firstName: 'Janet',
          lastName: 'Doe',
          birthDate: new Date('2003-01-01T00:00:00.000Z'),
          gender: 'FEMALE',
          email: 'jane2@example.com',
        },
      ];

      const result = AccountMapper.toAccountDto(input as any);

      expect(result[0].latestAttendance).toBeNull();
      expect(result[1].latestAttendance).toBeNull();
    });

    it('should return undefined when input is undefined', () => {
      const result = AccountMapper.toAccountDto(undefined as any);

      expect(result).toBeUndefined();
    });
  });

  describe('toAccountDetailDto', () => {
    it('should map account detail and set latestAttendance from first attendance', () => {
      const latestAttendanceDate = new Date('2026-02-01T10:00:00.000Z');
      const input = {
        id: 1,
        firstName: 'John',
        middleName: 'P',
        lastName: 'Doe',
        birthDate: new Date('2000-03-14T00:00:00.000Z'),
        profilePicture: 'https://example.com/john.jpg',
        gender: 'MALE',
        email: 'john@example.com',
        contactNumber: '09171234567',
        userType: 'MEMBER',
        dGroupLeaderId: 2,
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        updatedAt: new Date('2026-01-01T00:00:00.000Z'),
        emergencyContactName: 'Jane Doe',
        emergencyContactNumber: '09991234567',
        dGroupLeader: { id: 2, firstName: 'Leader', lastName: 'One' },
        dGroupMembers: [{ id: 3, firstName: 'Member', lastName: 'One' }],
        education: [],
        employment: [],
        attendances: [{ eventId: 10, createdAt: latestAttendanceDate }],
      };

      const result = AccountMapper.toAccountDetailDto(input);

      expect(result.id).toBe(1);
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');
      expect(result.latestAttendance).toEqual(latestAttendanceDate);
      expect(result.dGroupLeader).toEqual({
        id: 2,
        firstName: 'Leader',
        lastName: 'One',
      });
    });

    it('should set latestAttendance to null when attendances is empty', () => {
      const input = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        middleName: null,
        birthDate: new Date('2000-03-14T00:00:00.000Z'),
        profilePicture: null,
        gender: 'MALE',
        email: 'john@example.com',
        contactNumber: '09171234567',
        userType: 'MEMBER',
        dGroupLeaderId: null,
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        updatedAt: new Date('2026-01-01T00:00:00.000Z'),
        emergencyContactName: null,
        emergencyContactNumber: null,
        dGroupLeader: null,
        dGroupMembers: [],
        education: [],
        employment: [],
        attendances: [],
      };

      const result = AccountMapper.toAccountDetailDto(input);

      expect(result.latestAttendance).toBeNull();
    });
  });
});
