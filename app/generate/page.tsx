"use client";

import { Form } from "@/components/ui/form";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  FormInput,
  FormTextArea,
  PrefixInput,
  GridContainer,
} from "@/components/ui/form-components";
import { useForm, useFieldArray } from "react-hook-form";

export default function Generate() {
  const form = useForm<ResumeData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      summary: "",
      skills: "",
      experiences: [
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          jobDescription: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          year: "",
          details: "",
        },
      ],
    },
  });

  // Get current form values for display (reactive)
  const watchedValues = form.watch();

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

  // Handle form submission
  const onSubmit = (data: ResumeData) => {
    console.log("Form submitted with data:", data);
    // Here you can add logic to generate the resume
  };

  return (
    <div className="mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Generate Your Resume
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in your information to create a professional resume
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <Section title="Personal Information" variant="highlighted">
            <GridContainer>
              <FormInput
                name="name"
                label="Full Name"
                placeholder="John Doe"
                required
              />
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="john@example.com"
                required
              />
              <FormInput
                name="phone"
                label="Phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
              <FormInput
                name="location"
                label="Location"
                placeholder="City, State"
              />
              <FormInput
                name="website"
                label="Website"
                placeholder="https://yourwebsite.com"
              />
              <PrefixInput
                name="linkedin"
                label="LinkedIn"
                prefix="linkedin.com/in/"
                placeholder="username"
              />
            </GridContainer>
          </Section>

          {/* Professional Summary Section */}
          <Section title="Professional Summary">
            <FormTextArea
              name="summary"
              label="Summary"
              placeholder="Brief overview of your professional background and key strengths..."
              rows={4}
            />
          </Section>

          {/* Skills Section */}
          <Section title="Skills">
            <FormInput
              name="skills"
              label="Skills"
              placeholder="JavaScript, React, Node.js, Python..."
              required
            />
          </Section>

          {/* Experience Section */}
          <Section title="Experience">
            <div className="space-y-6">
              {experienceFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-medium">
                      Experience {index + 1}
                    </h4>
                    {experienceFields.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeExperience(index)}
                        variant="destructive"
                        size="sm"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <GridContainer>
                    <FormInput
                      name={`experiences.${index}.jobTitle`}
                      label="Job Title"
                      placeholder="Software Engineer"
                      required
                    />
                    <FormInput
                      name={`experiences.${index}.company`}
                      label="Company"
                      placeholder="Tech Corp"
                      required
                    />
                    <div className="flex flex-col md:flex-row gap-4">
                      <FormInput
                        name={`experiences.${index}.startDate`}
                        label="Start Date"
                        placeholder={new Date().toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                        required
                      />
                      <FormInput
                        name={`experiences.${index}.endDate`}
                        label="End Date"
                        placeholder="Present"
                        required
                      />
                    </div>
                  </GridContainer>

                  <div className="mt-4">
                    <FormTextArea
                      name={`experiences.${index}.jobDescription`}
                      label="Job Description"
                      placeholder="Describe your key responsibilities and achievements..."
                      required
                      rows={4}
                    />
                  </div>
                </div>
              ))}

              <div className="text-center">
                <Button type="button" onClick={addExperience} variant="outline">
                  Add Another Experience
                </Button>
              </div>
            </div>
          </Section>

          {/* Education Section */}
          <Section title="Education">
            <div className="space-y-6">
              {educationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-medium">
                      Education {index + 1}
                    </h4>
                    {educationFields.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeEducation(index)}
                        variant="destructive"
                        size="sm"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <GridContainer>
                    <FormInput
                      name={`education.${index}.degree`}
                      label="Degree"
                      placeholder="Bachelor of Science in Computer Science"
                      required
                    />
                    <FormInput
                      name={`education.${index}.institution`}
                      label="Institution"
                      placeholder="University Name"
                      required
                    />
                    <FormInput
                      name={`education.${index}.year`}
                      label="Year"
                      placeholder="2024"
                      required
                    />
                  </GridContainer>

                  <div className="mt-4">
                    <FormTextArea
                      name={`education.${index}.details`}
                      label="Additional Details (Optional)"
                      placeholder="GPA, honors, relevant coursework..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}

              <div className="text-center">
                <Button type="button" onClick={addEducation} variant="outline">
                  Add Another Education
                </Button>
              </div>
            </div>
          </Section>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button type="submit" size="lg">
              Generate Resume
            </Button>
          </div>
        </form>
      </Form>

      {/* Debug Section - Remove in production */}
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Resume Data (Debug)</h3>
        <pre className="text-sm overflow-auto max-h-64">
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </div>
    </div>
  );
}
