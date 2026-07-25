export const BLOOD_TYPES = [
  'O-',
  'O+',
  'A-',
  'A+',
  'B-',
  'B+',
  'AB-',
  'AB+',
] as const;

export type BloodType = (typeof BLOOD_TYPES)[number];

/** Who a donor of this type can give red blood cells to. */
export const DONATE_TO: Record<BloodType, BloodType[]> = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
};

/** Who a recipient of this type can receive red blood cells from. */
export const RECEIVE_FROM: Record<BloodType, BloodType[]> = {
  'O-': ['O-'],
  'O+': ['O-', 'O+'],
  'A-': ['O-', 'A-'],
  'A+': ['O-', 'O+', 'A-', 'A+'],
  'B-': ['O-', 'B-'],
  'B+': ['O-', 'O+', 'B-', 'B+'],
  'AB-': ['O-', 'A-', 'B-', 'AB-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
};

export function isUniversalDonor(type: BloodType): boolean {
  return type === 'O-';
}

export function isUniversalRecipient(type: BloodType): boolean {
  return type === 'AB+';
}

/** Approx. share of population with each type (for the "how rare are you" insight). */
export const POPULATION_SHARE: Record<BloodType, number> = {
  'O+': 37,
  'O-': 7,
  'A+': 34,
  'A-': 6,
  'B+': 9,
  'B-': 2,
  'AB+': 3,
  'AB-': 1,
};

export function canDonateTo(donor: BloodType, recipient: BloodType): boolean {
  return DONATE_TO[donor].includes(recipient);
}
