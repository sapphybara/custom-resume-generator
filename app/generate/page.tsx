"use client";

import { Form } from "@/components/ui/form";
import { Section } from "@/components/ui/section";
import {
  FormInput,
  PrefixInput,
  GridContainer,
} from "@/components/ui/form-components";
import { useForm } from "react-hook-form";

export default function Generate() {
  const form = useForm();

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
        <div className="space-y-8">
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
                type="url"
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
            <FormInput
              name="summary"
              label="Summary"
              placeholder="Brief overview of your professional background and key strengths..."
            />
          </Section>

          {/* Skills Section */}
          <Section title="Skills">
            <FormInput
              name="skills"
              label="Skills"
              placeholder="JavaScript, React, Node.js, Python..."
            />
          </Section>

          {/* Experience Section */}
          <Section title="Experience">
            <GridContainer cols={{ default: 1, md: 3 }}>
              <FormInput
                name="jobTitle"
                label="Job Title"
                placeholder="Software Engineer"
                required
              />
              <FormInput
                name="company"
                label="Company"
                placeholder="Tech Corp"
                required
              />
              <div className="flex flex-col md:flex-row gap-4">
                <FormInput
                  name="startDate"
                  label="Start Date"
                  placeholder={new Date().toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                />
                <FormInput
                  name="endDate"
                  label="End Date"
                  placeholder="Present"
                />
              </div>
            </GridContainer>
            <div className="mt-4">
              <FormInput
                name="jobDescription"
                label="Job Description"
                placeholder="Describe your key responsibilities and achievements..."
              />
            </div>
          </Section>

          {/* Education Section */}
          <Section title="Education">
            <FormInput
              name="education"
              label="Education"
              placeholder="Degree, Institution, Year..."
            />
          </Section>
        </div>
      </Form>
    </div>
  );
}
