import { useForm, useFieldArray } from "react-hook-form";

const useResumeForm = () => {
  const form = useForm<ResumeData>({
    defaultValues: async () => {
      try {
        const response = await fetch("/resume-placeholder.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Failed to load placeholder data:", error);
        return {
          name: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          linkedin: "",
          pronouns: "",
          summary: "",
          skills: "",
          experiences: [],
          education: [],
        };
      }
    },
  });

  // Field arrays for dynamic experiences and education
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  // Helper functions to add new entries
  const addExperience = () => {
    appendExperience({
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      jobDescription: "",
    });
  };

  const addEducation = () => {
    appendEducation({
      degree: "",
      institution: "",
      year: "",
      details: "",
    });
  };

  return {
    form,
    experienceFields,
    addExperience,
    removeExperience,
    educationFields,
    addEducation,
    removeEducation,
  };
};

export default useResumeForm;
