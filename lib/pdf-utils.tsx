import { pdf } from "@react-pdf/renderer";
import { ResumePDF } from "./pdf-generator";

export const generateResumePDF = async (data: ResumeData) => {
  try {
    // Create PDF document
    const doc = <ResumePDF data={data} />;

    // Generate PDF blob
    const blob = await pdf(doc).toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.name.replace(/\s+/g, "_")}_Resume.pdf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up URL
    URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return { success: false, error };
  }
};
