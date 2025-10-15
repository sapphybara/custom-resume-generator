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

  const generateIdFromList = (list: { id: number }[]) => {
    return list.length > 0 ? list[list.length - 1].id + 1 : 0;
  };

  // Helper functions to add new entries
  const addExperience = () => {
    appendExperience({
      id: generateIdFromList(experienceFields),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      jobDescription: "",
    });
  };

  const setExperience = (experiences: Experience[]) => {
    form.setValue("experiences", experiences);
  };

  const addEducation = () => {
    appendEducation({
      id: generateIdFromList(educationFields),
      degree: "",
      institution: "",
      year: "",
      details: "",
    });
  };

  const setEducation = (education: Education[]) => {
    form.setValue("education", education);
  };

  return {
    form,
    experienceFields,
    addExperience,
    setExperience,
    removeExperience,
    educationFields,
    addEducation,
    setEducation,
    removeEducation,
  };
};

export default useResumeForm;
