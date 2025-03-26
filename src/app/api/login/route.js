import { handleErrorResponse } from "@/lib/utils";
import { getUserByEmail } from "@/server/functions/users";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export const runtime = "edge"; // ✅ Ensures compatibility with Next.js Edge Functions

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return handleErrorResponse("Missing email or password", 400);
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return handleErrorResponse("User not found", 404);
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return handleErrorResponse("Password is incorrect", 401)
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" }) // Algorithm: HMAC SHA-256
      .setIssuedAt()
      .setExpirationTime("1h") // Token expires in 1 hour
      .sign(secret);

    return Response.json({ message: "Login successful", token }, { status: 200 });

  } catch (error) {
    console.error("Error in login route:", error);
    return handleErrorResponse("Internal server error", 500);
  }
}
