import { useWatch } from "react-hook-form";

import { isEducation, isExperience } from "@/lib/type-guards";
import { cn } from "@/lib/utils";

interface InformationListProps<T extends Experience | Education> {
  keys: (keyof T)[];
  list: T[];
}

interface OptionalResumeValueProps extends PropsWithClassName {
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
  return key[0].toUpperCase() + key.substring(1) + ":";
};

const OptionalResumeValue = ({
  className,
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
        <div className={className}>
          <p>Experience</p>
          <InformationList
            keys={["jobTitle", "company", "startDate", "endDate"]}
            list={experienceList}
          />
        </div>
      );
    }

    const educationList = value.filter(isEducation);
    if (educationList.length > 0) {
      return (
        <div className={className}>
          <p>Education</p>
          <InformationList
            keys={["degree", "year", "institution"]}
            list={educationList}
          />
        </div>
      );
    }

    return null;
  }

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <span>{formatKey(resumeFieldKey)}</span>
      <span className="text-sm">{value}</span>
      {showSeparator && <span className="mr-1 text-gray-400">|</span>}
    </div>
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
        className="items-baseline"
        resumeFieldKey="skills"
        value={formData?.skills}
      />
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
