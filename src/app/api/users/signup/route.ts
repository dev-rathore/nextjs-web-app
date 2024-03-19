import { connect } from "@/database/db";
import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

connect();

export async function post(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User signed up successfully",
      success: true,
      savedUser,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error signing up:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
