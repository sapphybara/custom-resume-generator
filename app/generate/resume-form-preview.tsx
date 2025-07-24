import { Fragment } from "react";
import { useWatch } from "react-hook-form";

import { isEducation, isExperience } from "@/lib/type-guards";

interface InformationListProps<T extends Experience | Education> {
  keys: (keyof T)[];
  list: T[];
}

interface OptionalResumeValueProps {
  resumeFieldKey: keyof ResumeData;
  formData: ResumeData;
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
  formData,
}: OptionalResumeValueProps) => {
  const value = formData[resumeFieldKey];
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

  return <span key={resumeFieldKey}>{formatKey(resumeFieldKey) + value}</span>;
};

export default function ResumeFormPreview({ control }: PropsWithControl) {
  const formData = useWatch({ control }) as ResumeData;

  return (
    <div className="hidden md:block flex-1 sticky top-0 h-full bg-secondary rounded-lg p-2 min-w-xs">
      <div className="text-center">
        <h3>{formData.name || "Your Name"}</h3>
        <h4 className="text-sm font-normal">
          <OptionalResumeValue resumeFieldKey="pronouns" formData={formData} />
        </h4>
        <hr className="pb-1" />
        <div className="text-sm leading-relaxed break-all">
          {(["location", "email", "phone", "linkedin", "website"] as const)
            .filter((key) => formData[key])
            .map((key, idx, filteredKeys) => (
              <Fragment key={key}>
                <OptionalResumeValue resumeFieldKey={key} formData={formData} />
                {idx < filteredKeys.length - 1 && (
                  <span className="mx-1 text-gray-400">|</span>
                )}
              </Fragment>
            ))}
        </div>
      </div>
      <OptionalResumeValue resumeFieldKey="experiences" formData={formData} />
      <OptionalResumeValue resumeFieldKey="education" formData={formData} />
    </div>
  );
}
