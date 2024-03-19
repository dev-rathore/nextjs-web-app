import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "User logged out successfully",
      success: true,
    });

    response.cookies.set("access_token", "", {
      httpOnly: true,
      // expires: new Date(0), // Optional
    });

    return response;
  } catch (error: any) {
    console.error("Error logging out:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}