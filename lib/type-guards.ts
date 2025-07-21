type KeyTypeMapping<T> = {
  [K in keyof T]: T[K] extends string
    ? "string"
    : T[K] extends number
    ? "number"
    : T[K] extends boolean
    ? "boolean"
    : T[K] extends object
    ? "object"
    : "unknown";
};

const isT = <T extends object>(
  value: unknown,
  keyMappings: KeyTypeMapping<T>
): value is T => {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const obj = value as { [key: string]: unknown };
  return Object.entries(keyMappings).every(
    ([key, expectedType]) => key in obj && typeof obj[key] === expectedType
  );
};

export const isExperience = (experience: unknown): experience is Experience =>
  isT<Experience>(experience, {
    jobTitle: "string",
    company: "string",
    startDate: "string",
    endDate: "string",
    jobDescription: "string",
  });

export const isEducation = (education: unknown): education is Education =>
  isT<Education>(education, {
    degree: "string",
    institution: "string",
    year: "string",
  });
