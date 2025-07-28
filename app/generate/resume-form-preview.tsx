import { useWatch } from "react-hook-form";

import { isEducation, isExperience } from "@/lib/type-guards";

interface InformationListProps<T extends Experience | Education> {
  keys: (keyof T)[];
  list: T[];
}

interface OptionalResumeValueProps {
  resumeFieldKey: keyof ResumeData;
  showSeparator?: boolean;
  value?: string | Partial<Experience>[] | Partial<Education>[];
}

type EmojiMap = { [K in keyof ResumeData]?: string };
const EMOJI_MAP: EmojiMap = {
  location: "🏠",
  email: "📧",
  phone: "📞",
  website: "🌐",
};

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

const formatKey = (key: string) => {
  if (key === "linkedin") {
    return "🔗linkedin.com/in/";
  } else if (key === "pronouns") {
    return "";
  } else if (key in EMOJI_MAP) {
    return EMOJI_MAP[key as keyof EmojiMap];
  }
  return key[0].toUpperCase() + key.substring(1) + ": ";
};

const OptionalResumeValue = ({
  resumeFieldKey,
  showSeparator = false,
  value,
}: OptionalResumeValueProps) => {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    const experienceList = value.filter(isExperience);
    if (experienceList.length > 0) {
      return (
        <>
          <p>Experience</p>
          <InformationList
            keys={["jobTitle", "company", "startDate", "endDate"]}
            list={experienceList}
          />
        </>
      );
    }

    const educationList = value.filter(isEducation);
    if (educationList.length > 0) {
      return (
        <>
          <p>Education</p>
          <InformationList
            keys={["degree", "year", "institution"]}
            list={educationList}
          />
        </>
      );
    }

    return null;
  }

  return (
    <>
      <span key={resumeFieldKey}>{formatKey(resumeFieldKey) + value}</span>
      {showSeparator && <span className="mx-1 text-gray-400">|</span>}
    </>
  );
};

export default function ResumeFormPreview({ control }: PropsWithControl) {
  const formData = useWatch({ control });

  const contactFields = [
    "location",
    "email",
    "phone",
    "linkedin",
    "website",
  ] as const;

  const contactValues = contactFields
    .map((key) => ({
      key,
      value: formData?.[key],
    }))
    .filter(({ value }) => value);

  return (
    <div className="hidden md:flex flex-col flex-1 sticky top-0 h-fit bg-secondary rounded-lg p-2 min-w-xs">
      <div className="text-center">
        <h3>{formData?.name || "Your Name"}</h3>
        <h4 className="text-sm font-normal pb-1">
          <OptionalResumeValue
            resumeFieldKey="pronouns"
            value={formData?.pronouns}
          />
        </h4>
        <hr className="pb-1" />
        <div className="text-sm leading-relaxed break-all">
          {contactValues.map(({ key, value }, idx) => (
            <OptionalResumeValue
              key={key}
              resumeFieldKey={key}
              showSeparator={idx < contactValues.length - 1}
              value={value}
            />
          ))}
        </div>
      </div>
      <OptionalResumeValue
        resumeFieldKey="experiences"
        value={formData?.experiences}
      />
      <OptionalResumeValue
        resumeFieldKey="education"
        value={formData?.education}
      />
    </div>
  );
}
