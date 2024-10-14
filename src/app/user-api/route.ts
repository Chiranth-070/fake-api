import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../db";

// POST: Create a new mock API
export async function POST(req: NextRequest) {
  const { endpoint, response } = await req.json();

  // Insert into database using Prisma
  try {
    const newApi = await prisma.mockApi.create({
      data: {
        endpoint,
        response,
      },
    });

    return NextResponse.json(newApi, { status: 201 });
  } catch (error) {
    console.error("Error creating mock API:", error);
    return NextResponse.json(
      { error: "Failed to create API" },
      { status: 500 }
    );
  }
}

// GET: Fetch a mock API response
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json(
      { error: "Endpoint query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const api = await prisma.mockApi.findUnique({
      where: { endpoint },
    });

    if (!api) {
      return NextResponse.json({ error: "API not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(api.response)); // Return the parsed JSON
  } catch (error) {
    console.error("Error fetching mock API:", error);
    return NextResponse.json({ error: "Failed to fetch API" }, { status: 500 });
  }
}
