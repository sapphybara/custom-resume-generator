import React from "react";
import { Document, Page, Text, View, Link } from "@react-pdf/renderer";
import styles from "./styles";

interface ResumePDFProps {
  data: ResumeData;
}

export const ResumePDF = ({ data }: ResumePDFProps) => {
  const formatContactInfo = () => {
    const contacts = [];

    if (data.location) {
      contacts.push(
        <Text key="location" style={styles.contactItem}>
          🏠 {data.location}
        </Text>
      );
    }

    if (data.email) {
      contacts.push(
        <Link
          key="email"
          src={`mailto:${data.email}`}
          style={styles.contactLink}
        >
          <Text style={styles.contactItem}>📧 {data.email}</Text>
        </Link>
      );
    }

    if (data.phone) {
      contacts.push(
        <Link key="phone" src={`tel:${data.phone}`} style={styles.contactLink}>
          <Text style={styles.contactItem}>📞 {data.phone}</Text>
        </Link>
      );
    }

    if (data.linkedin) {
      const linkedInRegexURL = /^https?:\/\/(www\.)?linkedin\.com\/in\//;
      const linkedinUrl = linkedInRegexURL.test(data.linkedin)
        ? data.linkedin
        : `https://linkedin.com/in/${data.linkedin}`;
      contacts.push(
        <Link key="linkedin" src={linkedinUrl} style={styles.contactLink}>
          <Text style={styles.contactItem}>
            🔗 linkedin.com/in/{data.linkedin.replace(linkedInRegexURL, "")}
          </Text>
        </Link>
      );
    }

    if (data.website) {
      const websiteUrl = /https?/.test(data.website)
        ? data.website
        : `https://${data.website}`;
      contacts.push(
        <Link key="website" src={websiteUrl} style={styles.contactLink}>
          <Text style={styles.contactItem}>
            🌐 {data.website.replace(/^https?:\/\//, "")}
          </Text>
        </Link>
      );
    }

    if (data.pronouns) {
      contacts.push(
        <Text key="pronouns" style={styles.contactItem}>
          👤 {data.pronouns}
        </Text>
      );
    }

    return contacts;
  };

  const formatSkills = (skillsString: string) => {
    return skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.toLowerCase() === "present") return "Present";

    // Try to parse and format the date
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    }
    return dateString;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Contact Section - ATS Semantic Structure */}
        <View id="contact">
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.contactInfo}>
            {formatContactInfo().map((contact, index) => (
              <React.Fragment key={index}>
                {contact}
                {index < formatContactInfo().length - 1 && (
                  <Text style={styles.contactItem}> | </Text>
                )}
              </React.Fragment>
            ))}
          </View>
          <View style={styles.divider} />
        </View>

        {/* Summary Section */}
        {data.summary && (
          <View id="summary">
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Skills Section - ATS Optimized */}
        {data.skills && (
          <View id="skills" wrap={false}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {formatSkills(data.skills).map((skill, index) => {
                return (
                  <View key={index} style={styles.skillItemContainer}>
                    <Text style={styles.skillItem}>{skill}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Experience Section - ATS Semantic Structure */}
        {data.experiences && data.experiences.length > 0 && (
          <View id="experience">
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experiences.map((exp, index) => (
              <View key={index} wrap={false}>
                <Text style={styles.header}>{exp.jobTitle}</Text>
                <Text style={styles.details}>
                  {exp.company} | {formatDate(exp.startDate)} -&nbsp;
                  {formatDate(exp.endDate)}
                </Text>
                {exp.jobDescription && (
                  <View style={styles.bulletPoints}>
                    {exp.jobDescription
                      .split("\n")
                      .map((bullet, bulletIndex) => (
                        <Text key={bulletIndex} style={styles.bulletPoint}>
                          &ndash; {bullet.trim()}
                        </Text>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section - ATS Semantic Structure */}
        {data.education && data.education.length > 0 && (
          <View id="education">
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} wrap={false}>
                <Text style={styles.header}>{edu.degree}</Text>
                <Text style={styles.details}>
                  {edu.institution} | {edu.year}
                </Text>
                {edu.details && (
                  <View style={styles.bulletPoints}>
                    {edu.details.split("\n").map((bullet, bulletIndex) => (
                      <Text key={bulletIndex} style={styles.bulletPoint}>
                        &ndash; {bullet.trim()}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
