import { ResumePDF } from "./generator";
import { registerFonts } from "@/lib/pdf-utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function PDFPreview({ control }: PropsWithControl) {
  const [isClient, setIsClient] = useState(false);
  const watchedValues = useWatch({ control }) as ResumeData;

  useEffect(() => {
    setIsClient(true);
    registerFonts();
  }, []);

  return (
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
  );
}
