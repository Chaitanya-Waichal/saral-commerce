import { jwtVerify } from "jose";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Verify the JWT
    const { payload } = await jwtVerify(token, secret);

    if (payload) {
        return Response.json({ message: "Protected data", user: payload }, { status: 200 });
    } else {
        return Response.json({ error: "Invalid token" }, { status: 403 });
    }
  } catch (error) {
    return Response.json({ error: "Invalid or expired token" }, { status: 403 });
  }
}
