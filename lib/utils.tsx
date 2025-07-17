import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { pdf } from "@react-pdf/renderer";
import { ResumePDF } from "./pdf-generator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateResumePDF = async (data: ResumeData) => {
  try {
    const doc = <ResumePDF data={data} />;
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${data.name.replace(/\s+/g, "_")}_Resume.pdf`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    return { success: true };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return { success: false, error };
  }
};
