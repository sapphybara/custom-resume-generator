import { StyleSheet } from "@react-pdf/renderer";

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
    paddingLeft: 10,
    textIndent: -10,
  },

  educationAdditional: {
    fontSize: 11,
    lineHeight: 1.4,
    color: "#333",
    marginTop: 4,
  },
});

export default styles;
