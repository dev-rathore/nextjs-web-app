import { connect } from "@/database/db";
import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data and accessToken
    const token = {
      id: user._id,
      email: user.email,
    };

    const accessToken = await jwt.sign(token, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    
    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
    }, { status: 200 });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
