import { isEducation, isExperience } from "@/lib/type-guards";

interface ResumeFormPreviewProps {
  watchedValues: ResumeData;
}

interface InformationListProps<T extends Experience | Education> {
  keys: (keyof T)[];
  list: T[];
}

interface OptionalResumeValueProps extends ResumeFormPreviewProps {
  resumeFieldKey: keyof ResumeData;
}

const InformationList = <T extends Experience | Education>({
  keys,
  list,
}: InformationListProps<T>) => (
  <div className="pl-4 text-sm flex flex-col md:gap-0 lg:gap-1">
    {list.map((item, index) => (
      <div className="odd:bg-background/30 rounded p-1" key={index}>
        <p>{keys.map((key) => item[key]).join(" | ")}</p>
      </div>
    ))}
  </div>
);

const OptionalResumeValue = ({
  resumeFieldKey,
  watchedValues,
}: OptionalResumeValueProps) => {
  const formatKey = (key: string) => {
    if (key === "linkedin") {
      return "LinkedIn";
    }
    return key[0].toUpperCase() + key.substring(1);
  };

  const value = watchedValues[resumeFieldKey];
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    if (value.every(isExperience)) {
      return (
        <>
          <p>Experience</p>
          <InformationList
            keys={["jobTitle", "company", "startDate", "endDate"]}
            list={value}
          />
        </>
      );
    } else if (value.every(isEducation)) {
      return (
        <>
          <p>Education</p>
          <InformationList
            keys={["degree", "year", "institution"]}
            list={value}
          />
        </>
      );
    } else {
      console.warn("invalid array passed to renderOptionalValue:", value);
    }
  }

  return (
    <p key={resumeFieldKey}>
      {formatKey(resumeFieldKey)}: {value}
    </p>
  );
};

export default function ResumeFormPreview({
  watchedValues,
}: ResumeFormPreviewProps) {
  return (
    <div className="hidden md:block flex-1 sticky top-0 h-full bg-secondary rounded-lg p-2 min-w-2xs">
      <div>
        <p>Personal Information</p>
        <div className="pl-4 text-sm">
          <p>Name: {watchedValues.name}</p>
          <OptionalResumeValue
            resumeFieldKey="pronouns"
            watchedValues={watchedValues}
          />
        </div>
        <p>Contact Information</p>
        <div className="pl-4 text-sm">
          <p>Email: {watchedValues.email}</p>
          {(["phone", "location", "website", "linkedin"] as const).map(
            (contactKey) => (
              <OptionalResumeValue
                key={contactKey}
                resumeFieldKey={contactKey}
                watchedValues={watchedValues}
              />
            )
          )}
        </div>
        <OptionalResumeValue
          resumeFieldKey="experiences"
          watchedValues={watchedValues}
        />
        <OptionalResumeValue
          resumeFieldKey="education"
          watchedValues={watchedValues}
        />
      </div>
    </div>
  );
}
