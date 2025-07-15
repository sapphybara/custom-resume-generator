import { useForm, useFieldArray } from "react-hook-form";

const useResumeForm = () => {
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

  return {
    form,
    watchedValues,
    experienceFields,
    addExperience,
    removeExperience,
    educationFields,
    addEducation,
    removeEducation,
  };
};

export default useResumeForm;
