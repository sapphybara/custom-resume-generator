import { Font } from "@react-pdf/renderer";

export const generateResumePDF = async (data: ResumeData) => {
  try {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate PDF");
    }

    // Get the PDF blob from the response
    const blob = await response.blob();
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

export const registerFonts = () => {
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
};
