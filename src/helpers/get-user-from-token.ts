import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getUserFromToken = async (request: NextRequest) => {
  try {
    const accessToken = request.cookies.get("access_token")?.value || "";
    const decodedToken = await jwt.verify(accessToken, process.env.TOKEN_SECRET!);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
