import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

Font.register({
  family: "Lato",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjxAwXjeu.woff2",
    },
    {
      src: "https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwaPGR_p.woff2",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Merriweather Sans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/merriweathersans/v27/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX7QjX78w.woff2",
    },
    {
      src: "https://fonts.gstatic.com/s/merriweathersans/v27/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjnj9ytf.woff2",
      fontStyle: "italic",
    },
  ],
});

Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Lato",
    lineHeight: 1.6,
    color: "#333",
  },

  name: {
    fontSize: 24,
    fontFamily: "Merriweather Sans",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 10,
    color: "#aa00aa",
  },

  contactInfo: {
    fontSize: 10,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 1.4,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
    rowGap: 4,
  },

  contactItem: {
    color: "#555",
  },

  contactLink: {
    textDecoration: "none",
  },

  divider: {
    height: 3,
    backgroundColor: "#aa00aa",
    marginBottom: 10,
  },

  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Lato",
    fontWeight: "bold",
    color: "#aa00aa",
    marginBottom: 0,
    marginTop: 8,
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    marginTop: 5,
    gap: 8,
  },

  skillItemContainer: {
    backgroundColor: "#fafafa",
    border: "1px solid #aa00aa",
    borderRadius: 6,
    padding: 8,
  },

  skillItem: {
    color: "#333",
    textAlign: "center",
    fontSize: 10,
    lineHeight: 1,
  },

  header: {
    fontSize: 14,
    fontFamily: "Lato",
    fontWeight: "bold",
    color: "#aa00aa",
  },

  details: {
    fontSize: 12,
    color: "#666",
    marginTop: -8,
  },

  bulletPoints: {
    marginBottom: 10,
  },

  bulletPoint: {
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 4,
    color: "#333",
    paddingLeft: 8,
    textIndent: -8,
  },

  educationAdditional: {
    fontSize: 11,
    lineHeight: 1.4,
    color: "#333",
    marginTop: 4,
  },
});

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
