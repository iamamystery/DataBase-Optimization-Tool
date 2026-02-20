import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
  try {
    // Mock health check response
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "connected",
        ai_service: "connected",
        cache: "connected"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Health check failed" },
      { status: 500 }
    );
  }
}
