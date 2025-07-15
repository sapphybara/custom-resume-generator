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
import { generateResumePDF } from "@/lib/pdf-utils";
import { ResumePDF } from "@/lib/pdf-generator";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function Generate() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<ResumeData>({
    defaultValues: {
      name: "Sapphyra Wiser",
      email: "sapphyra.wiser@gmail.com",
      phone: "720-839-7618",
      location: "Denver, CO",
      website: "https://www.sapphyra.dev",
      linkedin: "sapphyra-wiser",
      pronouns: "she/her",
      summary:
        "Creative and driven Front End Developer with a strong foundation in both design and development, and a passion for both. Thrives in collaborative environments - and on the volleyball court.",
      skills:
        "Angular, React, JavaScript/ES6+, TypeScript, CSS3/HTML5, Responsive Design, Node.js, Python, MySQL, OOP, Unit Testing, Pytest, Jest, Git/GitLab/Bitbucket, AWS Amplify, UI/UX Design, Figma, Adobe XD, Agile/SCRUM, WCAG 2.x",
      experiences: [
        {
          jobTitle: "Freelance Web Developer",
          company: "Self-Employed",
          startDate: "April 2024",
          endDate: "Present",
          jobDescription:
            "Collaborated with clients in consulting industries, designing and developing custom websites with a focus on accessibility, responsive design, and SEO & site optimization.\nLed the complete branding, design, and front-end development for outlastpower.com, an energy startup focused on bringing battery storage to underserved commercial facilities. Created a tailored Squarespace site balancing technical credibility with accessibility, involving full-stack planning from typography and LESS customization to image licensing, site SEO, and content hierarchy. Developed a bold UI with responsive layout and a black and yellow color scheme that resonates with their target audience of blue-collar commercial facility owners.\nDeveloped mitokhon.com for MitoKhon, a consultancy advancing health equity and social justice across healthcare systems. Built the site in WordPress using Breakdance and custom CSS. Extended the initial Figma designs of three core pages into ten fully responsive, accessible layouts. Delivered ahead of schedule and under budget, earning praise from the client, designer, and project manager for clean implementation and seamless user experience.\nOptimized SEO and performance for Enoch & Co, a real estate advisory firm. Minified images, streamlined code, and implemented SEO strategies.",
        },
        {
          jobTitle: "Full Stack Developer",
          company: "Pacific Northwest National Laboratory",
          startDate: "February 2021",
          endDate: "November 2023",
          jobDescription:
            "Worked closely with cross-functional teams to develop interactive, data-driven visualization platforms for scientific collaboration. Utilized expertise in Angular, React, TypeScript, and Python to contribute to the creation of cutting-edge solutions tailored to meet project requirements.\nTook ownership of UI design for a key project, creating a feature that helped secure an additional $50K in funding. Anticipated needs ahead of client demos to polish the product, resolving last-minute bugs and shipping features under pressure to ensure a seamless, high-quality presentation.\nPlayed a key role in improving code quality, reducing technical debt, and mentoring junior staff members, fostering a collaborative and growth-oriented work environment.",
        },
        {
          jobTitle: "Web Development Intern",
          company: "Pacific Northwest National Laboratory",
          startDate: "April 2020",
          endDate: "August 2020",
          jobDescription:
            "Contributed to the early development of a React-based data visualization tool, implementing core logic and structure based on design mockups.\nSupported technical decision-making by researching and recommending charting libraries, including the team's eventual adoption of D3.js.",
        },
        {
          jobTitle: "Undergrad Research Assistant",
          company: "Ut Austin Nuclear Engineering Teaching Lab",
          startDate: "June 2018",
          endDate: "November 2020",
          jobDescription:
            "Led software development for outdoor air samplers, using Python, Django, JavaScript, and HTML/CSS to build a Django-based server for local result processing.\nWorked with a multidisciplinary undergraduate team across the sciences, contributing to a successful field test that informed further development by collaborators at a national lab. Later co-authored a publication detailing the system's methodology.",
        },
      ],
      education: [
        {
          degree: "BS Mathematics",
          institution: "University of Texas at Austin",
          year: "2023",
        },
        {
          degree: "Certificate in Computer Science",
          institution: "University of Texas at Austin",
          year: "2022",
        },
        {
          degree: "AS Mathematics",
          institution: "Austin Community College",
          year: "2019",
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
  const onSubmit = async (data: ResumeData) => {
    try {
      const result = await generateResumePDF(data);
      if (result.success) {
        console.log("PDF generated successfully!");
      } else {
        console.error("Failed to generate PDF:", result.error);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
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

      {/* PDF Preview Section */}
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Resume Preview</h3>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          {isClient ? (
            <PDFViewer width="100%" height="600px" style={{ border: "none" }}>
              <ResumePDF data={watchedValues} />
            </PDFViewer>
          ) : (
            <div className="w-full h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                Loading PDF preview...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
