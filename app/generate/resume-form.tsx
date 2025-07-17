import {
  UseFormReturn,
  FieldArrayWithId,
  UseFieldArrayRemove,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  GridContainer,
  PrefixInput,
  FormInput,
  FormTextArea,
} from "@/components/ui/form-components";
import { Section } from "@/components/ui/section";
import { generateResumePDF } from "@/lib/pdf-utils";

type ResumeFormProps = {
  form: UseFormReturn<ResumeData>;
  experienceFields: FieldArrayWithId<ResumeData, "experiences", "id">[];
  addExperience: () => void;
  removeExperience: UseFieldArrayRemove;
  educationFields: FieldArrayWithId<ResumeData, "education", "id">[];
  addEducation: () => void;
  removeEducation: UseFieldArrayRemove;
};

export default function ResumeForm({
  form,
  experienceFields,
  addExperience,
  removeExperience,
  educationFields,
  addEducation,
  removeEducation,
}: ResumeFormProps) {
  // Handle form submission
  const onSubmit = async (data: ResumeData) => {
    try {
      const result = await generateResumePDF(data);
      if (!result.success) {
        throw result.error;
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
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
              name="pronouns"
              label="Pronouns"
              placeholder="she/her, they/them, he/him"
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
                    className="lg:col-span-2"
                  />
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
                  <h4 className="text-lg font-medium">Education {index + 1}</h4>
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
  );
}
