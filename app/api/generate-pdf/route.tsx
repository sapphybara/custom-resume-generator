import { renderToStream } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

import { ResumePDF } from "@/app/generate/_pdf/generator";
import { registerFonts } from "@/lib/pdf-utils";

export async function POST(request: NextRequest) {
  try {
    const data: ResumeData = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    registerFonts();

    const stream = await renderToStream(<ResumePDF data={data} />);
    const filename = `${data.name.replace(/\s+/g, "_")}_Resume.pdf`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
