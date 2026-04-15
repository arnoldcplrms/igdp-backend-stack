import { randomItem } from '../data/helpers.seed';
import { firstNames, lastNames } from '../data/names.seed';

export function generateAccount(params: {
  index: number;
  churchId: number;
  randomDate: () => Date;
}) {
  const { index, churchId, randomDate } = params;

  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const gender = Math.random() > 0.5 ? 'Male' : 'Female';

  const hasMiddleName = Math.random() > 0.3;
  const middleName = hasMiddleName ? randomItem(firstNames) : null;

  // ✅ GUARANTEED UNIQUE IDENTIFIER
  const uniqueSuffix = `${Date.now()}-${index}-${Math.floor(Math.random() * 100000)}`;

  const emailBase = `${firstName}.${lastName}.${uniqueSuffix}`
    .toLowerCase()
    .replace(/\s/g, '');

  return {
    churchId,
    firstName,
    middleName,
    lastName,
    nickname: firstName.slice(0, 2),

    facebookLink: `https://facebook.com/${emailBase}`,

    contactNumber: `+63917${String(1000000 + index).slice(1)}`,

    email: `${emailBase}@example.com`,

    gender,
    birthDate: randomDate(),

    userType: 'Member',

    emergencyContactName: `${randomItem(firstNames)} ${lastName}`,
    emergencyContactNumber: `+63917${String(1000000 + index + 100).slice(1)}`,
  };
}
