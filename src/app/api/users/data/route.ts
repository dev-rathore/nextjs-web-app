import { getUserFromToken } from "@/helpers/get-user-from-token";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user-model";
import { connect } from "@/database/db";

connect();

export async function GET(request: NextRequest) {
  try {
    const user: any = await getUserFromToken(request);
    const userData = await User.findById(user.id).select("-password");
    return NextResponse.json({
      message: "User found successfully",
      userData,
    }, { status: 200 });
  } catch (error: any) {
    console.error("Error getting user data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
