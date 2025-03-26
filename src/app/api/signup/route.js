
import { handleErrorResponse } from '@/lib/utils';
import { createUser, getUserByEmail } from '@/server/functions/users';
import {hash} from 'bcryptjs'

export const runtime = 'edge';

export async function POST(request) {
  try {
    const { email, password, username, accountType } = await request.json(); // Destructure email and password

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return handleErrorResponse("Email already in use", 400);
    }
    const hashedPassword = await hash(password, 1)

    await createUser(email, hashedPassword, username, accountType);
    return new Response(
      JSON.stringify({ success: true, message: "User registered successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in registration route:", error);
    return handleErrorResponse("Internal server error", 500);
  }
}
