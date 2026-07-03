import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { projectSchema } from "@/lib/validations/project";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Safely migrate legacy string categories to array format
    try {
      await Project.updateMany(
        { category: { $type: "string" } },
        [ { $set: { category: ["$category"] } } ]
      );
    } catch (migErr) {
      console.error("Migration error:", migErr);
    }
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const query: any = {};
    if (category && category !== "all") {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Fetch projects failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = projectSchema.parse(body);

    await connectDB();
    const project = await Project.create(validated);

    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Create project failed" },
      { status: 400 }
    );
  }
}
